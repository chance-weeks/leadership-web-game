let decisions = [];
let currentId = 0;
let steps = 0;
let influence = 0;
let multiplier = 1.0;

fetch("leadership_funnel.json")
  .then(res => res.json())
  .then(data => {
    decisions = data;
    showQuestion(currentId);
  });

function showQuestion(id) {
  const container = document.getElementById("game");
  container.innerHTML = "";
  if (steps >= 20 || id === -1) {
    container.innerHTML = `<div class='text-xl text-center'>Game Over.<br>Your final influence: <strong>${Math.round(influence)}</strong></div>`;
    return;
  }

  const decision = decisions[id];
  const qDiv = document.createElement("div");
  qDiv.innerHTML = `<div class='text-lg mb-4'>Scenario ${steps + 1}: ${decision.prompt}</div>`;

  decision.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "block w-full text-left bg-blue-600 hover:bg-blue-700 px-4 py-2 my-2 rounded";
    btn.innerText = `${index + 1}. ${choice.text}`;
    btn.onclick = () => {
      const traitDiv = document.createElement("div");
      traitDiv.className = `mt-2 text-lg font-semibold ${choice.color === "green" ? "text-green-400" : "text-red-400"}`;
      traitDiv.innerText = `${choice.color === "green" ? "Positive Trait:" : "Negative Trait:"} ${choice.trait}`;
      qDiv.appendChild(traitDiv);

      influence += choice.influenceChange * multiplier;
      multiplier *= 1; // you could update this to scale with traits if you want
      currentId = choice.nextId;
      steps++;

      setTimeout(() => showQuestion(currentId), 1800);
    };
    qDiv.appendChild(btn);
  });

  const stats = document.createElement("div");
  stats.className = "mt-4 text-sm text-gray-400";
  stats.innerText = `Influence: ${Math.round(influence)} | Multiplier: ${multiplier.toFixed(2)}`;
  qDiv.appendChild(stats);

  container.appendChild(qDiv);
}