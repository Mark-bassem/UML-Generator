mermaid.initialize({ startOnLoad: true });

const input = document.getElementById('system-input');
const btn = document.getElementById('generate-btn');

btn.addEventListener('click', async () => {
  const prompt = input.value.trim();
  if (!prompt) return alert('Please enter a system description');

  try {
    const res = await fetch('/api/generate-diagrams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) throw new Error(`Server responded with ${res.status}`);

    const data = await res.json();
    renderDiagrams(data);

  } catch (e) {
    alert('❌ Failed: ' + e.message);
    console.error(e);
  }
});

function renderDiagrams(data) {
  renderUseCaseDiagram(data);
  renderClassDiagram(data);
  renderSequenceDiagram(data);
}

// --- Use Case Diagram ---
function renderUseCaseDiagram(data) {
  const actors = data.useCases?.actors || [];
  const useCases = data.useCases?.cases || [];
  const relationships = data.useCases?.relationships || [];

  if (!actors.length && !useCases.length) {
    document.getElementById('usecase-diagram').innerHTML =
      '<p class="text-slate-400">لا يوجد بيانات للرسم</p>';
    return;
  }

  const diagram = `
usecaseDiagram
${actors.map(a => `actor ${a}`).join('\n')}
${useCases.map(c => `usecase ${c}`).join('\n')}
${relationships.map(r => `${r.actor} --> ${r.useCase}`).join('\n')}
  `;
  document.getElementById('usecase-diagram').innerHTML = diagram;
  mermaid.init(undefined, '#usecase-diagram');
}

// --- Class Diagram ---
function renderClassDiagram(data) {
  const classes = data.classes || [];
  if (!classes.length) {
    document.getElementById('class-diagram').innerHTML =
      '<p class="text-slate-400">لا يوجد بيانات للرسم</p>';
    return;
  }

  const diagram = `
classDiagram
${classes.map(c => `class ${c.name} {\n${(c.attributes||[]).join('\n')}\n${(c.methods||[]).join('\n')}\n}`).join('\n')}
${classes.flatMap(c => c.relationships||[]).map(r => `${r.type} ${r.target}`).join('\n')}
  `;
  document.getElementById('class-diagram').innerHTML = diagram;
  mermaid.init(undefined, '#class-diagram');
}

// --- Sequence Diagram ---
function renderSequenceDiagram(data) {
  const sequences = data.sequence || [];
  if (!sequences.length) {
    document.getElementById('sequence-diagram').innerHTML =
      '<p class="text-slate-400">لا يوجد بيانات للرسم</p>';
    return;
  }

  const diagram = `
sequenceDiagram
${sequences.flatMap(s => (s.messages||[]).map(m => `${s.actor}->>${s.actor}: ${m}`)).join('\n')}
  `;
  document.getElementById('sequence-diagram').innerHTML = diagram;
  mermaid.init(undefined, '#sequence-diagram');
}
