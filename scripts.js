// Loads list of conversation participants on the left sidebar

function renderConversationList(conversations) {
  return conversations
    .map(conversation => {
      let participantNames = conversation.participants.map(participant => {
        return participant.name;
      });
      return `
        <li class="contact-list">
          <img src="./images/user.svg" class="user-icon" />
          <p>${participantNames.join(", ")}</p>
        </li>`;
    })
    .join("");
}

document.querySelector(".contact-list").innerHTML = renderConversationList(
  data
);

// Renders a list of messages upon selecting a conversation

function renderConversation(conversations, conversationId) {
  const messageList = conversations.find(
    conversation => conversation.id == conversationId
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

document.querySelector(".message-history").innerHTML = renderConversation(
  data,
  1
);
