const form = document.getElementById('rentalForm');
const list = document.getElementById('rentalList');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const toolName = document.getElementById('toolName').value;
  const location = document.getElementById('location').value;
  const rate = document.getElementById('rate').value;
  const contact = document.getElementById('contact').value;
  const imageFile = document.getElementById('image').files[0];

  let imgUrl = "https://via.placeholder.com/200x150.png?text=Tool+Image";
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      imgUrl = event.target.result;
      saveAndRender(toolName, location, rate, contact, imgUrl);
    };
    reader.readAsDataURL(imageFile);
  } else {
    saveAndRender(toolName, location, rate, contact, imgUrl);
  }

  form.reset();
});

function saveAndRender(toolName, location, rate, contact, imgUrl) {
  const newRental = { toolName, location, rate, contact, imgUrl };

  const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
  rentals.push(newRental);
  localStorage.setItem('rentals', JSON.stringify(rentals));

  renderRentals();
}

function renderRentals() {
  const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
  list.innerHTML = '';
  rentals.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${r.imgUrl}" alt="${r.toolName}">
      <h3>${r.toolName}</h3>
      <p><b>Location:</b> ${r.location}</p>
      <p><b>Rate:</b> ₹${r.rate}/day</p>
      <p><b>Contact:</b> ${r.contact}</p>
    `;
    list.appendChild(card);
  });
}

renderRentals();
