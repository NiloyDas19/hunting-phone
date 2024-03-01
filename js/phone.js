

const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    console.log(data);
    if(data.status === false){
        const phoneContainer = document.getElementById('phone-container');
        phoneContainer.textContent = '';
        const showMassage = document.createElement('p');
        showMassage.classList.add('text-center');
        showMassage.innerText = 'No Phone Available in this name';
        phoneContainer.appendChild(showMassage);
        toggleLoadingSpinner(false);
        return;
    }
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}



const displayPhones =(phones, isShowAll) => {
    // console.log(phones);

    // 1. get the element
    const phoneContainer = document.getElementById('phone-container');

    // clear the phoneContainer before adding new child
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // Display only first 12 phones
    if(!isShowAll) phones = phones.slice(0, 12);


    phones.forEach(phone => {
        // console.log(phone);
        // 2. Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;

        // 3.set inner HTML
        phoneCard.innerHTML = `
            <figure><img src ="${phone.image}"></figure>
            <div class="card-body text-center">
                <h2 class="">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <p>$999</p>
                <div class="card-actions justify-center">
                    <button class="btn btn-primary" onClick = "show_details_modal.showModal(); handleShowDetail('${phone.slug}')">Show Details</button>
                </div>
            </div>
        `;

        // 4. append the child
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}


// handle show details 
const handleShowDetail = async(id) =>{
    // console.log(id);
    // load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const singleMobile = data.data;
    // console.log(singleMobile);
    showPhoneDetails(singleMobile);
} 


const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneImage = document.getElementById('phone-image');
    const phoneName = document.getElementById('phone-name');
    const phoneStorage = document.getElementById('phone-storage');
    const phoneDisplaySize = document.getElementById('phone-display-size');
    const phoneChipset = document.getElementById('phone-chipset');
    const phoneMemory = document.getElementById('phone-memory');
    const phoneSlug = document.getElementById('phone-slug');
    const phoneReleaseDate = document.getElementById('phone-release-date');
    const phoneBrand = document.getElementById('phone-brand');
    const phoneGps = document.getElementById('phone-gps');

    phoneImage.innerHTML = `
        <img src="${phone.image}">
    `;
    phoneName.innerText = phone.name;
    phoneStorage.innerText = phone.mainFeatures.storage;
    phoneDisplaySize.innerText = phone.mainFeatures.displaySize;
    phoneChipset.innerText = phone.mainFeatures.chipSet;
    phoneMemory.innerText = phone.mainFeatures.memory;
    phoneSlug.innerText = phone.slug;
    phoneReleaseDate.innerText = phone.releaseDate;
    phoneBrand.innerText = phone.brand;
    phoneGps.innerText = phone.others?.GPS || "No GPS";

}

// handel Search
const handelSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}


// loading spinner 
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading) loadingSpinner.classList.remove('hidden');
    else loadingSpinner.classList.add('hidden');
}

// handle show all
const handleShowAll = () =>{
    handelSearch(true);
}

loadPhone();