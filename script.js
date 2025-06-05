// Variable to hold the default data
const jsonData = [
   {
      logo: "./assets/images/logo-devlens.svg",
      name: "DevLens",
      description:
         "Quickly inspect page layouts and visualize element boundaries.",
      isActive: true,
   },
   {
      logo: "./assets/images/logo-style-spy.svg",
      name: "StyleSpy",
      description: "Instantly analyze and copy CSS from any webpage element.",
      isActive: true,
   },
   {
      logo: "./assets/images/logo-speed-boost.svg",
      name: "SpeedBoost",
      description:
         "Optimizes browser resource usage to accelerate page loading.",
      isActive: false,
   },
   {
      logo: "./assets/images/logo-json-wizard.svg",
      name: "JSONWizard",
      description:
         "Formats, validates, and prettifies JSON responses in-browser.",
      isActive: true,
   },
   {
      logo: "./assets/images/logo-tab-master-pro.svg",
      name: "TabMaster Pro",
      description: "Organizes browser tabs into groups and sessions.",
      isActive: true,
   },
   {
      logo: "./assets/images/logo-viewport-buddy.svg",
      name: "ViewportBuddy",
      description:
         "Simulates various screen resolutions directly within the browser.",
      isActive: false,
   },
   {
      logo: "./assets/images/logo-markup-notes.svg",
      name: "Markup Notes",
      description:
         "Enables annotation and notes directly onto webpages for collaborative debugging.",
      isActive: true,
   },
   {
      logo: "./assets/images/logo-grid-guides.svg",
      name: "GridGuides",
      description:
         "Overlay customizable grids and alignment guides on any webpage.",
      isActive: false,
   },
   {
      logo: "./assets/images/logo-palette-picker.svg",
      name: "Palette Picker",
      description: "Instantly extracts color palettes from any webpage.",
      isActive: true,
   },
   {
      logo: "./assets/images/logo-link-checker.svg",
      name: "LinkChecker",
      description: "Scans and highlights broken links on any page.",
      isActive: true,
   },
   {
      logo: "./assets/images/logo-dom-snapshot.svg",
      name: "DOM Snapshot",
      description: "Capture and export DOM structures quickly.",
      isActive: false,
   },
   {
      logo: "./assets/images/logo-console-plus.svg",
      name: "ConsolePlus",
      description:
         "Enhanced developer console with advanced filtering and logging.",
      isActive: true,
   },
];

let items = [];

let valueButton = "all"; // Variable to hold the value of the button

// display the data
function displayJsonData(filter) {
   const storedData = localStorage.getItem("extensionData");

   const data = storedData ? JSON.parse(storedData) : jsonData;

   items = data;
   const container = document.querySelector("#extensions-container");
   container.innerHTML = ""; // Clear previous items

   data.forEach((extension) => {
      const card = document.createElement("div");
      card.className = "card";

      if (filter === "all") {
         card.innerHTML = displayData(extension);
      } else if (filter === "active" && extension.isActive) {
         card.innerHTML = displayData(extension);
      } else {
         if (filter === "inactive" && !extension.isActive) {
            card.innerHTML = displayData(extension);
         }
      }

      if (!card.innerHTML) return;
      container.appendChild(card);

      function displayData(extension) {
         return `
               <div class="first-part">
                  <img src="${extension.logo}" alt="${
            extension.name
         } logo" class="logo" />
                  <div class="text">
                     <h2>${extension.name}</h2>
                     <p>${extension.description}</p>
                  </div>
               </div>
               <div class="second-part">
                  <button class="btn-remove" onClick="removeExtension('${
                     extension.name
                  }')">Remove</button>
                  <label class="switch">
                     <input type="checkbox" ${
                        extension.isActive ? "checked" : ""
                     } onClick="toggleCheckbox(this, '${extension.name}')"/>
                     <span class="slider round" tabindex="0"></span>
                  </label>
               </div>
               `;
      }
   });
}

// display the default data

displayJsonData("all");

// Activate button ALL / ACTIVE / INACTIVE
function activateButton(button) {
   const buttons = document.querySelectorAll(".second-header-button");

   buttons.forEach((btn) => {
      btn.classList.remove("active");
   });

   button.classList.add("active");

   valueButton = button.value;

   displayJsonData(button.value);
}

// toggle checkbox
function toggleCheckbox(checkbox, extensionName) {
   const isActive = checkbox.checked;
   const card = items.find((item) => item.name === extensionName);

   if (card) {
      card.isActive = isActive;
      localStorage.setItem("extensionData", JSON.stringify(items));
   }

   if (valueButton !== "all") {
      displayJsonData(valueButton);
   }
}

// remove extension
function removeExtension(extensionName) {
   items = items.filter((item) => item.name !== extensionName);
   localStorage.setItem("extensionData", JSON.stringify(items));
   displayJsonData(valueButton);
}

// toggle dark mode and light mode
let darkMode = localStorage.getItem("dARKmODE");
let themeSwitch = document.querySelector(".theme-switch");

const enableDarkMode = () => {
   document.body.classList.add("dark-mode");
   localStorage.setItem("dARKmODE", "active"); // Save dark mode state
};

const disableDarkMode = () => {
   document.body.classList.remove("dark-mode");
   localStorage.setItem("dARKmODE", null);
};

if (darkMode === "active") {
   enableDarkMode();
}

themeSwitch.addEventListener("click", () => {
   darkMode = localStorage.getItem("dARKmODE");
   darkMode !== "active" ? enableDarkMode() : disableDarkMode();
});

// Reset data
function resetData() {
   location.reload();
   localStorage.removeItem("extensionData");
   displayJsonData("all");
}
