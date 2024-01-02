const toggleSpinner = (displayStyle) => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = displayStyle;
};

const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  toggleSpinner("block");

  searchField.value = "";
  if (searchText == "") {
    const searchError = document.getElementById("search-error");
    searchError.style.display = "block";
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((datas) => displaySearchResult(datas.data));
  }
};
const displaySearchResult = (data) => {
  const displayText = document.getElementById("display-text");
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  if (data && data.length > 0) {
    data.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h5 class="card-text">Brand: ${phone.brand}</h5>
                <button type="button" class="btn btn-secondary" onclick ="loadPhoneDetail('${phone.slug}')">View Detail</button>
            </div>
        </div>
      `;
      searchResult.appendChild(div);
    });
    toggleSpinner("none");
  } else {
    toggleSpinner("none");
    searchResult.textContent = "";
    displayText.style.display = "block";
  }
};

const loadPhoneDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayPhoneDetail(data.data);
    });
};
const displayPhoneDetail = (phone) => {
  const phoneDetail = document.getElementById("phone-detail");
  phoneDetail.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.name}</h5>
      <h5 class="card-text">Brand: ${phone.brand}</h5>
      <p class="card-text">Release Date: ${
        phone.releaseDate ? phone.releaseDate : "Not Available"
      }</p>
      <p class="card-text">Sensor: ${phone.mainFeatures.sensors.join(",")}</p>
    </div>
  `;
  phoneDetail.appendChild(div);
};
