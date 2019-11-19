window.onload = function() {
    let memeBtn = document.getElementById('get-meme');
    memeBtn.onclick = fetchMeme;
}

function fetchMeme() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = handleMemeResponse;


    // Set URL to send request to:
    request.open('GET', 'https://api.icndb.com/jokes/random');
    // Initiate request
    request.send();
}

function handleMemeResponse() {
    let request = <XMLHttpRequest>this;

    //readyState 4 means reuest is finished
    //status 200 means "OK" - success
}