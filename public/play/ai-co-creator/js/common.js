const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const PHASES = ["lobby", ...STEPS.map(s => s.id), "results", "feedback"];
const stepOf = phase => STEPS.find(s => s.id === phase);
const phaseIdx = phase => phase === "results" || phase === "feedback" ? STEPS.length : STEPS.findIndex(s => s.id === phase);
const domainOf = label => DOMAINS.find(d => d.label === label);

function remaining(state, now) {
  if (!state) return null;
  if (state.pausedRemaining != null) return state.pausedRemaining;
  if (state.endsAt) return state.endsAt - now;
  return null;
}

function fmt(ms) {
  const t = Math.max(0, Math.ceil(ms / 1000));
  return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
}

function timerHTML(state, now) {
  const r = remaining(state, now);
  if (r == null) return "";
  const total = (state.duration || 1) * 60000;
  const pct = Math.max(0, Math.min(100, (r / total) * 100));
  const cls = r <= 0 ? "over" : r <= 60000 ? "low" : "";
  const paused = state.pausedRemaining != null;
  return `<div class="timer-box ${cls} ${paused ? "paused" : ""}">
    <div class="timer-num">${r <= 0 ? "Time's up!" : fmt(r)}</div>
    <div class="timer-bar"><span style="width:${pct}%"></span></div>
    ${paused ? '<div class="timer-note">paused</div>' : ""}
  </div>`;
}

function pipelineHTML(phase) {
  const cur = phaseIdx(phase);
  return `<ol class="pipeline">${STEPS.map((s, i) => `
    <li class="${i < cur ? "done" : i === cur ? "current" : ""}">
      <span class="dot">${i < cur ? "✓" : i + 1}</span>
      <span class="lbl">${esc(s.title)}</span>
    </li>`).join("")}</ol>`;
}

const teamsList = game =>
  Object.entries(game.teams || {})
    .map(([id, t]) => ({ id, ...t, memberCount: Object.keys(t.members || {}).length }))
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

function tally(game) {
  const counts = {};
  Object.values(game.votes || {}).forEach(t => { if (game.teams?.[t]) counts[t] = (counts[t] || 0) + 1; });
  return teamsList(game).map(t => ({ ...t, votes: counts[t.id] || 0 }))
    .sort((a, b) => b.votes - a.votes || a.createdAt - b.createdAt);
}

function safeUrl(u) {
  u = String(u || "").trim();
  if (!u) return "";
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  try { const x = new URL(u); return /^https?:$/.test(x.protocol) ? x.href : ""; } catch { return ""; }
}

function teamCardHTML(t, { clickable = false, votes = null } = {}) {
  const d = domainOf(t.domain);
  const link = safeUrl(t.link);
  const empty = s => `<span class="empty">${s}</span>`;
  return `<article class="team-card" data-id="${esc(t.id)}" ${clickable ? 'tabindex="0" role="button"' : ""}>
    <header><h3>${esc(t.name)}</h3>${TEAM_JOINING ? `<span class="members" title="team members">👥 ${t.memberCount}</span>` : ""}
      ${votes != null ? `<span class="votes">${votes} ★</span>` : ""}</header>
    <div class="domain ${t.domain ? "" : "none"}">${t.domain ? `${d ? d.emoji + " " : ""}${esc(t.domain)}` : "No problem area yet"}</div>
    <dl>
      <dt>Challenge</dt><dd class="clamp">${t.challenge ? esc(t.challenge) : empty("…")}</dd>
      <dt>Solution</dt><dd class="clamp">${t.solution ? esc(t.solution) : empty("…")}</dd>
    </dl>
    ${link ? `<a class="proto-link" href="${esc(link)}" target="_blank" rel="noopener">Open prototype ↗</a>` : ""}
  </article>`;
}

async function copyText(text, btn) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand("copy"); ta.remove();
  }
  if (btn) { const o = btn.textContent; btn.textContent = "Copied ✓"; setTimeout(() => btn.textContent = o, 1500); }
}

function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add("show");
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2200);
}

function confetti(container = document.body) {
  const colors = ["#2A29F5", "#F3D878", "#E4C251", "#F7E7A7", "#FFFFFF", "#2A29F5"];
  for (let i = 0; i < 120; i++) {
    const p = document.createElement("i");
    p.className = "confetti";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = Math.random() * 1.5 + "s";
    p.style.animationDuration = 2.5 + Math.random() * 2 + "s";
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 6000);
  }
}

function starsHTML(n, size = "") {
  return `<span class="stars ${size}" aria-label="${n} of 5 stars">${[1,2,3,4,5].map(i => `<span class="${i <= Math.round(n) ? "on" : ""}">★</span>`).join("")}</span>`;
}
