

const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}



const displayPhones = phones => {
    console.log(phones);

    // 1. get the element
    const phoneContainer = document.getElementById('phone-container');

    phones.forEach(phone => {
        console.log(phone);
        // 2. Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-full md:w-96 lg:w-80 bg-base-100 shadow-xl`;

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
}


loadPhone();