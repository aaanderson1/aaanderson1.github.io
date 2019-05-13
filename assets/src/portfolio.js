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
        githubLink: "sample",
        imageLink: "assets/images/beer-api-thumbnail.jpg",
    },
    {
        projectName: "Rock Paper Scissors Multiplayer",
        liveLink: "rps-multiplayer/index.html",
        githubLink: "https://github.com/aaanderson1/rps-multiplayer",
        imageLink: "assets/images/rps-thumbnail.jpg",
    },
];
function buildProject(parent, project) {
    var containerDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = project.imageLink;
    containerDiv.appendChild(image);
    var title = document.createElement("h2");
    title.innerHTML = project.projectName;
    containerDiv.appendChild(title);
    var liveLink = document.createElement("a");
    liveLink.href = project.liveLink;
    liveLink.innerHTML = "Live";
    containerDiv.appendChild(liveLink);
    var githubLink = document.createElement("a");
    githubLink.href = project.githubLink;
    githubLink.innerHTML = "GitHub";
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