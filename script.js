const hiveContainer = document.getElementById('hive');
const beeDetail = document.getElementById('bee-detail');
const categoryNameEl = document.getElementById('category-name');
const beeListEl = document.getElementById('bee-list');

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

function renderCategories() {
  beeCategories.forEach(category => {
    const div = document.createElement('div');
    div.classList.add('category');
    div.textContent = category.name;
    div.addEventListener('click', () => {
      categoryNameEl.textContent = category.name;
      beeListEl.textContent = category.bees.join(", ") + "\n";
      beeDetail.classList.remove('hidden');
    });
    hiveContainer.appendChild(div);
  });
}

renderCategories();
