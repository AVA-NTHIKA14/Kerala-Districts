const districts = [
  {
    name: "Thiruvananthapuram",
    also: "",
    region: "south",
    tagline: "Sree Padmanabhaswamy Temple",
    description: "Thiruvananthapuram is most famous for the historic Sree Padmanabhaswamy Temple, renowned for its grand Dravidian architecture and cultural depth.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sree%20Padmanabhaswamy%20temple%2001.jpg"
  },
  {
    name: "Kollam",
    also: "",
    region: "south",
    tagline: "The Cashew Capital",
    description: "Kollam is best known as the Cashew Capital of India and as a gateway to Kerala's peaceful backwaters and Ashtamudi Lake.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/House%20boat.JPG"
  },
  {
    name: "Pathanamthitta",
    also: "",
    region: "south",
    tagline: "Sabarimala Temple",
    description: "Pathanamthitta is closely associated with the Sabarimala Temple, a major pilgrimage site nestled in the Western Ghats.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/18%20steps%20at%20sabarimala.jpg"
  },
  {
    name: "Alappuzha",
    also: "",
    region: "south",
    tagline: "The Venice of the East",
    description: "Alappuzha is celebrated for its houseboats drifting through the backwaters, making it one of Kerala's most iconic destinations.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Alappuzha%20Boat%20Beauty%20W.jpg"
  },
  {
    name: "Kottayam",
    also: "",
    region: "south",
    tagline: "Letters, Lakes and Latex",
    description: "Kottayam is known for its literacy, rubber cultivation, and its intimate connection with the Vembanad Lake region.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kerala%20backwaters%2C%20Vembanad%20Lake%2C%20India.jpg"
  },
  {
    name: "Idukki",
    also: "",
    region: "south",
    tagline: "The Idukki Arch Dam",
    description: "Idukki is famous for the arch dam between mountain ridges and for its misty tea and cardamom landscapes.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/IdukkiDamConcaveSide.jpg"
  },
  {
    name: "Ernakulam",
    also: "",
    region: "central",
    tagline: "Chinese Fishing Nets",
    description: "Ernakulam is famous for the giant Chinese fishing nets and its role as Kerala's commercial and port city.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20fishing%20net%2CFort%20Kochi.jpg"
  },
  {
    name: "Thrissur",
    also: "",
    region: "central",
    tagline: "Thrissur Pooram",
    description: "Thrissur is known for its vibrant cultural scene, the Vadakkunnathan Temple, and the legendary Thrissur Pooram festival.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Vadakkumnathan%20Temple.jpg"
  },
  {
    name: "Palakkad",
    also: "",
    region: "central",
    tagline: "Palakkad Fort and the Gap",
    description: "Palakkad is recognized for its historic fort and the scenic Palakkad Gap, a key mountain pass in the Western Ghats.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Palakkad%20Fort.JPG"
  },
  {
    name: "Malappuram",
    also: "",
    region: "north",
    tagline: "Nilambur Teak",
    description: "Malappuram is known for its teak plantations and the Teak Museum, reflecting its strong forest and heritage legacy.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Teak%20Museum%20Nilambur%2004200.JPG"
  },
  {
    name: "Kozhikode",
    also: "",
    region: "north",
    tagline: "Where Vasco da Gama Landed",
    description: "Kozhikode is famous for Kappad Beach, where Vasco da Gama landed, and for its historic spice-trade legacy.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kappad.jpg"
  },
  {
    name: "Wayanad",
    also: "",
    region: "north",
    tagline: "The Edakkal Caves",
    description: "Wayanad is renowned for the Edakkal Caves and the ancient petroglyphs hidden in its forested hills.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/EdakkalCaveCarving.jpg"
  },
  {
    name: "Kannur",
    also: "",
    region: "north",
    tagline: "Theyyam",
    description: "Kannur is famous for Theyyam, a ritual performance art form rich in costume, rhythm, and spiritual tradition.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gulikan%20Theyyam%20kannur.jpg"
  },
  {
    name: "Kasaragod",
    also: "",
    region: "north",
    tagline: "Bekal Fort",
    description: "Kasaragod is known for Bekal Fort and its diverse cultural mix of Malayalam, Tulu, Kannada, and Konkani traditions.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bakel%20fort%20Kasargod%20wide%20view.jpg"
  }
];

let currentRegion = "all";
let currentSearch = "";
let visibleList = districts;
let currentIndex = 0;

const galleryEl = document.getElementById("gallery");
const searchBox = document.getElementById("searchBox");
const filterButtons = document.getElementById("filterButtons");
const randomBtn = document.getElementById("randomBtn");
const countText = document.getElementById("countText");
const noResults = document.getElementById("noResults");

const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const modalImg = document.getElementById("modalImg");
const modalNumber = document.getElementById("modalNumber");
const modalName = document.getElementById("modalName");
const modalTagline = document.getElementById("modalTagline");
const modalDesc = document.getElementById("modalDesc");

function matchesFilters(district) {
  if (currentRegion !== "all" && district.region !== currentRegion) {
    return false;
  }

  if (currentSearch === "") {
    return true;
  }

  const text = (district.name + " " + district.also + " " + district.tagline + " " + district.description).toLowerCase();
  return text.includes(currentSearch);
}

function renderGallery() {
  galleryEl.innerHTML = "";
  visibleList = [];

  for (let i = 0; i < districts.length; i++) {
    const district = districts[i];

    if (matchesFilters(district)) {
      visibleList.push(district);

      const card = document.createElement("article");
      card.className = "card";
      card.setAttribute("tabindex", "0");

      const number = String(i + 1).padStart(2, "0");

      const cardImage = document.createElement("img");
      cardImage.src = district.image;
      cardImage.alt = district.name;
      cardImage.loading = "lazy";
      cardImage.onerror = function () {
        this.style.display = "none";
      };

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      cardBody.innerHTML = `
        <span class="card-number">${number} / 14</span>
        <h3>${district.name}${district.also ? " (" + district.also + ")" : ""}</h3>
        <p>${district.tagline}</p>
      `;

      card.appendChild(cardImage);
      card.appendChild(cardBody);

      card.addEventListener("click", function () {
        openModal(district);
      });

      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(district);
        }
      });

      galleryEl.appendChild(card);
    }
  }

  countText.textContent = "Showing " + visibleList.length + " of " + districts.length + " districts";

  if (visibleList.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

function openModal(district) {
  currentIndex = visibleList.indexOf(district);
  showInModal(district);
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");
}

function showInModal(district) {
  const number = String(districts.indexOf(district) + 1).padStart(2, "0");

  modalImg.src = district.image;
  modalImg.alt = district.name;
  modalNumber.textContent = number + " / 14";
  modalName.textContent = district.name + (district.also ? " (" + district.also + ")" : "");
  modalTagline.textContent = district.tagline;
  modalDesc.textContent = district.description;
}

function closeModal() {
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");
}

function showNext() {
  if (visibleList.length === 0) return;
  currentIndex = (currentIndex + 1) % visibleList.length;
  showInModal(visibleList[currentIndex]);
}

function showPrev() {
  if (visibleList.length === 0) return;
  currentIndex = (currentIndex - 1 + visibleList.length) % visibleList.length;
  showInModal(visibleList[currentIndex]);
}

searchBox.addEventListener("input", function () {
  currentSearch = searchBox.value.trim().toLowerCase();
  renderGallery();
});

filterButtons.addEventListener("click", function (event) {
  if (!event.target.classList.contains("filter-btn")) {
    return;
  }

  currentRegion = event.target.dataset.region;

  const buttons = filterButtons.querySelectorAll(".filter-btn");
  buttons.forEach((button) => button.classList.remove("active"));
  event.target.classList.add("active");

  renderGallery();
});

randomBtn.addEventListener("click", function () {
  if (visibleList.length === 0) return;
  const randomIndex = Math.floor(Math.random() * visibleList.length);
  openModal(visibleList[randomIndex]);
});

closeBtn.addEventListener("click", closeModal);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (!overlay.classList.contains("show")) return;

  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrev();
});

renderGallery();