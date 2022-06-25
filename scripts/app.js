// dom queries
const chatlist = document.querySelector('.chat-list');
const chatForm = document.querySelector('.new-chat');
const chatRooms = document.querySelector('.chat-rooms');
// auth and db queries
const signUpForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const regModal = new bootstrap.Modal(document.getElementById('reg-modal'));
const loginModal = new bootstrap.Modal(document.getElementById('login-modal'));

signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = signUpForm['username'].value;
    const email = signUpForm['signup-email'].value;
    const pass = signUpForm['signup-pass'].value;
    const newAuth = new Auth(username, email, pass);
    newAuth.authenticate(regModal, signUpForm);
})

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const pass = loginForm['login-pass'].value;
    const newAuth = new Auth(username, email, pass);
    newAuth.authenticate(loginModal, loginForm);
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
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat))
    }
})

// class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general');

auth.onAuthStateChanged((user) => {
    if(user){
        document.querySelector('#accinfo').style.display = 'block';
        document.querySelector('#login').style.display = 'none';
        chatroom.getChats(data => chatUI.render(data));
    }
    else{
        document.querySelector('#accinfo').style.display = 'none';
        document.querySelector('#login').style.display = 'block';
        document.querySelector('#signup').style.display = 'block';
        chatUI.render('');
    }
})