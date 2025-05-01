let decisions = [];
let currentId = 0;
let steps = 0;
let influence = 0;
let multiplier = 1.0;

fetch("leadership_funnel.json")
  .then((res) => res.json())
  .then((data) => {
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
      influence += choice.influenceChange * multiplier;
      multiplier *= choice.multiplierChange;
      steps++;
      currentId = choice.nextId;
      showQuestion(currentId);
    };
    qDiv.appendChild(btn);
  });
  const stats = document.createElement("div");
  stats.className = "mt-4 text-sm text-gray-400";
  stats.innerText = `Influence: ${Math.round(influence)} | Multiplier: ${multiplier.toFixed(2)}`;
  qDiv.appendChild(stats);

  container.appendChild(qDiv);
}