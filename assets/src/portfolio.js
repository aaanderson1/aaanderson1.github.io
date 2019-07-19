var projects = [
    {
        projectName: "Word Guess Game (Hangman with Birds)",
        liveLink: "word-guess-game/index.html",
        githubLink: "https://github.com/aaanderson1/Word-Guess-Game",
        imageLink: "assets/images/hangman-thumbnail.jpg",
    },
    {
        projectName: "Crystal Collector Game",
        liveLink: "unit-4-game/index.html",
        githubLink: "https://github.com/aaanderson1/unit-4-game",
        imageLink: "assets/images/crystalsthumbnail.jpg",
    },
    {
        projectName: "Trivia Game (Golden Girls)",
        liveLink: "triviagame/index.html",
        githubLink: "https://github.com/aaanderson1/triviagame",
        imageLink: "assets/images/triviagamethumbnail.jpg",
    },
    {
        projectName: "Dude, Where's My Beer?",
        liveLink: "team7/index.html",
        githubLink: "https://github.com/aaanderson1/aaanderson1.github.io/tree/master/team7",
        imageLink: "assets/images/beer-api-thumbnail.jpg",
    },
    {
        projectName: "Rock Paper Scissors Multiplayer",
        liveLink: "rps-multiplayer/index.html",
        githubLink: "https://github.com/aaanderson1/rps-multiplayer",
        imageLink: "assets/images/rps-thumbnail.jpg",
    },
    {
        projectName: "GifTastic - Express Yourself - Directory",
        liveLink: "https://aaanderson1.github.io/giftastic/",
        githubLink: "https://github.com/aaanderson1/giphytastic",
        imageLink: "assets/images/gifdirectorythumbnail.jpg",
    },
    {
        projectName: "Bamazon - Online Inventory and Info",
        // liveLink: "",
        githubLink: "https://github.com/aaanderson1/bamazon",
        imageLink: "assets/images/bamazon.png",
    },
    {
        projectName: "Friend Finder - Filter",
        liveLink: "https://secret-bastion-11871.herokuapp.com/",
        githubLink: "https://github.com/aaanderson1/friend-finder",
        imageLink: "assets/images/friendfinder.png",
    },
    {
        projectName: "Burger Creator - Place your order!",
        liveLink: "https://afternoon-earth-59108.herokuapp.com/",
        githubLink: "https://github.com/aaanderson1/burger",
        imageLink: "assets/images/burger.png",
    },
    {
        projectName: "Liri Node App (Siri API for musician info, concerts, movies, and more.)",
        // liveLink: "",
        githubLink: "https://github.com/aaanderson1/liri-node-app",
        imageLink: "assets/images/liri.png",
    },
    {
        projectName: "Page Turner",
        liveLink: "https://pageturner.herokuapp.com/",
        githubLink: "https://github.com/aaanderson1/project2",
        imageLink: "assets/images/pageturnerscreenshot.png",
    },

];
function buildProject(parent, project) {
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("project-container");
    var image = document.createElement("img");
    image.src = project.imageLink;
    image.classList.add("project-image");
    containerDiv.appendChild(image);
    var title = document.createElement("h2");
    title.classList.add("project-title");
    title.innerHTML = project.projectName;
    containerDiv.appendChild(title);
    var liveLink = document.createElement("a");
    liveLink.href = project.liveLink;
    liveLink.innerHTML = "Live";
    liveLink.classList.add("project-live");
    containerDiv.appendChild(liveLink);
    var githubLink = document.createElement("a");
    githubLink.href = project.githubLink;
    githubLink.innerHTML = "GitHub";
    githubLink.classList.add("project-github");
    containerDiv.appendChild(githubLink);
    parent.appendChild(containerDiv);

}
function initialize() {
    var parent = document.getElementById("projects");
    for (var i = 0; i < projects.length; ++i) {
        buildProject(parent, projects[i]);
    }
}
initialize();