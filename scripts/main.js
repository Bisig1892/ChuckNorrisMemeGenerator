window.onload = function () {
    var jokeBtn = document.getElementById('get-joke');
    jokeBtn.onclick = fetchJoke;
    populateCategories();
};
function fetchJoke() {
    var jokeBtn = this;
    jokeBtn.disabled = true;
    var loaderImg = document.getElementById('loader');
    loaderImg.classList.add('loader');
    var request = new XMLHttpRequest();
    request.onreadystatechange = handleJokeResponse;
    request.open('GET', 'https://api.icndb.com/jokes/random');
    request.send();
}
function handleJokeResponse() {
    var request = this;
}
function displayJoke(j) {
    var jokeTextPar = document.getElementById('joke-text');
    jokeTextPar.innerHTML = j.joke;
    var jokeIdPar = document.getElementById('joke-id');
    jokeIdPar.innerHTML = 'Id: ' + j.id.toString();
    var categoryList = document.getElementById('categories');
    categoryList.innerHTML = '';
    for (var i = 0; i < j.categories.length; i++) {
        var item = document.createElement('li');
        item.innerHTML = j.categories[i];
        categoryList.appendChild(item);
    }
    var catDisplay = document.getElementById('category-display');
    if (j.categories.length == 0) {
        catDisplay.style.display = 'none';
    }
    else {
        catDisplay.style.display = 'block';
    }
    var loaderImg = document.getElementById('loader');
    loaderImg.classList.remove('loader');
    setTimeout(function () {
        var jokeBtn = document.getElementById('get-joke');
        jokeBtn.disabled = false;
    }, 3000);
}
function populateCategories() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.icndb.com/categories');
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var categories = JSON.parse(this.responseText).value;
        }
    };
    request.send();
}
