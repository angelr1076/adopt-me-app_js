import fetchJsonp from "fetch-jsonp";
import { isValidZip, showAlert } from "./validate";

const petForm = document.querySelector("#pet-form");

petForm.addEventListener("submit", fetchAnimals);

// Fetch Animals From API
function fetchAnimals(e) {
  e.preventDefault();

  // Get User Input
  const animal = document.querySelector("#animal").value;
  const zip = document.querySelector("#zip").value;
  const sex = document.querySelector("#sex").value;
  console.log(sex);

  // Validate Zip
  if (!isValidZip(zip)) {
    showAlert("Please enter a valid zip code.", "danger");
    return;
  }

  // Fetch Pets
  fetchJsonp(
    `https://api.petfinder.com/pet.find?format=json&key=8cdeeb4f8b12fbdd8a7d34eca794a821&animal=${animal}&location=${zip}&sex=${sex}&callback=callback`,
    {
      jsonpCallbackFunction: "callback",
    }
  )
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(err => console.log(err));
}
// then(data => console.log(data.petfinder.pets.pet))
function callback(data) {
  console.log(data);
}

// Show Listings of Pets
function showAnimals(pets) {
  const results = document.querySelector("#results");

  // Clear first
  results.innerHTML = "";
  // Loops through pets
  pets.map(pet => {
    console.log(pet);
    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
        <div class="row">
        <div class="col-sm-6 text-center">
               <img class="img-fluid rounded mt-2" src="${pet.media.photos
                 .photo[2].$t
                 ? `${pet.media.photos.photo[2].$t}`
                 : `Photo unavailable`}">
            <p>${pet.shelterPetId.$t
              ? `Pet ID: ${pet.shelterPetId.$t}`
              : `Pet ID unavaiable`}</p>
            </div>
            <div class="col-sm-6">
            <h4 class="text-primary">${pet.name.$t} (${pet.age.$t})</h4>

            <h4 ml-3>${pet.breeds.breed.$t
              ? `${pet.breeds.breed.$t}`
              : `<h4 class="text-seconary">Breed unavailable</h4>`}</h4>

            <ul class="list-group">
            <li class="list-group-item">Gender: ${pet.sex.$t
              ? `${pet.sex.$t}`
              : ``}</li>
            <li class="list-group-item">${pet.contact.address1.$t
              ? `${pet.contact.address1.$t}`
              : `Address unavailable`} 
              <li class="list-group-item">${pet.contact.city.$t} ${pet.contact
      .state.$t} ${pet.contact.zip.$t}</li>  
              ${pet.contact.phone.$t
                ? `<li class="list-group-item">Phone:${pet.contact.phone
                    .$t}</li>`
                : `<li class="list-group-item">Phone no. unavailable</li>`}
              ${pet.contact.email.$t
                ? `<li class="list-group-item">Email: ${pet.contact.email
                    .$t}</li>`
                : `<li class="list-group-item">Email unavailable</li>`}
                <li class="list-group-item">Shelter ID: ${pet.shelterId.$t}</li>
                </ul>
            </div>
            
        </div>
    `;
    results.appendChild(div);
  });
}
