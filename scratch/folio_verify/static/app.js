let bootstrap = null;
let currentId = null;
let filteredIds = [];
let pan = { local: { x: 0, y: 0 }, yale: { x: 0, y: 0 } };
let zoom = 1;
let dragState = null;

const els = {
  stats: document.getElementById("stats"),
  queueList: document.getElementById("queueList"),
  filterMode: document.getElementById("filterMode"),
  searchBox: document.getElementById("searchBox"),
  meta: document.getElementById("meta"),
  refInput: document.getElementById("refInput"),
  suggestions: document.getElementById("suggestions"),
  yaleSelect: document.getElementById("yaleSelect"),
  yaleLink: document.getElementById("yaleLink"),
  localImg: document.getElementById("localImg"),
  yaleImg: document.getElementById("yaleImg"),
  overlayImg: document.getElementById("overlayImg"),
  overlayMode: document.getElementById("overlayMode"),
  overlayOpacity: document.getElementById("overlayOpacity"),
  syncPan: document.getElementById("syncPan"),
  zoomRange: document.getElementById("zoomRange"),
  zoomLabel: document.getElementById("zoomLabel"),
  noteInput: document.getElementById("noteInput"),
  exportStatus: document.getElementById("exportStatus"),
  btnConfirm: document.getElementById("btnConfirm"),
  btnSkip: document.getElementById("btnSkip"),
  btnPrev: document.getElementById("btnPrev"),
  btnNext: document.getElementById("btnNext"),
  btnExport: document.getElementById("btnExport"),
};

async function init() {
  const res = await fetch("/api/bootstrap");
  bootstrap = await res.json();
  populateYaleSelect();
  bindEvents();
  refreshQueue();
  selectFirstPending();
}

function bindEvents() {
  els.filterMode.addEventListener("change", refreshQueue);
  els.searchBox.addEventListener("input", refreshQueue);
  els.btnConfirm.addEventListener("click", confirmCurrent);
  els.btnSkip.addEventListener("click", skipCurrent);
  els.btnPrev.addEventListener("click", () => stepQueue(-1));
  els.btnNext.addEventListener("click", () => stepQueue(1));
  els.btnExport.addEventListener("click", exportPatch);
  els.yaleSelect.addEventListener("change", onYaleSelect);
  els.refInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") confirmCurrent();
  });
  els.noteInput.addEventListener("change", saveNote);
  els.zoomRange.addEventListener("input", onZoom);
  els.overlayMode.addEventListener("change", updateOverlay);
  els.overlayOpacity.addEventListener("input", updateOverlay);

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, select")) return;
    if (e.key === "ArrowRight") stepQueue(1);
    if (e.key === "ArrowLeft") stepQueue(-1);
    if (e.key.toLowerCase() === "s") skipCurrent();
    if (e.key === "Enter") confirmCurrent();
  });

  setupPan("local");
  setupPan("yale");
}

function populateYaleSelect() {
  els.yaleSelect.innerHTML = "";
  for (const row of bootstrap.yale) {
    const opt = document.createElement("option");
    opt.value = row.oid;
    opt.textContent = `${row.ref} — ${row.label}`;
    opt.dataset.ref = row.ref;
    opt.dataset.image = row.image;
    opt.dataset.viewer = row.viewer;
    els.yaleSelect.appendChild(opt);
  }
}

function queueEntryById(id) {
  return bootstrap.queue.find((q) => q.id === id);
}

function refreshQueue() {
  const mode = els.filterMode.value;
  const q = els.searchBox.value.trim().toLowerCase();
  const verified = new Set(Object.keys(bootstrap.state.verifications || {}));
  const skipped = new Set(bootstrap.state.skipped || []);

  filteredIds = bootstrap.queue
    .filter((row) => {
      if (mode === "pending" && (row.existingBeineckeRef || verified.has(row.id))) return false;
      if (mode === "verified" && !verified.has(row.id) && !row.existingBeineckeRef) return false;
      if (mode === "skipped" && !skipped.has(row.id)) return false;
      if (q) {
        const hay = `${row.id} ${row.title} ${row.filename} ${row.folio}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    })
    .map((row) => row.id);

  renderQueueList(verified, skipped);
  renderStats(verified);
}

function renderStats(verified) {
  const pending = bootstrap.pending.filter((r) => !bootstrap.state.verifications[r.id]);
  els.stats.innerHTML = `
    <div><strong>${bootstrap.stats.verified}</strong> / ${bootstrap.stats.total} verified</div>
    <div>${pending.length} pending this session</div>
  `;
}

function renderQueueList(verified, skipped) {
  els.queueList.innerHTML = "";
  for (const id of filteredIds) {
    const row = queueEntryById(id);
    const li = document.createElement("li");
    if (id === currentId) li.classList.add("active");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = `<span class="id">${row.id}`;
    if (row.existingBeineckeRef || verified.has(id)) {
      btn.innerHTML += `<span class="badge ok">✓</span>`;
    } else if (skipped.has(id)) {
      btn.innerHTML += `<span class="badge skip">skip</span>`;
    } else if (!row.localExists) {
      btn.innerHTML += `<span class="badge missing">no file</span>`;
    }
    btn.innerHTML += `</span><span class="title">${row.title}</span>`;
    btn.addEventListener("click", () => selectRow(id));
    li.appendChild(btn);
    els.queueList.appendChild(li);
  }
}

function selectFirstPending() {
  const first = filteredIds[0] || bootstrap.pending[0]?.id;
  if (first) selectRow(first);
}

function selectRow(id) {
  currentId = id;
  resetPanZoom();
  refreshQueue();
  const row = queueEntryById(id);
  const verified = bootstrap.state.verifications[id];
  const existing = row.existingBeineckeRef;

  els.meta.innerHTML = `
    <div><strong>${row.id}</strong> · Vol ${row.volume} · ${row.category} · <code>${row.filename}</code></div>
    <div>${row.title} — <span class="muted">${row.folio}</span></div>
    ${row.filenameHint ? `<div class="hint">Filename hint (not authoritative): <code>${row.filenameHint}</code></div>` : ""}
    ${existing ? `<div class="hint">Already in folios.json: <code>${existing}</code></div>` : ""}
    ${verified ? `<div class="hint">Session verified: <code>${verified.beineckeRef}</code></div>` : ""}
    ${!row.localExists ? `<div class="hint" style="color:var(--danger)">Missing local file: ${row.localFile}</div>` : ""}
  `;

  els.refInput.value = verified?.beineckeRef || existing || row.filenameHint || "";
  els.noteInput.value = bootstrap.state.notes?.[id] || "";

  if (row.localExists) {
    els.localImg.src = `/api/local-image?path=${encodeURIComponent(row.localFile)}`;
  } else {
    els.localImg.removeAttribute("src");
  }

  renderSuggestions(id);
  const top = bootstrap.suggestions[id]?.[0];
  if (top) {
    setYaleByOid(top.oid, top.ref);
    if (!verified && !existing && !row.filenameHint) {
      els.refInput.value = top.ref;
    }
  } else if (bootstrap.yale.length) {
    els.yaleSelect.selectedIndex = 0;
    onYaleSelect();
  }
}

function renderSuggestions(id) {
  els.suggestions.innerHTML = "";
  const list = bootstrap.suggestions[id] || [];
  const tpl = document.getElementById("suggestionTemplate");

  if (!list.length) {
    els.suggestions.textContent = "No suggestions — pick Yale folio manually.";
    return;
  }

  const label = document.createElement("span");
  label.textContent = "Similarity hints:";
  label.style.color = "var(--muted)";
  label.style.fontSize = "0.8rem";
  label.style.marginRight = "0.35rem";
  els.suggestions.appendChild(label);

  for (const item of list) {
    const btn = tpl.content.firstElementChild.cloneNode(true);
    btn.classList.add(item.confidence);
    btn.textContent = `${item.ref} · d=${item.distance}`;
    btn.title = `${item.label}\n${item.image}`;
    btn.addEventListener("click", () => {
      setYaleByOid(item.oid, item.ref);
      els.refInput.value = item.ref;
      els.refInput.focus();
    });
    els.suggestions.appendChild(btn);
  }
}

function setYaleByOid(oid, ref) {
  const opt = [...els.yaleSelect.options].find((o) => o.value === oid);
  if (opt) els.yaleSelect.value = oid;
  onYaleSelect(ref);
}

function onYaleSelect(prefRef) {
  const opt = els.yaleSelect.selectedOptions[0];
  if (!opt) return;
  const viewer = opt.dataset.viewer;
  const ref = prefRef || opt.dataset.ref;
  const oid = opt.value;
  els.yaleImg.src = `/api/yale-image?oid=${encodeURIComponent(oid)}`;
  els.overlayImg.src = els.yaleImg.src;
  els.yaleImg.alt = `Yale Beinecke folio ${ref}`;
  els.yaleImg.onerror = () => {
    els.yaleImg.alt = "Yale image failed to load — restart server (python serve.py) and hard-refresh.";
  };
  els.yaleLink.href = viewer;
  if (!els.refInput.value) els.refInput.value = ref;
  applyTransform();
}

async function confirmCurrent() {
  if (!currentId) return;
  const ref = els.refInput.value.trim();
  if (!ref) {
    alert("Enter a confirmed beineckeRef before saving.");
    return;
  }
  const opt = els.yaleSelect.selectedOptions[0];
  const res = await fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: currentId,
      beineckeRef: ref,
      yaleLabel: opt?.textContent,
      yaleOid: opt?.value,
    }),
  });
  const data = await res.json();
  bootstrap.state = data.state;
  await saveNote();
  stepQueue(1, true);
}

async function skipCurrent() {
  if (!currentId) return;
  const res = await fetch("/api/skip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: currentId }),
  });
  const data = await res.json();
  bootstrap.state = data.state;
  stepQueue(1, true);
}

async function saveNote() {
  if (!currentId) return;
  await fetch("/api/note", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: currentId, note: els.noteInput.value }),
  });
  bootstrap.state.notes = bootstrap.state.notes || {};
  bootstrap.state.notes[currentId] = els.noteInput.value;
}

function stepQueue(delta, stayInFiltered = false) {
  if (!filteredIds.length) return;
  const idx = Math.max(0, filteredIds.indexOf(currentId));
  let next = idx + delta;
  if (next < 0) next = 0;
  if (next >= filteredIds.length) next = filteredIds.length - 1;
  if (stayInFiltered && next === idx && delta > 0) {
    refreshQueue();
    if (filteredIds.length) {
      const n = Math.min(idx, filteredIds.length - 1);
      selectRow(filteredIds[n]);
    }
    return;
  }
  selectRow(filteredIds[next]);
}

async function exportPatch() {
  const res = await fetch("/api/export-patch", { method: "POST" });
  const data = await res.json();
  els.exportStatus.textContent = `Exported ${data.patch.count} rows → ${data.path}`;
}

function resetPanZoom() {
  pan.local = { x: 0, y: 0 };
  pan.yale = { x: 0, y: 0 };
  zoom = 1;
  els.zoomRange.value = "100";
  els.zoomLabel.textContent = "100%";
  applyTransform();
}

function onZoom() {
  zoom = Number(els.zoomRange.value) / 100;
  els.zoomLabel.textContent = `${els.zoomRange.value}%`;
  applyTransform();
}

function applyTransform() {
  for (const key of ["local", "yale"]) {
    const img = key === "local" ? els.localImg : els.yaleImg;
    const offset = pan[key];
    img.style.transform = `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`;
  }
  els.overlayImg.style.transform = els.yaleImg.style.transform;
  updateOverlay();
}

function updateOverlay() {
  const on = els.overlayMode.checked;
  els.overlayImg.classList.toggle("hidden", !on);
  els.overlayImg.style.opacity = Number(els.overlayOpacity.value) / 100;
  if (on) {
    els.overlayImg.src = els.yaleImg.src;
    els.overlayImg.style.transform = els.yaleImg.style.transform;
  }
}

function setupPan(key) {
  const viewport = document.querySelector(`.viewport[data-pane="${key}"]`);
  viewport.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    dragState = { key, startX: e.clientX, startY: e.clientY, base: { ...pan[key] } };
    viewport.classList.add("dragging");
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener("pointermove", (e) => {
    if (!dragState || dragState.key !== key) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    pan[key] = { x: dragState.base.x + dx, y: dragState.base.y + dy };
    if (els.syncPan.checked && key === "local") {
      pan.yale = { ...pan.local };
    } else if (els.syncPan.checked && key === "yale") {
      pan.local = { ...pan.yale };
    }
    applyTransform();
  });
  const end = (e) => {
    if (!dragState || dragState.key !== key) return;
    viewport.classList.remove("dragging");
    dragState = null;
    try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
  };
  viewport.addEventListener("pointerup", end);
  viewport.addEventListener("pointercancel", end);
}

init().catch((err) => {
  console.error(err);
  document.body.innerHTML = `<pre style="padding:2rem;color:#ffb4b4">Failed to load: ${err}</pre>`;
});
