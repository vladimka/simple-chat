const socket = io();
const input = document.querySelector('.message-form>input');
const messagesUl = document.getElementsByClassName('messages')[0];
const msgForm = document.querySelector('.message-form');
const nickForm = document.querySelector('.nick-enter-form');
const nickModal = document.querySelector('.nick-enter-modal');
const nickInput = document.querySelector('.nick-input');

let nick = localStorage.getItem('simple-chat-user-nick') || undefined;

if(nick == undefined){
    nickModal.style.display = 'block';
}

socket.on('send message', data => {
    console.log(data);
    messagesUl.innerHTML += `
        <li class='message'>${data.nick}: ${data.value}</li>
    `;
});

nickForm.onsubmit = e => {
    e.preventDefault();

    nick = nickInput.value;
    nickModal.style.display = 'none';

    localStorage.setItem('simple-chat-user-nick', nick);
    console.log(nick);
}

msgForm.onsubmit = e => {
    e.preventDefault();

    let { value } = input;

    if(value == '')
        return;

    console.log(value);
    socket.emit('send message', { nick, value });
    input.value = '';
}