// Loads list of conversation participants on the left sidebar

function renderConversationList(conversations) {
  return conversations
    .map(conversation => {
      let participantNames = conversation.participants.map(participant => {
        return participant.name;
      });
      return `
      <a href="#${conversation.id}">    
        <li class="contact" id="conversation-${conversation.id}">
            <img src="./images/user.svg" class="user-icon" />
            <p>${participantNames.join(", ")}</p>
        </li>
      </a>`;
    })
    .join("");
}

// Renders a list of messages upon selecting a conversation

function renderConversation(conversations, conversationId) {
  const messageList = conversations.find(
    conversation => conversation.id.toString() == conversationId
  ).messages;

  return messageList
    .map(message => {
      if (message.sender.id === 1) {
        return `
        <li class="message -from-me">
          <p>${message.sender.name}: ${message.content}</p>
        </li>`;
      } else {
        return `
        <li class="message -from-user">
          <p>${message.sender.name}: ${message.content}</p>
        </li>`;
      }
    })
    .join("");
}

// Listens for user click on conversation
window.addEventListener("hashchange", () => {
  loadConversation(window.location.hash.substring(1));
});

function loadConversation(conversationId) {
  let isActive = document.querySelector(".active-convo");
  if (isActive !== null) {
    isActive.classList.remove("active-convo");
  }
  document
    .querySelector(`#conversation-${conversationId}`)
    .classList.add("active-convo");
  document.querySelector(".message-history").innerHTML = renderConversation(
    data,
    conversationId
  );
}

// Inserts list of conversations into left sidebar
function loadConversationList() {
  document.querySelector(".contact-list").innerHTML = renderConversationList(
    data
  );
}

// Adds a message to message history on user submit
const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", () => {
  event.preventDefault();
  let userText = document.querySelector(".message-field");
  let currentConversation = window.location.hash.substring(1);
  let messageData = {
    sentAt: "",
    sender: {
      id: 1,
      name: "Molly Elfers",
      picture: "images/user.svg"
    },
    content: userText.value
  };

  addMessageToData(data, currentConversation, messageData);
  userText.value = "";
});

function addMessageToData(conversations, conversationId, message) {
  let currentConversation = conversations.find(
    conversation => conversation.id.toString() == conversationId
  );

  currentConversation.messages.push(message);
  loadConversation(window.location.hash.substring(1));
}

loadConversationList();

loadConversation(window.location.hash.substring(1));
