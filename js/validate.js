// Validate zipcode
export function isValidZip(zip) {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

// Display Alert Message
export function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));

  // Get container
  const container = document.querySelector(".container");
  const form = document.querySelector("#pet-form");
  container.insertBefore(div, form);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}
