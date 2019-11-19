window.onload = function () {
    var memeBtn = document.getElementById('get-meme');
    memeBtn.onclick = fetchMeme;
};
function fetchMeme() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = handleMemeResponse;
    request.open('GET', 'https://api.icndb.com/jokes/random');
    request.send();
}
function handleMemeResponse() {
    var request = this;
}
