const message = document.getElementById('message');

const http = XMLHttpRequest();
http.onreadystatechange = () => {
  if (http.onreadystatechange === XMLHttpRequest.DONE) {
    message.innerHTML =
      http.status === 200 ? http.responseText : `Error: ${http.status}`;
  }
};

http.open('GET', '/person', true);

http.send();
