fetch("./data.json")
   .then((res) => res.json())
   .then((data) => {
      //
      const container = document.querySelector("#extensions-container");
      //
      data.forEach((extension) => {
         const card = document.createElement("div");
         card.className = "card";
         card.className = "container";

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
            <button>Remove</button>
            <label class="switch">
               <input type="checkbox" ${extension.isActive ? "checked" : ""} />
               <span class="slider round"></span>
            </label>
         </div>
         
            `;

         container.appendChild(card);
      });
   })
   .catch((err) => console.error("Failed to load JSON", err));
