// dynamic data

fetch("./data.json")
   .then((res) => res.json())
   .then((data) => {
      //
      const container = document.querySelector("#extensions-container");
      //
      data.forEach((extension) => {
         const card = document.createElement("div");
         card.className = "card";

         card.innerHTML = `
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
            <button class="btn-remove">Remove</button>
            <label class="switch">
               <input type="checkbox" ${extension.isActive ? "checked" : ""} />
               <span class="slider round" tabindex="0"></span>
            </label>
         </div>
         
            `;

         container.appendChild(card);
      });
   })
   .catch((err) => console.error("Failed to load JSON", err));

// toggle dark mode and light mode
let darkMode = localStorage.getItem("dark-mode");
let themeSwitch = document.querySelector(".theme-switch");

const enableDarkMode = () => {
   document.body.classList.add("dark-mode");
   localStorage.setItem("dark-mode", "active");
};

const disableDarkMode = () => {
   document.body.classList.remove("dark-mode");
   localStorage.setItem("dark-mode", null);
};

if (darkMode === "active") {
   enableDarkMode();
}

themeSwitch.addEventListener("click", () => {
   darkMode = localStorage.getItem("dark-mode");
   darkMode !== "active" ? enableDarkMode() : disableDarkMode();
});

// Activate button
function activateButton(button) {
   const buttons = document.querySelectorAll(".second-header-button");

   buttons.forEach((btn) => {
      btn.classList.remove("active");
   });

   button.classList.add("active");
}
