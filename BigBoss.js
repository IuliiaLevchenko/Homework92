//This event fires when the initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
  const company = {
    //The company object here and it  could be increase if needed
    name: "Велика Компанія",
    type: "Головна компанія",
    platform: "Платформа для продажу квитків",
    sellsSolution: "Рішення для продажу квитків",
    clients: [
      {
        name: "Клієнт 1",
        type: "subCompany",
        uses: "ПО для продажу квитків",
        sells: "Рішення для продажу квитків",
        partners: [
          {
            name: "Клієнт 1.1",
            type: "subSubCompany",
            uses: "Рішення для продажу квитків",
            sells: "Рішення для продажу квитків",
          },
          {
            name: "Клієнт 1.2",
            type: "subSubCompany",
            uses: "Рішення для продажу квитків",
            sells: "Рішення для продажу квитків",
            partners: [
              {
                name: "Клієнт 1.2.3",
                type: "subSubCompany",
                uses: "Рішення для продажу квитків",
                sells: "Рішення для продажу квитків",
              },
            ],
          },
        ],
      },
      {
        name: "Клієнт 2",
        type: "subCompany",
        uses: "ПО для продажу квитків",
        sells: "Рішення для продажу квитків",
      },
    ],
  };

  // Display initial subcompany information
  const initialInfoDiv = document.getElementById("subcompanyInfo");
  initialInfoDiv.innerHTML =
    "<b>Initial Subcompany Information:</b><br><pre>" +
    JSON.stringify(company, null, 2) +
    "</pre>";

  // Form submission event listener
  const form = document.getElementById("subcompanyForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const subcompanyName = document.getElementById("subcompanyName").value;
    const subcompanyInfoDiv = document.getElementById("subcompanyResult");
    subcompanyInfoDiv.innerHTML = "";

    // Find subcompany information based on the entered name
    findValueByKey(company, "name", subcompanyName, subcompanyInfoDiv);
  });
});
//This function recursively searches through the clients array within the company object and its nested subcompanies to find objects with the specified key-value pair. When it finds a match, it outputs them to web page
function findValueByKey(obj, key, value, outputDiv) {
  if (obj[key] === value) {
    outputDiv.innerHTML =
      "<b>Subcompany Information:</b><br><pre>" +
      JSON.stringify(obj, null, 2) +
      "</pre>";
    return;
  }
  /*Recursive function that searches through a nested object structure to find a specific key-value pair
   *This condition checks if the current object (obj) has a property named clients and if it is an array with at least one element.
   */
  if (obj.clients && obj.clients.length > 0) {
    //This loop iterates over each client object within the clients array of the current object
    for (let i = 0; i < obj.clients.length; i++) {
      findValueByKey(obj.clients[i], key, value, outputDiv);
      if (outputDiv.innerHTML !== "") {
        return; // Stop searching if the information is found
      }
      ////This condition checks if the current client object has a property named partners and if it is an array with at least one element
      if (obj.clients[i].partners && obj.clients[i].partners.length > 0) {
        //This nested loop iterates over each partner object within the partners array of the current client
        for (let j = 0; j < obj.clients[i].partners.length; j++) {
          findValueByKey(obj.clients[i].partners[j], key, value, outputDiv);
          if (outputDiv.innerHTML !== "") {
            return; // Stop searching if the information is found
          }
        }
      }
    }
  }
}
