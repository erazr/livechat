// dom queries
const chatlist = document.querySelector('.chat-list');
const chatForm = document.querySelector('.new-chat');
const chatRooms = document.querySelector('.chat-rooms');
// auth and db queries
const signUpForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const regModal = new bootstrap.Modal(document.getElementById('reg-modal'));
const loginModal = new bootstrap.Modal(document.getElementById('login-modal'));

const newAuth = new Auth();

signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    newAuth.form = signUpForm;
    newAuth.modal = regModal;
    newAuth.authenticate();
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    newAuth.form = loginForm;
    newAuth.modal = loginModal;
    newAuth.authenticate();
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', () => {
    auth.signOut();    
})

// add a new chat
chatForm.addEventListener('submit', e => {
    e.preventDefault();
    // getting message
    const message = chatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => chatForm.reset())
        .catch(err => console.log(err));
});

chatRooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        e.target.classList.add('btn-primary');
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

// class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general');
chatroom.getChats(data => chatUI.render(data));

auth.onAuthStateChanged(user => {
    newAuth.changeUI(user);
});