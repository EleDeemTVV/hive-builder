const beesDiv = document.getElementById("bees");
const hiveContainer = document.getElementById('hive');
const controls = document.getElementById('controls');
const categorySelect = document.getElementById('category-select');
const beeSelect = document.getElementById('bee-select');
const assignBtn = document.getElementById('assign-bee');

const beeDetail = document.getElementById('bee-detail');
const beeNameEl = document.getElementById('bee-name');
const beeCategoryEl = document.getElementById('bee-category');

const beeCategories = [
  {
    name: "🔴 Red Bees",
    bees: [
      "Rad Bee", "Rascal Bee", "Fire Bee", "Rage Bee", "Riley Bee",
      "Demon Bee", "Shy Bee", "Precise Bee", "Spicy Bee",
      "Crimson Bee", "Festive Bee", "Vicious Bee"
    ],
  },
  {
    name: "🔵 Blue Bees",
    bees: [
      "Bumble Bee", "Cool Bee", "Bubble Bee", "Bucko Bee", "Frosty Bee",
      "Diamond Bee", "Ninja Bee", "Buoyant Bee", "Tadpole Bee",
      "Cobalt Bee", "Vicious Bee"
    ],
  },
  {
    name: "⚪ White Bees",
    bees: [
      "Basic Bee", "Bomber Bee", "Brave Bee", "Hasty Bee", "Looker Bee",
      "Stubborn Bee", "Commander Bee", "Demo Bee", "Exhausted Bee", "Honey Bee",
      "Shocked Bee", "Baby Bee", "Carpenter Bee", "Lion Bee", "Music Bee",
      "Vector Bee", "Fuzzy Bee", "Digital Bee", "Bear Bee", "Gummy Bee",
      "Photon Bee", "Puppy Bee", "Tabby Bee", "Vicious Bee"
    ],
  }
];

// --- Vypiš seznam včel vlevo ---
function renderBeeList() {
  beesDiv.innerHTML = "";
  beeCategories.forEach(category => {
    const catDiv = document.createElement("div");
    catDiv.classList.add("bee-category");

    const catTitle = document.createElement("h3");
    catTitle.textContent = category.name;
    catDiv.appendChild(catTitle);

    const beesText = category.bees.join(", ");
    const beesList = document.createElement("p");
    beesList.classList.add("bee-list-item");
    beesList.textContent = beesText;

    catDiv.appendChild(beesList);
    beesDiv.appendChild(catDiv);
  });
}

// --- Hive Builder část ---
const rows = 5;
const hexesPerRowOdd = 7;
const hexesPerRowEven = 6;

let hiveData = [];

function createHive() {
  hiveContainer.innerHTML = "";
  hiveData = [];

  for (let r = 0; r < rows; r++) {
    const isOffset = r % 2 === 1;
    const hexCount = isOffset ? hexesPerRowEven : hexesPerRowOdd;

    for (let i = 0; i < hexCount; i++) {
      const hex = document.createElement("div");
      hex.classList.add("hex");
      if (isOffset) hex.classList.add("row-offset");

      const index = hiveData.length;

      hex.dataset.index = index;
      hex.textContent = "";

      hex.addEventListener("click", () => onHexClick(index));

      hiveContainer.appendChild(hex);
      hiveData.push(null);
    }
  }
}

let selectedHexIndex = null;
function onHexClick(index) {
  selectedHexIndex = index;
  controls.classList.remove("hidden");
  beeDetail.classList.add("hidden");
  updateCategoryOptions();
}

function updateCategoryOptions() {
  categorySelect.innerHTML = "";
  beeCategories.forEach((cat, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = cat.name;
    categorySelect.appendChild(opt);
  });
  updateBeeOptions();
}

function updateBeeOptions() {
  const catIndex = categorySelect.value;
  beeSelect.innerHTML = "";
  beeCategories[catIndex].bees.forEach(bee => {
    const opt = document.createElement("option");
    opt.value = bee;
    opt.textContent = bee;
    beeSelect.appendChild(opt);
  });
}

categorySelect.addEventListener("change", updateBeeOptions);

assignBtn.addEventListener("click", () => {
  if (selectedHexIndex === null) return;

  const catIndex = categorySelect.value;
  const beeName = beeSelect.value;
  const categoryName = beeCategories[catIndex].name;

  hiveData[selectedHexIndex] = {
    name: beeName,
    category: categoryName
  };

  updateHiveUI();
  showBeeDetail(selectedHexIndex);
  controls.classList.add("hidden");
});

function updateHiveUI() {
  const hexes = document.querySelectorAll(".hex");
  hexes.forEach((hex, i) => {
    const data = hiveData[i];
    hex.textContent = data ? data.name : "";
  });
}

function showBeeDetail(index) {
  const data = hiveData[index];
  if (!data) {
    beeDetail.classList.add("hidden");
    return;
  }

  beeNameEl.textContent = data.name;
  beeCategoryEl.textContent = data.category;
  beeDetail.classList.remove("hidden");
}

// start
renderBeeList();
createHive();
