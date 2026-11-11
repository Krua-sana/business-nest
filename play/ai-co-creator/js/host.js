const $ = s => document.querySelector(s);
let store, game = { state: { phase: "lobby" } };
let prevSig = {}, lastPhase = null;
let feedback = {};

let joinCode = localStorage.getItem("aicc-host-code") || "";
const joinUrl = (withCode = true) => {
  const u = new URL(location.href);
  u.hash = ""; u.pathname = u.pathname.replace(/host\.html$/, u.protocol === "file:" ? "index.html" : "");
  const p = new URLSearchParams(store?.demo ? u.search : "");
  if (withCode && joinCode) p.set("code", joinCode); else p.delete("code");
  u.search = p.toString();
  return u.href;
};
const joinText = () => esc(joinUrl(false).replace(/^https?:\/\//, "").replace(/\?$/, ""));

function qrSVG(text) {
  const q = window.qrcode(0, "M"); q.addData(text); q.make();
  return q.createSvgTag({ cellSize: 8, margin: 2, scalable: true });
}

// ---------------- start ----------------
(async function init() {
  document.title = WORKSHOP.title + " — Host";
  store = await createStore();
  if (store.demo) $("#demo-flag").hidden = false;
  const savedPin = localStorage.getItem("aicc-host-pin");
  if (savedPin && joinCode) {
    try { await store.claimHost(savedPin); await store.claimPlayer(joinCode); return start(); }
    catch { localStorage.removeItem("aicc-host-pin"); }
  }
  $("#pin-gate").hidden = false;
  if (joinCode) $("#host-code").value = joinCode;
  $("#pin-form").addEventListener("submit", async e => {
    e.preventDefault();
    const pin = $("#pin").value.trim();
    const code = $("#host-code").value.trim().toUpperCase();
    try { await store.claimHost(pin); } catch { $("#pin-err").textContent = "Wrong PIN, try again."; return; }
    try { await store.claimPlayer(code); } catch { $("#pin-err").textContent = "The workshop code doesn't match the one in your Firebase rules."; return; }
    joinCode = code;
    localStorage.setItem("aicc-host-pin", pin); localStorage.setItem("aicc-host-code", code);
    $("#pin-gate").hidden = true; start();
  });
})();

function start() {
  $("#app").hidden = false;
  store.onConnection(ok => document.body.classList.toggle("offline", !ok));
  store.subscribeFeedback(f => { feedback = f || {}; if (game.state.phase === "feedback") render(); });
  store.subscribe(g => { game = g || { state: { phase: "lobby" } }; game.state = game.state || { phase: "lobby" }; render(); });
  setInterval(tick, 250);
  document.addEventListener("keydown", e => {
    if (e.target.matches("input,textarea")) return;
    if (e.key === "h" || e.key === "H") document.body.classList.toggle("hide-controls");
    if (e.key === "f" || e.key === "F") document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  });
  $("#controls").addEventListener("click", onControl);
  $("#main").addEventListener("click", e => {
    if (e.target.closest("a")) return;
    const card = e.target.closest(".team-card"); if (card) openModal(card.dataset.id);
  });
  $("#modal").addEventListener("click", e => {
    if (e.target.id === "modal" || e.target.closest("[data-close]")) closeModal();
    const rm = e.target.closest("[data-remove]");
    if (rm && confirm("Remove this team from the game?")) { store.remove("teams/" + rm.dataset.remove); closeModal(); }
  });
}

// ---------------- game control ----------------
function goTo(phase) {
  const s = stepOf(phase);
  const now = store.now();
  const state = { phase, endsAt: null, pausedRemaining: null, duration: null, changedAt: now };
  if (s) { state.duration = s.minutes; state.endsAt = now + s.minutes * 60000; }
  return store.set("state", state);
}

function onControl(e) {
  const b = e.target.closest("button[data-act]"); if (!b) return;
  const st = game.state, i = PHASES.indexOf(st.phase), now = store.now();
  switch (b.dataset.act) {
    case "start": return goTo(PHASES[1]);
    case "next": return goTo(PHASES[Math.min(PHASES.length - 1, i + 1)]);
    case "back": return goTo(PHASES[Math.max(0, i - 1)]);
    case "pause":
      if (st.pausedRemaining != null) return store.update("state", { endsAt: now + st.pausedRemaining, pausedRemaining: null });
      return store.update("state", { pausedRemaining: Math.max(0, st.endsAt - now), endsAt: null });
    case "plus": case "minus": {
      const d = b.dataset.act === "plus" ? 60000 : -60000;
      const dur = Math.max(1, (st.duration || 1) + d / 60000);
      if (st.pausedRemaining != null) return store.update("state", { pausedRemaining: Math.max(0, st.pausedRemaining + d), duration: dur });
      const base = Math.max(now, st.endsAt || now);
      return store.update("state", { endsAt: d > 0 ? base + d : Math.max(now, (st.endsAt || now) + d), duration: dur });
    }
    case "reset": return newGame();
    case "hide": return document.body.classList.add("hide-controls");
  }
}

// Unique phones that are a member of at least one team
function participantCount() {
  const ids = new Set();
  Object.values(game.teams || {}).forEach(t => Object.keys(t.members || {}).forEach(u => ids.add(u)));
  return ids.size;
}
function participantsLine() {
  const p = participantCount(), t = Object.keys(game.teams || {}).length;
  return `<div class="participants-line">👥 <b>${p}</b> participant${p === 1 ? "" : "s"} in <b>${t}</b> team${t === 1 ? "" : "s"}</div>`;
}

async function newGame() {
  const hasData = Object.keys(game.teams || {}).length > 0 || Object.keys(feedback || {}).length > 0;
  const msg = hasData
    ? "Start a NEW game?\n\nThe current teams, answers, votes and feedback are saved to the archive in Firebase first, then the screen is cleared."
    : "Start a NEW game?";
  if (!confirm(msg)) return;
  if (hasData) {
    const d = new Date(store.now());
    const pad = n => String(n).padStart(2, "0");
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
    try {
      await store.archive(key, {
        savedAt: store.now(),
        summary: (() => {
          const fb = Object.values(feedback || {}).filter(f => f && f.stars);
          return {
            participants: participantCount(),
            teams: Object.keys(game.teams || {}).length,
            votesCast: Object.keys(game.votes || {}).length,
            feedbackResponses: fb.length,
            averageRating: fb.length ? Math.round(fb.reduce((a, f) => a + f.stars, 0) / fb.length * 10) / 10 : null
          };
        })(),
        teams: game.teams || null,
        votes: game.votes || null,
        feedback: Object.keys(feedback || {}).length ? feedback : null,
        lastPhase: game.state?.phase || null
      });
    } catch (e) {
      alert("Couldn't save the archive, so nothing was deleted.\n\n" + e.message);
      return;
    }
    toast("Saved to archive: " + key);
  }
  prevSig = {};
  try { await store.clearFeedback(); } catch (e) { console.error(e); }
  return store.set("", { state: { phase: "lobby" } });
}

// ---------------- rendering ----------------
function tick() {
  $("#timer").innerHTML = timerHTML(game.state, store.now());
}

function render() {
  const st = game.state, phase = st.phase;
  const teams = teamsList(game);
  const players = teams.reduce((n, t) => n + t.memberCount, 0);
  document.body.dataset.phase = phase;
  $("#pipeline").innerHTML = pipelineHTML(phase);
  tick();

  // banner
  const s = stepOf(phase), idx = phaseIdx(phase);
  const stats = TEAM_JOINING ? `<b>${teams.length}</b> teams · <b>${players}</b> players` : `<b>${teams.length}</b> teams`;
  if (s) {
    const votes = Object.keys(game.votes || {}).length;
    $("#banner").innerHTML = `
      <div class="banner-text">
        <div class="kicker">Step ${idx + 1} of ${STEPS.length} · ${esc(s.who)}</div>
        <h2>${esc(s.title)}</h2>
        <p>${esc(s.task)}</p>
        ${s.tools ? `<div class="tools">${s.tools.map(t => `<span class="chip">${esc(t.name)}</span>`).join("")}</div>` : ""}
      </div>
      <div class="banner-side">
        <div class="mini-qr">${qrSVG(joinUrl())}</div>
        <div class="stats">${stats}${s.kind === "vote" ? `<br><b>${votes}</b> votes cast` : ""}<br><span class="url">${joinText()}</span><br>Code: <b class="code-pill">${esc(joinCode)}</b></div>
      </div>`;
  } else $("#banner").innerHTML = "";

  // main
  if (phase === "lobby") renderLobby(teams, players);
  else if (phase === "results") renderResults();
  else if (phase === "feedback") renderFeedback();
  else renderGrid(teams);

  renderControls();
  lastPhase = phase;
}

function renderLobby(teams, players) {
  $("#main").innerHTML = `
    <div class="lobby">
      <div class="lobby-join">
        <div class="tagline">${esc(WORKSHOP.tagline)}</div>
        <h1>Scan to join the game</h1>
        <div class="big-qr">${qrSVG(joinUrl())}</div>
        <div class="url big">${joinText()}</div>
        <div class="code-line">Workshop code: <b class="code-pill big">${esc(joinCode)}</b></div>
        <p class="hint">${TEAM_JOINING ? "One team = 2–3 people. Create your team, teammates join it." : "One phone per team: one person creates the team and enters the answers."}</p>
        ${store.demo ? `<p class="demo-note">⚠️ Demo mode: phones can't join yet. ${location.protocol === "file:" ? "This page is opened from your computer — open the GitHub Pages link instead." : "Connect Firebase in js/config.js (see README)."}</p>` : ""}
      </div>
      <div class="lobby-teams">
        <h2>${teams.length} teams${TEAM_JOINING ? ` · ${players} players` : ""}</h2>
        <ul class="team-chips">${teams.map(t => `<li class="pop">${esc(t.name)}${TEAM_JOINING ? ` <small>👥 ${t.memberCount}</small>` : ""}</li>`).join("") || '<li class="empty">Waiting for the first team…</li>'}</ul>
      </div>
    </div>`;
}

function renderGrid(teams) {
  const first = lastPhase === null;
  const html = teams.map(t => {
    const sig = [t.domain, t.challenge, t.solution, t.link, t.memberCount].join("|");
    const changed = !first && prevSig[t.id] !== undefined && prevSig[t.id] !== sig;
    const isNew = !first && prevSig[t.id] === undefined;
    prevSig[t.id] = sig;
    return teamCardHTML(t, { clickable: true }).replace('class="team-card"', `class="team-card${changed ? " flash" : ""}${isNew ? " pop" : ""}"`);
  }).join("");
  const dense = teams.length > 15 ? "dense" : teams.length > 8 ? "medium" : "";
  $("#main").innerHTML = teams.length
    ? `<div class="team-grid ${dense}">${html}</div>`
    : `<div class="empty-state">No teams yet. Ask participants to scan the QR code.</div>`;
}

function renderResults() {
  const ranked = tally(game);
  const top = ranked[0]?.votes || 0;
  const winners = ranked.filter(r => r.votes === top && top > 0);
  const total = ranked.reduce((n, r) => n + r.votes, 0);
  $("#main").innerHTML = `
    <div class="results">
      <div class="winner-box">
        ${participantsLine()}
        <div class="kicker">${winners.length > 1 ? "It's a tie! Winners" : "And the winner is…"}</div>
        ${winners.length ? winners.map(w => `
          <div class="winner">
            <div class="trophy">🏆</div>
            <h1>${esc(w.name)}</h1>
            <div class="domain">${esc((domainOf(w.domain)?.emoji || "") + " " + (w.domain || ""))}</div>
            <p class="w-sol">${esc(w.solution || w.challenge || "")}</p>
            ${safeUrl(w.link) ? `<a class="proto-link big" href="${esc(safeUrl(w.link))}" target="_blank" rel="noopener">Open prototype ↗</a>` : ""}
            <div class="w-votes">${w.votes} vote${w.votes === 1 ? "" : "s"}</div>
          </div>`).join("") : "<h1>No votes yet</h1>"}
      </div>
      <ol class="ranking">${ranked.map((r, i) => `
        <li data-id="${esc(r.id)}" class="team-card-lite">
          <span class="rank">${i + 1}</span><span class="name">${esc(r.name)}</span>
          <span class="bar"><span style="width:${total ? (r.votes / Math.max(1, top)) * 100 : 0}%"></span></span>
          <span class="v">${r.votes}</span>
        </li>`).join("")}</ol>
    </div>`;
  if (lastPhase !== "results" && winners.length) confetti();
}

function renderFeedback() {
  const list = Object.values(feedback || {}).filter(f => f && f.stars);
  const n = list.length;
  const avg = n ? list.reduce((a, f) => a + f.stars, 0) / n : 0;
  const dist = [5, 4, 3, 2, 1].map(s => [s, list.filter(f => f.stars === s).length]);
  const max = Math.max(1, ...dist.map(d => d[1]));
  $("#main").innerHTML = `
    <div class="feedback-host">
      <div class="fb-ask">
        <div class="tagline">One last thing</div>
        <h1>${esc(FEEDBACK.question)}</h1>
        <p>Give your stars on your phone and leave a short message.<br><b>It's anonymous.</b> Only the organiser reads the messages.</p>
        <div class="mini-qr fb-qr">${qrSVG(joinUrl())}</div>
      </div>
      <div class="fb-stats">
        <div class="fb-avg">${n ? avg.toFixed(1) : "–"}</div>
        ${starsHTML(avg, "big")}
        <div class="fb-count">${n} of ${participantCount()} participant${participantCount() === 1 ? "" : "s"} responded</div>
        <ul class="fb-dist">${dist.map(([s, c]) => `<li><span>${s} ★</span><span class="bar"><span style="width:${(c / max) * 100}%"></span></span><b>${c}</b></li>`).join("")}</ul>
      </div>
    </div>`;
}

function renderControls() {
  const st = game.state, phase = st.phase, i = PHASES.indexOf(phase);
  const next = PHASES[i + 1];
  const paused = st.pausedRemaining != null;
  let html = "";
  if (phase === "lobby") {
    html = `<button class="btn primary xl" data-act="start">▶ Start the game</button>`;
  } else if (phase === "results") {
    html = `<button class="btn" data-act="back">◀ Back to voting</button>
      <button class="btn primary" data-act="next">💬 Ask for feedback ▶</button>`;
  } else if (phase === "feedback") {
    html = `<button class="btn" data-act="back">◀ Back to results</button>`;
  } else {
    html = `<button class="btn" data-act="back">◀ Back</button>
      <button class="btn" data-act="minus">−1 min</button>
      <button class="btn" data-act="pause">${paused ? "▶ Resume" : "⏸ Pause"}</button>
      <button class="btn" data-act="plus">+1 min</button>
      <button class="btn primary" data-act="next">${next === "results" ? "🏆 Reveal the winner" : "Next: " + esc(stepOf(next).title) + " ▶"}</button>`;
  }
  html += `<span class="spacer"></span>
    <button class="btn ghost" data-act="reset" title="Delete all data and start over">New game</button>
    <button class="btn ghost" data-act="hide" title="Hide controls (press H to toggle)">Hide (H)</button>`;
  $("#controls").innerHTML = html;
}

// ---------------- modal ----------------
function openModal(id) {
  const t = teamsList(game).find(x => x.id === id); if (!t) return;
  const link = safeUrl(t.link);
  $("#modal").innerHTML = `<div class="modal-box">
    <button class="close" data-close aria-label="Close">×</button>
    ${TEAM_JOINING ? `<div class="kicker">👥 ${t.memberCount} members</div>` : ""}
    <h1>${esc(t.name)}</h1>
    <div class="domain">${esc((domainOf(t.domain)?.emoji || "") + " " + (t.domain || "No problem area yet"))}</div>
    <h3>Challenge</h3><p>${esc(t.challenge || "—")}</p>
    <h3>Solution</h3><p>${esc(t.solution || "—")}</p>
    <h3>Prototype</h3><p>${link ? `<a class="proto-link big" href="${esc(link)}" target="_blank" rel="noopener">Open prototype ↗</a> <span class="url">${esc(link)}</span>` : "—"}</p>
    <div class="modal-foot"><button class="btn ghost danger" data-remove="${esc(t.id)}">Remove team</button></div>
  </div>`;
  $("#modal").classList.add("open");
}
function closeModal() { $("#modal").classList.remove("open"); }
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
