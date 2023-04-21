const detailContainer = document.getElementById("center-details");

let centersData = {};
async function getISROCentersData() {
  const apiUrl = "https://isro.vercel.app/api/centres";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Not Found");
    }
    centersData = await response.json();
    printISROCentersData(centersData);
  } catch (error) {
    console.log(error.message);
  }
}

async function printISROCentersData(data) {
  const fragment = document.createDocumentFragment();
  console.log(data.centres);
  for (const center of data.centres) {
    for (const key in center) {
      if (key !== "id") {
        const child = document.createElement("p");
        child.textContent = center[key];
        fragment.appendChild(child);
      }
    }
  }
  detailContainer.append(fragment);
}

getISROCentersData();
