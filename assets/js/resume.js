

  const fillResume = () => {
    if (this.resumeAcquired) {
      return;
    }
    this.resumeAcquired = true;
    const url = "https://docs.google.com/document/d/e/2PACX-1vT9lHOZYgwi4J--QKuYdVwSpDNWwd_iq8shE2FBoblcwwyWBGxMmge-_xFyBY33No20-NpqFVnBie30/pub?embedded=true";
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == "200") {
            let googleDocElm = document.getElementById("google-doc");
            googleDocElm.innerHTML = request.responseText;
        }
    };
    request.send(null);
  }