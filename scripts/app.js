// dom queries
const chatlist = document.querySelector('.chat-list');
const chatForm = document.querySelector('.new-chat');
const chatRooms = document.querySelector('.chat-rooms');

// add a new chat
chatForm.addEventListener('submit', e => {
    e.preventDefault();
    // getting message fr
    const message = chatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => chatForm.reset())
        .catch(err => console.log(err));
});

chatRooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

// class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general', 'anon');

// render chats
chatroom.getChats(data => chatUI.render(data));