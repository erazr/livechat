class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){
        if(data){
            const when = dateFns.distanceInWordsToNow(
                data.created_at.toDate(),
                { addSuffix: true }
            )
            const html = `
                <li class="list-group-item">
                    <span class="username">${data.username}</span>
                    <span class="message">${data.message}</span>
                    <div class="time text-muted">${when}</div>
                </li>
            `;
            this.list.innerHTML += html;
            document.querySelector('.alert').innerText = '';
        }
        else{
            this.list.innerHTML = '';
            document.querySelector('.alert').innerText = 'Sign-up or Log-in to continue';
        }
    }
}