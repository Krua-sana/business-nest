// Data layer: Firebase Realtime Database (live) or localStorage (demo).
const isDemo = () =>
  !FIREBASE_CONFIG.databaseURL || new URLSearchParams(location.search).has("demo");

function createStore() {
  return isDemo() ? demoStore() : firebaseStore();
}

const EMPTY = () => ({ state: { phase: "lobby" } });
const rid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

// ---------- DEMO: shares state between tabs of ONE browser ----------
function demoStore() {
  const KEY = "aicc-demo-game";
  let uid = sessionStorage.getItem("aicc-demo-uid");
  if (!uid) { uid = "u" + rid(); sessionStorage.setItem("aicc-demo-uid", uid); }
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || EMPTY(); } catch { return EMPTY(); } };
  const listeners = new Set();
  const emit = () => { const g = read(); listeners.forEach(f => f(g)); };
  addEventListener("storage", e => { if (e.key === KEY) emit(); });
  const setPath = (obj, path, val) => {
    if (!path) { Object.keys(obj).forEach(k => delete obj[k]); Object.assign(obj, val || {}); return; }
    const parts = path.split("/"); let o = obj;
    for (let i = 0; i < parts.length - 1; i++) { o[parts[i]] = o[parts[i]] && typeof o[parts[i]] === "object" ? o[parts[i]] : {}; o = o[parts[i]]; }
    const last = parts[parts.length - 1];
    if (val === null || val === undefined) delete o[last]; else o[last] = JSON.parse(JSON.stringify(val));
  };
  const write = fn => { const g = read(); fn(g); localStorage.setItem(KEY, JSON.stringify(g)); emit(); };
  return Promise.resolve({
    uid, demo: true,
    now: () => Date.now(),
    subscribe(f) { listeners.add(f); f(read()); return () => listeners.delete(f); },
    onConnection(f) { f(true); },
    async set(path, val) { write(g => setPath(g, path, val)); },
    async update(path, obj) { write(g => Object.entries(obj).forEach(([k, v]) => setPath(g, path ? path + "/" + k : k, v))); },
    async remove(path) { write(g => setPath(g, path, null)); },
    newId: () => "t" + rid(),
    async archive(key, data) {
      const all = JSON.parse(localStorage.getItem("aicc-demo-archive") || "{}");
      all[key] = data; localStorage.setItem("aicc-demo-archive", JSON.stringify(all));
    },
    subscribeFeedback(f) {
      const FK = "aicc-demo-feedback";
      const readF = () => { try { return JSON.parse(localStorage.getItem(FK)) || {}; } catch { return {}; } };
      f(readF()); addEventListener("storage", e => { if (e.key === FK) f(readF()); });
      this._fb = () => f(readF());
    },
    async getMyFeedback() { try { return (JSON.parse(localStorage.getItem("aicc-demo-feedback")) || {})[uid] || null; } catch { return null; } },
    async setMyFeedback(data) {
      const all = JSON.parse(localStorage.getItem("aicc-demo-feedback") || "{}"); all[uid] = data;
      localStorage.setItem("aicc-demo-feedback", JSON.stringify(all));
    },
    async clearFeedback() { localStorage.removeItem("aicc-demo-feedback"); this._fb && this._fb(); },
    async claimHost(pin) { if (String(pin) !== String(DEMO_PIN)) throw new Error("Wrong PIN"); },
    async claimPlayer(code) { if (String(code).trim().toUpperCase() !== String(DEMO_CODE).toUpperCase()) throw new Error("Wrong code"); }
  });
}

// ---------- LIVE: Firebase ----------
async function firebaseStore() {
  const base = "https://www.gstatic.com/firebasejs/10.12.2/";
  const [{ initializeApp }, A, D] = await Promise.all([
    import(base + "firebase-app.js"), import(base + "firebase-auth.js"), import(base + "firebase-database.js")
  ]);
  const app = initializeApp(FIREBASE_CONFIG);
  const auth = A.getAuth(app);
  const db = D.getDatabase(app);
  if (new URLSearchParams(location.search).has("emulator")) { // local testing only
    A.connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
    D.connectDatabaseEmulator(db, "localhost", 9000);
  }
  await auth.authStateReady();
  if (!auth.currentUser) await A.signInAnonymously(auth);
  const uid = auth.currentUser.uid;
  let offset = 0;
  D.onValue(D.ref(db, ".info/serverTimeOffset"), s => { offset = s.val() || 0; });
  const R = p => D.ref(db, "game" + (p ? "/" + p : ""));
  return {
    uid, demo: false,
    now: () => Date.now() + offset,
    subscribe(f) {
      return D.onValue(R(""), s => f(s.val() || EMPTY()), err => { console.error(err); alert("Database error: " + err.message); });
    },
    onConnection(f) { D.onValue(D.ref(db, ".info/connected"), s => f(!!s.val())); },
    set: (p, v) => D.set(R(p), v),
    update: (p, o) => D.update(R(p), o),
    remove: p => D.remove(R(p)),
    newId: () => D.push(R("teams")).key,
    archive: (key, data) => D.set(D.ref(db, "archive/" + key), data),
    subscribeFeedback(f) { return D.onValue(D.ref(db, "feedback"), snap => f(snap.val() || {}), err => console.error(err)); },
    async getMyFeedback() { const snap = await D.get(D.ref(db, "feedback/" + uid)); return snap.val(); },
    setMyFeedback: data => D.set(D.ref(db, "feedback/" + uid), data),
    clearFeedback: () => D.remove(D.ref(db, "feedback")),
    async claimHost(pin) {
      try { await D.set(D.ref(db, "hosts/" + uid), String(pin)); }
      catch { throw new Error("Wrong PIN"); }
    },
    async claimPlayer(code) {
      try { await D.set(D.ref(db, "players/" + uid), String(code).trim().toUpperCase()); }
      catch (e) { throw new Error(/permission/i.test(e && e.message) ? "Wrong code" : (e && e.message) || "Connection problem"); }
    }
  };
}
