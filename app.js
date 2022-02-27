
// ১০. সিরিয়াস প্রাকটিস 

// হয় মডিউল ৩৩ ভালো করে দেখে ফেলো। বিশেষ করে the meal db রিলেটেড ৩৩-৫ থেকে ৩৩-৮পর্যন্ত। তারপরে আরো সময় থাকলে এর আরেকটা খালতো ভাই the coktaildb থেকে কিছু জিনিস এনে দেখাবে। একজাক্টলি কি দেখাতে হবে। সেটা আমি বলে দিবো না। তুমি ওদের ওয়েবসাইট এ যাও। সেখানে কি কি লেখা আছে সেগুলা পড়ো। api গুলা এর ছোট করে কি কি করে বলা আছে। সেগুলা দেখো। তারপর কিছু ডাটা লোড করো। সেই ডাটাগুলো দেখাও। এইখানে সার্চ ফাংশনালিটি ইমপ্লিমেন্ট করো। অনেকটা mealdb এর মতো। আবার কোন একটাতে ক্লিক করলে সেটার ডিটেল দেখাবে। 



// Spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};

const defaultCoktail = () => {
    // Spinner 
    toggleSpinner('block');

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => showDefaultCoktail(data.drinks[0]))
};

defaultCoktail();


const showDefaultCoktail = (drink) => {
    // console.log(drink);
    
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = `
        <div onClick="loadDetailsCoktail(${drink.idDrink})" class="card p-3 mb-3 m-auto" style="max-width: 540px;">
            <div class="row g-0 align-item-center">
                <div class="col-md-4">
                    <img src="${drink.strDrinkThumb}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${drink.strDrink}</h5>
                        <p class="card-text">${drink.strInstructions.slice(0,120)}</p>
                        <p class="card-text"><small class="text-muted">${drink.strGlass}</small></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    // Spinner 
    toggleSpinner('none');
};




const loadCoktails = () => {
    const coktailSearchInput = document.getElementById('coktailSearchinput');
    const coktailSearchInputValue = coktailSearchInput.value
    coktailSearchInput.value = '';

    // Spinner 
    toggleSpinner('block');

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coktailSearchInputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => showCoktails(data.drinks));
}



const showCoktails = (coktails) => {
    // console.log(coktails);
    
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.textContent = '';
    // Clear the details container 
    document.getElementById('showDetails').textContent = '';
    // Jodi search result e kichu na ashe 
    if(!coktails) {
        searchResultsContainer.innerHTML = `
            <h4 class="text-danger text-center mt-5">404! there has no results! Try Again!</h4>
        `;
    }

    coktails?.forEach(coktail => {
        const section = document.createElement('section');
        section.classList.add('col-md-3');
        section.classList.add('mb-2');
        section.innerHTML = `
        <div onClick="loadDetailsCoktail(${coktail.idDrink})" class="">
            <img  src="${coktail.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h6 class="card-title">${coktail.strDrink}</h6>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-success">Details</button>
            </div>
        </div>
        `;
        searchResultsContainer.appendChild(section);
    });
    // Spinner 
    toggleSpinner('none');
};

// Margarita

const loadDetailsCoktail = (idDrink) => {
    // Spinner 
    toggleSpinner('block');

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailsCoctail(data.drinks[0]))
};


const showDetailsCoctail = (coctail) => {
    // console.log(coctail);
    
    const showDetails = document.getElementById('showDetails');
    showDetails.innerHTML = `
    <div class="text-center">
        <img src="${coctail.strDrinkThumb}" width="250" height="300" alt="">
        <img src="${coctail.strImageSource ? coctail.strImageSource : ''}" width="250" height="300" alt=" No Image Found">
        <h2>${coctail.strDrink}</h2>
        <small>${coctail.strIngredient1}, ${coctail.strIngredient2}, ${coctail.strIngredient3}</small>
        <p>${coctail.strInstructions}</p>
        <p>${coctail.strInstructionsDE}</p>
        <p>${coctail.strInstructionsIT}</p>
    </div>
    `;
    // Spinner 
    toggleSpinner('none');
};
