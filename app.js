/*
   ==========================================
   FRIENDS HUB SETTINGS
   ==========================================
*/


// CHANGE THIS TO YOUR OWN FRIENDS CODE

const FRIENDS_CODE = "FRIENDS2026";



/*
   ==========================================
   LOGIN
   ==========================================
*/

function login() {

  const name =
    document.getElementById("nameInput")
      .value
      .trim();

  const code =
    document.getElementById("codeInput")
      .value;


  if (!name) {

    document.getElementById("loginError")
      .textContent =
      "Please enter your name.";

    return;
  }


  if (code !== FRIENDS_CODE) {

    document.getElementById("loginError")
      .textContent =
      "Wrong friends code.";

    return;
  }


  localStorage.setItem(
    "friendName",
    name
  );


  startWebsite();
}



/*
   ==========================================
   START WEBSITE
   ==========================================
*/

function startWebsite() {

  document
    .getElementById("loginScreen")
    .classList
    .add("hidden");


  document
    .getElementById("website")
    .classList
    .remove("hidden");


  const name =
    localStorage.getItem("friendName");


  document
    .getElementById("welcomeText")
    .textContent =
    "Signed in as " + name;


  loadMessages();
}



/*
   ==========================================
   LOG OUT
   ==========================================
*/

function logout() {

  localStorage.removeItem(
    "friendName"
  );

  location.reload();
}



/*
   ==========================================
   NAVIGATION
   ==========================================
*/

function openPage(
  page,
  button
) {

  const pages = [
    "home",
    "photos",
    "chat"
  ];


  pages.forEach(function(id) {

    document
      .getElementById(id)
      .classList
      .add("hidden");

  });


  document
    .getElementById(page)
    .classList
    .remove("hidden");


  document
    .querySelectorAll(".nav-button")
    .forEach(function(btn) {

      btn.classList.remove(
        "active"
      );

    });


  button.classList.add("active");
}



/*
   ==========================================
   PHOTOS
   ==========================================
*/

document
  .getElementById("photoInput")
  .addEventListener(
    "change",
    function(event) {

      const files =
        [...event.target.files];


      files.forEach(function(file) {

        const reader =
          new FileReader();


        reader.onload =
          function(event) {

            const image =
              document.createElement("img");


            image.src =
              event.target.result;


            image.alt =
              "Friend photo";


            document
              .getElementById("photoGallery")
              .prepend(image);

          };


        reader.readAsDataURL(file);

      });

    }
  );



/*
   ==========================================
   CHAT
   ==========================================
*/

document
  .getElementById("chatForm")
  .addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const input =
        document.getElementById(
          "messageInput"
        );


      const text =
        input.value.trim();


      const name =
        localStorage.getItem(
          "friendName"
        );


      if (!text) {
        return;
      }


      const messages =
        JSON.parse(
          localStorage.getItem(
            "friendsMessages"
          ) || "[]"
        );


      messages.push({

        name: name,

        text: text

      });


      localStorage.setItem(

        "friendsMessages",

        JSON.stringify(
          messages.slice(-100)
        )

      );


      displayMessage({

        name: name,

        text: text

      });


      input.value = "";

    }
  );



/*
   ==========================================
   DISPLAY MESSAGE
   ==========================================
*/

function displayMessage(message) {

  const box =
    document.getElementById(
      "messages"
    );


  const messageBox =
    document.createElement(
      "div"
    );


  messageBox.className =
    "message";


  const name =
    document.createElement(
      "span"
    );


  name.className =
    "message-name";


  name.textContent =
    message.name;


  const text =
    document.createElement(
      "span"
    );


  text.textContent =
    message.text;


  messageBox.appendChild(name);

  messageBox.appendChild(text);


  box.appendChild(
    messageBox
  );


  box.scrollTop =
    box.scrollHeight;
}



/*
   ==========================================
   LOAD SAVED MESSAGES
   ==========================================
*/

function loadMessages() {

  const messages =
    JSON.parse(
      localStorage.getItem(
        "friendsMessages"
      ) || "[]"
    );


  document
    .getElementById("messages")
    .innerHTML = "";


  messages.forEach(
    displayMessage
  );

}



/*
   ==========================================
   AUTO LOGIN
   ==========================================
*/

if (
  localStorage.getItem(
    "friendName"
  )
) {

  startWebsite();

}
