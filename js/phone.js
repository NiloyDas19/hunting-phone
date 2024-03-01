

const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}



const displayPhones = phones => {
    console.log(phones);

    // 1. get the element
    const phoneContainer = document.getElementById('phone-container');

    // clear the phoneContainer before adding new child
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // Display only first 12 phones
    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        console.log(phone);
        // 2. Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;

        // 3.set inner HTML
        phoneCard.innerHTML = `
            <figure><img src ="${phone.image}"></figure>
            <div class="card-body text-center">
                <h2 class="">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions justify-center">
                    <button class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;

        // 4. append the child
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
    
}

// handel Search
const handelSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}


// loading spinner 
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading) loadingSpinner.classList.remove('hidden');
    else loadingSpinner.classList.add('hidden');
}

// loadPhone();