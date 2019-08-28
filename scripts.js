// Loads list of conversation participants on the left sidebar

function renderConversationList(conversations) {
  return conversations
    .map(conversation => {
      let participantNames = conversation.participants.map(participant => {
        return participant.name;
      });
      return `
        <li class="contact" id="conversation-${conversation.id}">
          <a href="#${conversation.id}">
            <img src="./images/user.svg" class="user-icon" />
            <p>${participantNames.join(", ")}</p>
          </a>
        </li>`;
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

window.addEventListener("hashchange", () => {
  loadConversation(window.location.hash.substring(1));
});

function loadConversation(conversationId) {
  document.querySelector(".message-history").innerHTML = renderConversation(
    data,
    conversationId
  );

  document.querySelector(".active-convo").classList.remove(".active-convo");
}

function loadConversationList() {
  document.querySelector(".contact-list").innerHTML = renderConversationList(
    data
  );
}

loadConversationList();

loadConversation(window.location.hash.substring(1));
