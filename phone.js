const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll)
  }
  
  
  const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("display-container");
    phoneContainer.innerText = " ";
  
    const showALlButton = document.getElementById("showALlButton");
    if (phones.length > 12 && !isShowAll) {
      showALlButton.classList.remove("hidden");
  
    } else {
      showALlButton.classList.add("hidden");
    }
  
    if (!isShowAll) {
      phones = phones.slice(0, 12)
    }
  
    phones.forEach((phone) => {
      // console.log(phone);
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card w-96 bg-base-100 shadow-xl"> <figure><img src="${phone.image}" alt="Shoes" /></figure>
      <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
      <button onclick="showDetailsButton('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
  
      `;
      phoneContainer.appendChild(div);
      // hide loading spinner
      loadingSpinner(false)
    });
  }
  
  
  const searchButton = (isShowAll) => {
    loadingSpinner(true)
    const searchInput = document.getElementById("searchInput");
    const searchText = searchInput.value;
  
    loadPhone(searchText, isShowAll)
    searchText.textContent = " ";
  
  }
  
  const loadingSpinner = (isLoading) => {
    const loadingData = document.getElementById("loading-spinner")
    if (isLoading) {
      loadingData.classList.remove("hidden");
    } else {
      loadingData.classList.add("hidden");
  
    }
  
  }
  
  const showAllData = () => {
    searchButton(true)
  }
  
  
  const showDetailsButton = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json()
    const details = data.data;
    displayShowDetailsFunction(details)
    // console.log(details);
  
  }
  
  
  const displayShowDetailsFunction = (details) => {
    // console.log(details);
    const showDetailsContainer = document.getElementById("show-details-container");
    showDetailsContainer.innerHTML = `
    <img src="${details.image}">
    <h3 id="show-details-phone-name" class="font-bold text-lg">${details.name}</h3>
    <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h2>Storage: ${details.mainFeatures?.storage}</h2>
    <p>Phone Display: <span>${details?.mainFeatures?.displaySize}</span></p>
    <p>Memory: <span>${details?.mainFeatures?.memory}</span></p>
    
    
    `
    // console.log("hello", id);
    show_details_modal.showModal()
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  