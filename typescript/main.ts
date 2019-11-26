window.onload = function() {
    let jokeBtn = document.getElementById('get-joke');
    jokeBtn.onclick = fetchJoke;

    populateCategories();
}

function fetchJoke() {
    let jokeBtn = <HTMLButtonElement>this;
    jokeBtn.disabled = true;
    let loaderImg = document.getElementById('loader');
    loaderImg.classList.add('loader');

    let request = new XMLHttpRequest();
    request.onreadystatechange = handleJokeResponse;
    let url = 'https://api.icndb.com/jokes/random';
    if(isCategorySelected()) {
        let category = getSelectedCategory();
        url += '?limitTo=' + category;
    }
    // Set URL to send request to:
    request.open('GET', url);
    // Initiate request
    request.send();
}

function isCategorySelected():boolean {
    let list = <HTMLSelectElement>document.getElementById('cat-list');
    if(list.selectedIndex == 0) {
        return false;
    }
    return true;
}
// Return the single category that is selected
function getSelectedCategory():string {
    let list = <HTMLSelectElement>document.getElementById('cat-list');
    let index = list.selectedIndex;
    let cat = list.options[index].text;
    return cat;
}

function handleJokeResponse() {
    let request = <XMLHttpRequest>this;

    // readyState 4 means reuest is finished
    // status 200 means "OK" - success
}

function displayJoke(j:ChuckNorrisJoke):void {
    let jokeTextPar = document.getElementById('joke-text');
    jokeTextPar.innerHTML = j.joke;
    
    let jokeIdPar = document.getElementById('joke-id');
    jokeIdPar.innerHTML = 'Id: ' + j.id.toString();

    let categoryList = document.getElementById('categories');
    // Clear out categories from any previous joke
    categoryList.innerHTML = '';

    for(let i = 0; i < j.categories.length; i++) {
        let item = document.createElement('li');
        item.innerHTML = j.categories[i];
        categoryList.appendChild(item);

    }
    let catDisplay = document.getElementById('category-display');
    if(j.categories.length == 0) {
        catDisplay.style.display = 'none';
    } else {
        catDisplay.style.display = 'block';
    }

    let loaderImg = document.getElementById('loader');
    loaderImg.classList.remove('loader');

    // Re-enabling joke button 3 seconds after joke has loaded
    setTimeout(function() {
        let jokeBtn = <HTMLButtonElement>document.getElementById('get-joke');
        jokeBtn.disabled = false;
    }, 3000)
}

// Display categories in a dropdown list

function populateCategories() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.icndb.com/categories')

    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let categories:string[] = JSON.parse(this.responseText).value;
            populateCatDropdown(categories);
        }
    }
    request.send();
}

function populateCatDropdown(categories:string[]):void {
    let list = document.getElementById('cat-list');
    
    for(let i = 0; i < categories.length; i++) {
        let option = document.createElement('option');
        option.text = categories[i];
        list.appendChild(option); // Add <option> to the select

    }
}