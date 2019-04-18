let tags = ["annoyed", "arguing", "blocked", "bored", "bitter", "bye", "celebrate", "cleaning", "confrontation", "cops", "dancing", "driving", "eating", "exercising", "fabulous", "fight", "fire", "flying", "funny pets", "gaming", "girl bye", "glad", "hacking", "hello", "hug", "jealous", "jumping", "laughing", "listening to music", "love", "mad", "maybe", "no", "outraged", "outstanding", "pointing", "shopping", "reading", "running", "sad", "saying goodbye", "scared", "slap", "sleeping", "tired", "traveling", "trouble", "walking dog", "watching movie", "waving", "working", "yes"];
function initialize() {
    let root = document.getElementById("root");
    root.innerHTML = '';
    let buttonRoot = document.createElement("div");
    root.appendChild(buttonRoot);
    for(let tag of tags) {
        let button = document.createElement("button");
        button.innerText = tag;
        buttonRoot.appendChild(button);
        const innerTag = tag;
        button.addEventListener("click", function(){
            queryGiphy(innerTag, loadImages);
        });
    }
    let inputDiv = document.createElement("div");
    let inputField = document.createElement("input");
    inputField.type = "text";
    let buttonElement = document.createElement("button");
    buttonElement.innerHTML = "add";
    buttonElement.addEventListener("click", function() {
        if(inputField.value.length === 0) {
            return;
        }
        let button = document.createElement("button");
        button.innerText = inputField.value.toLocaleLowerCase();
        buttonRoot.appendChild(button);
        const innerTag = inputField.value.toLocaleLowerCase();
        button.addEventListener("click", function(){
            queryGiphy(innerTag, loadImages);
        }); 
        inputField.value = "";
    });
    inputDiv.appendChild(inputField);
    inputDiv.appendChild(buttonElement);
    root.appendChild(inputDiv);
}
initialize();
function queryGiphy(keyword,fulfillGiphy){
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    keyword + "&api_key=dc6zaTOxFJmzC&limit=10&rating=PG-13";
    let htmlRequest = new XMLHttpRequest();
    htmlRequest.onload = function() { 
        if(htmlRequest.response) {
            let object = JSON.parse(htmlRequest.response);
            fulfillGiphy(object.data);
        } else {
            console.log("error");
        }
    };
    htmlRequest.open("GET", queryURL, true);
    htmlRequest.send();
}
queryGiphy("redneck", function(results){
   console.log(results); 
});
function loadImages(imageDatas) {
    let root = document.getElementById("root");
    let imageRoot = document.getElementById("image-root");
    if(!imageRoot) {
        imageRoot = document.createElement("div");
        imageRoot.id = "image-root";
        root.appendChild(imageRoot);
    }
    imageRoot.innerHTML = '';
    for(let imageData of imageDatas) {
        let div = document.createElement("div");
        let paragraph = document.createElement("p");
        paragraph.innerHTML = `rating ${imageData.rating}`;
        div.appendChild(paragraph);
        let image = document.createElement("img");
        div.appendChild(image);
        imageRoot.appendChild(div);
        // image.src = imageData.images.fixed_height.url;
        image.src = imageData.images.fixed_height_still.url;
        let toggle = false;
        image.addEventListener("click", function() {
            toggle = !toggle;
            if(toggle) {
                image.src = imageData.images.fixed_height.url;
            } else {
                image.src = imageData.images.fixed_height_still.url;
            }
        })
    }
}