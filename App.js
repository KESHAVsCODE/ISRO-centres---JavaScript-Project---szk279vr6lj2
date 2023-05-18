const detailContainer = document.getElementById("center-details");
const input = document.getElementById("input-category");
const cityBtn = document.getElementById("city");
const stateBtn = document.getElementById("state");
const centerBtn = document.getElementById("center");
const searchIcon = document.querySelector("i");

let activeBtn = null;

let centersData = {};
async function getISROCentersData() {
  const apiUrl = "https://isro.vercel.app/api/centres";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Not Found");
    }
    centersData = await response.json();
    printISROCentersData();
  } catch (error) {
    console.log(error.message);
  }
}

async function printISROCentersData() {
  detailContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for (const center of centersData.centres) {
    const parent = document.createElement("div");
    parent.classList.add("centers-info");
    for (const key in center) {
      if (key !== "id") {
        const child = document.createElement("p");
        child.textContent = center[key];
        parent.appendChild(child);
      }
    }
    fragment.appendChild(parent);
  }
  detailContainer.append(fragment);
}

getISROCentersData();

function searchCenters() {
  const inputKey = input.value.trim().toLowerCase();

  console.log(inputKey);

  if (!inputKey) {
    //detailContainer.innerHTML = `<p class="error">Please enter a ${activeBtn.id} name </p>`;
    return;
  }

  detailContainer.innerHTML = "";

  if (!activeBtn) {
    detailContainer.innerHTML = `<p class="error">Please select a search category</p>`;
    return;
  }

  let finderKey = activeBtn.name;
  const fragment = document.createDocumentFragment();

  //console.log(finderKey);

  for (const center of centersData.centres) {
    if (center[finderKey].toLowerCase().includes(inputKey)) {
      const parent = document.createElement("div");
      parent.classList.add("centers-info");
      for (const key in center) {
        if (key !== "id") {
          const child = document.createElement("p");
          child.textContent = center[key];
          parent.appendChild(child);
        }
      }
      fragment.appendChild(parent);
    }
  }

  if (!fragment.childElementCount) {
    detailContainer.innerHTML = `<p class="error">Please enter a valid ${activeBtn.id} name </p>`;
    return;
  }

  detailContainer.append(fragment);
}

function activate(event) {
  event.target.classList.toggle("active");
  if (activeBtn && event.target.id === activeBtn.id) {
    activeBtn = null;
    printISROCentersData();
    //console.log(activeBtn);
    return;
  }
  if (activeBtn) activeBtn.classList.toggle("active");

  activeBtn = event.target;
  //console.log(activeBtn);
}

cityBtn.addEventListener("click", activate);
stateBtn.addEventListener("click", activate);
centerBtn.addEventListener("click", activate);

searchIcon.addEventListener("click", searchCenters);

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") searchCenters();
  if (input.value === "") printISROCentersData();
});
