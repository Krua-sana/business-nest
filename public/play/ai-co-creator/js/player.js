const $ = s => document.querySelector(s);
let store, uid, game = { state: { phase: "lobby" } };
let tab = "task", editing = null, screenKey = null, lastPhase = null;
const drafts = {};

const myTeam = () => teamsList(game).find(t => t.members && t.members[uid]);

(async function init() {
  document.title = WORKSHOP.title;
  try { store = await createStore(); }
  catch (e) { $("#root").innerHTML = `<div class="card"><h2>Can't connect</h2><p>${esc(e.message)}</p><p>Check your internet connection and reload.</p></div>`; return; }
  uid = store.uid;
  if (store.demo) $("#demo-flag").hidden = false;
  await ensureCode();
  store.onConnection(ok => document.body.classList.toggle("offline", !ok));
  store.subscribe(g => { game = g || { state: { phase: "lobby" } }; game.state = game.state || { phase: "lobby" }; render(); });
  setInterval(() => { const el = $("#p-timer"); if (el) el.innerHTML = timerHTML(game.state, store.now()); }, 250);
  document.addEventListener("click", onClick);
  document.addEventListener("input", onInput);
  document.addEventListener("submit", onSubmit);
})();

// ---------------- workshop code ----------------
async function ensureCode() {
  const params = new URLSearchParams(location.search);
  const fromUrl = params.get("code");
  if (fromUrl) { // keep the address bar clean
    params.delete("code");
    history.replaceState(null, "", location.pathname + (params.toString() ? "?" + params : "") + location.hash);
  }
  const tryCode = async c => { if (!c) return false; try { await store.claimPlayer(c); localStorage.setItem("aicc-code", c); return true; } catch { return false; } };
  if (await tryCode(fromUrl) || await tryCode(localStorage.getItem("aicc-code"))) return;
  localStorage.removeItem("aicc-code");
  $("#root").innerHTML = `
    <div class="join">
      <div class="brand-m"><div class="t1">${esc(WORKSHOP.title)}</div><div class="t2">${esc(WORKSHOP.subtitle)}</div></div>
      <form class="card" id="code-form">
        <h2>Enter the workshop code</h2>
        <p class="muted">You'll find it on the big screen.</p>
        <input id="code" maxlength="20" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Workshop code" required>
        <button class="btn primary block" type="submit">Join the game</button>
        <div class="err" id="code-err"></div>
      </form>
    </div>`;
  await new Promise(resolve => {
    $("#code-form").addEventListener("submit", async e => {
      e.preventDefault();
      const c = $("#code").value.trim().toUpperCase();
      if (await tryCode(c)) resolve(); else $("#code-err").textContent = "That code doesn't work. Check the big screen and try again.";
    });
  });
  $("#root").innerHTML = "";
}

// ---------------- render ----------------
function render() {
  const team = myTeam();
  const phase = game.state.phase;
  if (lastPhase && lastPhase !== phase) {
    tab = "task"; editing = null;
    navigator.vibrate?.(150);
    if (phase === "results") setTimeout(() => confetti(), 300);
  }
  lastPhase = phase;

  const key = team ? `team:${team.id}:${phase}:${editing}:${tab}` : "join";
  if (key !== screenKey) { screenKey = key; buildShell(team); }
  if (!team) return updateJoin();
  updateHeader(team);
  if (tab === "task") updateTask(team); else updateTeams();
}

function buildShell(team) {
  if (!team) {
    $("#root").innerHTML = `
      <div class="join">
        <div class="brand-m"><div class="t1">${esc(WORKSHOP.title)}</div><div class="t2">${esc(WORKSHOP.subtitle)}</div></div>
        <form class="card" id="create-form">
          <h2>Create your team</h2>
          <p class="muted">One person creates the team, teammates join it below.</p>
          <input id="team-name" maxlength="40" placeholder="Team name, e.g. Prompt Ninjas" autocomplete="off" required>
          <button class="btn primary block" type="submit">Create team</button>
          <div class="err" id="create-err"></div>
        </form>
        <div class="card">
          <h2>…or join your team</h2>
          <ul class="join-list" id="join-list"></ul>
        </div>
      </div>`;
    return;
  }
  $("#root").innerHTML = `
    <header class="p-head" id="p-head"></header>
    <nav class="tabs">
      <button data-tab="task" class="${tab === "task" ? "on" : ""}">Our task</button>
      <button data-tab="teams" class="${tab === "teams" ? "on" : ""}">All teams</button>
    </nav>
    <section id="panel">${tab === "task" ? taskShellHTML(team) : '<div id="teams-list" class="team-list"></div>'}</section>`;
  const inp = $("#f-input");
  if (inp) {
    const s = currentEditStep();
    inp.value = drafts[s.field] ?? team[s.field] ?? "";
    updateCount();
  }
}

function updateHeader(team) {
  const phase = game.state.phase, s = stepOf(phase);
  $("#p-head").innerHTML = `
    <div class="p-team"><span class="lbl">Team</span> <b>${esc(team.name)}</b> <small>👥 ${team.memberCount}</small></div>
    ${pipelineHTML(phase)}
    <div class="p-step">${s ? `Step ${phaseIdx(phase) + 1}/${STEPS.length} · <b>${esc(s.title)}</b>` : phase === "results" ? "<b>Results</b>" : "<b>Lobby</b>"}</div>
    <div id="p-timer">${timerHTML(game.state, store.now())}</div>`;
}

function updateJoin() {
  const teams = teamsList(game);
  $("#join-list").innerHTML = teams.length
    ? teams.map(t => `<li><span>${esc(t.name)} <small>👥 ${t.memberCount}</small></span><button class="btn small" data-join="${esc(t.id)}">Join</button></li>`).join("")
    : '<li class="muted">No teams yet. Be the first to create one!</li>';
}

function updateTeams() {
  const teams = teamsList(game);
  $("#teams-list").innerHTML = teams.map(t => teamCardHTML(t)).join("") || '<p class="muted">No teams yet.</p>';
}

// The step whose input is shown: the current one, or an earlier one being edited.
function currentEditStep() {
  if (editing) return STEPS.find(s => s.field === editing);
  const s = stepOf(game.state.phase);
  return s && s.field ? s : null;
}

function toolsHTML(s) {
  return s.tools ? `<div class="tools">${s.tools.map(t => `<a class="chip" href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.name)} ↗</a>`).join("")}</div>` : "";
}

function taskShellHTML(team) {
  const phase = game.state.phase;
  if (phase === "lobby") return `<div class="card center">
      <div class="big-emoji">🎉</div><h2>You're in!</h2>
      <p>Waiting for the host to start the game. Keep this page open.</p>
      <p class="muted" id="mates"></p>
      <button class="link" data-leave>Leave this team</button>
    </div>`;
  if (phase === "results") return `<div id="results"></div>`;
  const s = editing ? STEPS.find(x => x.field === editing) : stepOf(phase);
  const isEdit = !!editing;
  let body = "";
  if (s.kind === "choice") {
    body = `<div class="domains" id="domains">${DOMAINS.map(d => `
      <button class="domain-btn" data-domain="${esc(d.label)}"><span class="e">${d.emoji}</span>${esc(d.label)}</button>`).join("")}</div>`;
  } else if (s.kind === "vote") {
    body = `<div id="vote-list" class="team-list"></div>`;
  } else {
    const multi = s.kind !== "url";
    body = `
      ${toolsHTML(s)}
      <div id="prompts"></div>
      <form id="field-form">
        <label for="f-input">${esc(s.label)}</label>
        ${multi
          ? `<textarea id="f-input" rows="${s.kind === "longtext" ? 6 : 3}" maxlength="${s.max}" placeholder="${esc(s.placeholder)}"></textarea>`
          : `<input id="f-input" type="text" inputmode="url" autocapitalize="off" spellcheck="false" placeholder="${esc(s.placeholder)}" autocomplete="off">`}
        <div class="row"><span class="count" id="count"></span><button class="btn primary" type="submit">Save</button></div>
        <div class="saved-info" id="saved-info"></div>
      </form>`;
  }
  return `<div class="card task">
      ${isEdit ? `<button class="link" data-edit-done>← Back to current step</button>` : ""}
      <div class="kicker">${isEdit ? "Editing an earlier step" : `Step ${phaseIdx(phase) + 1} of ${STEPS.length} · ${esc(s.who)}`}</div>
      <h2>${esc(s.title)}</h2>
      <p>${esc(s.task)}</p>
      ${body}
    </div>
    <div class="card" id="summary"></div>`;
}

function updateTask(team) {
  const phase = game.state.phase;
  if (phase === "lobby") { const m = $("#mates"); if (m) m.textContent = `${team.memberCount} member${team.memberCount === 1 ? "" : "s"} in your team`; return; }
  if (phase === "results") return renderResults(team);
  const s = editing ? STEPS.find(x => x.field === editing) : stepOf(phase);

  if (s.kind === "choice") {
    document.querySelectorAll(".domain-btn").forEach(b => b.classList.toggle("on", b.dataset.domain === team.domain));
  } else if (s.kind === "vote") {
    renderVote(team);
  } else {
    $("#prompts").innerHTML = (s.prompts ? s.prompts(team) : []).map((p, i, arr) => `
      <div class="prompt">
        <div class="prompt-head"><span>${s.kind === "url" ? "Your prototype prompt (ready to paste)" : `Starter prompt ${arr.length > 1 ? i + 1 : ""}`}</span>
          <button class="btn small" type="button" data-copy="${i}">Copy</button></div>
        <pre>${esc(p)}</pre>
      </div>`).join("");
    updateSavedInfo(team, s);
  }
  renderSummary(team);
}

function updateSavedInfo(team, s) {
  const el = $("#saved-info"), inp = $("#f-input"); if (!el || !inp) return;
  const saved = team[s.field] || "";
  // Nobody typed here yet → show the team's latest saved version (a teammate may have saved it).
  if (drafts[s.field] === undefined && document.activeElement !== inp && inp.value !== saved) { inp.value = saved; updateCount(); }
  const cur = inp.value.trim();
  if (saved && cur === saved) el.innerHTML = `<span class="ok">✓ Saved, visible on the dashboard</span>`;
  else if (saved) el.innerHTML = `<span class="warn">Not saved yet.</span> Your team's saved version: <q>${esc(saved)}</q>`;
  else el.innerHTML = cur ? `<span class="warn">Not saved yet: tap Save.</span>` : "";
}

function renderSummary(team) {
  const el = $("#summary"); if (!el) return;
  const cur = phaseIdx(game.state.phase);
  const rows = STEPS.filter((s, i) => s.field && i < cur);
  if (!rows.length || editing) { el.hidden = true; return; }
  el.hidden = false;
  el.innerHTML = `<h3>Your team's answers</h3>
    <dl class="summary">${rows.map(s => {
      const v = s.field === "link" ? safeUrl(team.link) : team[s.field];
      const shown = s.field === "link" && v ? `<a href="${esc(v)}" target="_blank" rel="noopener">${esc(v)}</a>` : esc(v || "—");
      const canEdit = stepOf(game.state.phase)?.kind !== "vote";
      return `<dt>${esc(s.label)} ${canEdit ? `<button class="link small" data-edit="${s.field}">Edit</button>` : ""}</dt><dd>${shown}</dd>`;
    }).join("")}</dl>`;
}

function renderVote(team) {
  const others = teamsList(game).filter(t => t.id !== team.id);
  const myVote = (game.votes || {})[uid];
  $("#vote-list").innerHTML = others.length ? others.map(t => `
    <div class="vote-item ${myVote === t.id ? "voted" : ""}">
      ${teamCardHTML(t)}
      <button class="btn ${myVote === t.id ? "primary" : ""} block" data-vote="${esc(t.id)}">${myVote === t.id ? "★ Your vote" : "Vote for " + esc(t.name)}</button>
    </div>`).join("") : '<p class="muted">No other teams to vote for.</p>';
}

function renderResults(team) {
  const ranked = tally(game);
  const top = ranked[0]?.votes || 0;
  const winners = ranked.filter(r => r.votes === top && top > 0);
  $("#results").innerHTML = `
    <div class="card center winner-m">
      <div class="big-emoji">🏆</div>
      <div class="kicker">${winners.length > 1 ? "It's a tie!" : "The winner is"}</div>
      <h2>${winners.map(w => esc(w.name)).join(" & ") || "No votes"}</h2>
      ${winners.some(w => w.id === team.id) ? "<p><b>That's your team! Congratulations!</b></p>" : ""}
    </div>
    <div class="card"><h3>Ranking</h3><ol class="ranking-m">${ranked.map(r => `<li class="${r.id === team.id ? "mine" : ""}"><span>${esc(r.name)}</span><b>${r.votes}</b></li>`).join("")}</ol></div>`;
}

function updateCount() {
  const inp = $("#f-input"), c = $("#count"); if (!inp || !c) return;
  c.textContent = inp.maxLength > 0 ? `${inp.value.length}/${inp.maxLength}` : "";
}

// ---------------- events ----------------
async function onClick(e) {
  const t = e.target.closest("button, a"); if (!t) return;
  const team = myTeam();
  if (t.dataset.tab) { tab = t.dataset.tab; render(); return; }
  if (t.dataset.join) {
    await store.set(`teams/${t.dataset.join}/members/${uid}`, true);
    toast("Welcome to the team!"); return;
  }
  if (t.hasAttribute("data-leave")) { if (team && confirm("Leave this team?")) store.remove(`teams/${team.id}/members/${uid}`); return; }
  if (t.dataset.domain && team) {
    await store.update(`teams/${team.id}`, { domain: t.dataset.domain, updatedAt: store.now() });
    toast("Saved: " + t.dataset.domain); return;
  }
  if (t.dataset.copy !== undefined && team) {
    const s = currentEditStep(); copyText(s.prompts(team)[+t.dataset.copy], t); return;
  }
  if (t.dataset.vote && team) {
    if (t.dataset.vote === team.id) return;
    await store.set(`votes/${uid}`, t.dataset.vote); toast("Vote saved. You can change it until voting closes."); return;
  }
  if (t.dataset.edit) { editing = t.dataset.edit; tab = "task"; render(); window.scrollTo(0, 0); return; }
  if (t.hasAttribute("data-edit-done")) { editing = null; render(); return; }
}

function onInput(e) {
  if (e.target.id === "f-input") {
    const s = currentEditStep(); drafts[s.field] = e.target.value;
    updateCount(); const team = myTeam(); if (team) updateSavedInfo(team, s);
  }
  if (e.target.id === "team-name") $("#create-err").textContent = "";
}

async function onSubmit(e) {
  e.preventDefault();
  if (e.target.id === "create-form") {
    const name = $("#team-name").value.trim().replace(/\s+/g, " ");
    if (!name) return;
    if (teamsList(game).some(t => (t.name || "").toLowerCase() === name.toLowerCase())) {
      $("#create-err").textContent = "That name is taken. Join that team below or pick another name."; return;
    }
    const id = store.newId();
    try { await store.set(`teams/${id}`, { name, createdAt: store.now(), members: { [uid]: true } }); }
    catch (err) { $("#create-err").textContent = "Couldn't create team: " + err.message; }
    return;
  }
  if (e.target.id === "field-form") {
    const team = myTeam(), s = currentEditStep(); if (!team || !s) return;
    let v = $("#f-input").value.trim();
    if (s.kind === "url") {
      v = safeUrl(v);
      if (!v) { toast("Please paste a valid link (https://…)"); return; }
      $("#f-input").value = v;
    }
    if (!v) { toast("Please write something first"); return; }
    try {
      await store.update(`teams/${team.id}`, { [s.field]: v, updatedAt: store.now() });
      delete drafts[s.field];
      toast("Saved! Visible on the dashboard");
      if (editing) { editing = null; render(); }
    } catch (err) { toast("Couldn't save: " + err.message); }
  }
}
