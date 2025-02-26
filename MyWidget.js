class MyWidget {
  constructor({ position = "bottom-right", containerId = "my-widget" }) {
    // Get the container element by ID
    this.container = document.getElementById(containerId);

    if (!this.container) {
      console.error(`Widget container with ID '${containerId}' not found.`);
      return;
    }

    // Positioning properties
    this.position = this.getPosition(position);
    this.open = false;

    // Initialize elements inside the target container
    this.initialise();
    this.createStyles();
  }

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return { [vertical]: "30px", [horizontal]: "30px" };
  }

  initialise() {
    // Make the container position fixed
    this.container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (this.container.style[key] = this.position[key])
    );

    // Create the button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("talk-button-container");

    // Chat icon
    this.chatIcon = document.createElement("img");
    this.chatIcon.src =
      "https://res.cloudinary.com/dg4k5afvg/image/upload/v1740582176/widget/chat_ljhqfj.svg";
    this.chatIcon.classList.add("talk-icon");

    // Close icon
    this.closeIcon = document.createElement("img");
    this.closeIcon.src =
      "https://res.cloudinary.com/dg4k5afvg/image/upload/v1740582176/widget/cross_mzn7tc.svg";
    this.closeIcon.classList.add("talk-icon", "talk-hidden");

    buttonContainer.appendChild(this.chatIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    // Message container
    this.messageContainer = document.createElement("div");
    this.messageContainer.classList.add(
      "talk-hidden",
      "talk-message-container"
    );
    this.createMessageContainerContent();

    // Append everything to the specified container
    this.container.appendChild(this.messageContainer);
    this.container.appendChild(buttonContainer);
  }

  createMessageContainerContent() {
    this.messageContainer.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = `Send us a message`;

    const form = document.createElement("form");
    form.classList.add("talk-content");

    const email = document.createElement("input");
    email.required = true;
    email.id = "email";
    email.type = "email";
    email.placeholder = "Enter your email address";

    const message = document.createElement("textarea");
    message.required = true;
    message.id = "message";
    message.placeholder = "Your message";

    const btn = document.createElement("button");
    btn.textContent = "Submit";

    form.appendChild(email);
    form.appendChild(message);
    form.appendChild(btn);
    form.addEventListener("submit", this.submit.bind(this));

    this.messageContainer.appendChild(title);
    this.messageContainer.appendChild(form);
  }

  toggleOpen() {
    this.open = !this.open;
    this.chatIcon.classList.toggle("talk-hidden", this.open);
    this.closeIcon.classList.toggle("talk-hidden", !this.open);
    this.messageContainer.classList.toggle("talk-hidden", !this.open);
  }

  submit(event) {
    event.preventDefault();
    console.log({
      email: event.target.querySelector("#email").value,
      message: event.target.querySelector("#message").value,
    });
    this.messageContainer.innerHTML =
      '<h2>Thanks for your message.</h2><p class="talk-content">Someone will be in touch with you shortly.';
  }

  createStyles() {
    const styleTag = document.createElement("style");

    styleTag.innerHTML = `
          .talk-icon {
              cursor: pointer;
              width: 70%;
              position: absolute;
              top: 9px;
              left: 9px;
              transition: transform .3s ease;
          }
          .talk-hidden {
              transform: scale(0);
          }
          .talk-button-container {
              background-color: #003f88;
              width: 60px;
              height: 60px;
              border-radius: 50%;
          }
          .talk-message-container {
              box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
              width: 400px;
              right: -25px;
              bottom: 75px;
              max-height: 400px;
              position: absolute;
              transition: max-height .2s ease;
              font-family: Helvetica, Arial ,sans-serif;
              border-radius: 10px;
          }
          .talk-message-container.talk-hidden {
              max-height: 0px;
          }
          .talk-message-container h2 {
              margin: 0;
              padding: 20px 20px;
              color: #fff;
              background-color: #003f88;
              border-radius: 10px;
              text-align: center;
          }
          .talk-message-container .talk-content {
              margin: 20px 10px ;
              border: 1px solid #dbdbdb;
              padding: 10px;
              display: flex;
              background-color: #fff;
              flex-direction: column;
          }
          .talk-message-container form * {
              margin: 5px 0;
          }
          .talk-message-container form input {
              padding: 10px;
          }
          .talk-message-container form textarea {
              height: 100px;
              padding: 10px;
          }
          .talk-message-container form textarea::placeholder {
              font-family: Helvetica, Arial ,sans-serif;
          }
          .talk-message-container form button {
              cursor: pointer;
              background-color: #003f88;
              color: #fff;
              border: 0;
              border-radius: 4px;
              padding: 10px;
          }
          .talk-message-container form button:hover {
              background-color: #00509d;
          }
      `.replace(/^\s+|\n/gm, "");

    document.head.appendChild(styleTag);
  }
}

new MyWidget({
  position: "bottom-right",
});
