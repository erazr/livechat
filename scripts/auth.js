class Auth{
    constructor(modal, form){
        this.modal = modal;
        this.form = form;
    }

    changeUI(user){
        if(user){
            document.querySelector('#accinfo').style.display = 'block';
            document.querySelector('#login').style.display = 'none';
            document.querySelector('#logout').style.display = 'block';
            document.querySelector('#signup').style.display = 'none';
            document.querySelector('.acc-info')
            .innerHTML = `
                <div class="container text-center d-flex flex-column">
                    <span>You're logged as ${user.displayName}</span>
                    <span>Your email ${user.email}</span>
                </div>
            `;
            chatroom.getChats(data => chatUI.render(data));
        }
        else{
            document.querySelector('#accinfo').style.display = 'none';
            document.querySelector('#login').style.display = 'block';
            document.querySelector('#logout').style.display = 'none';
            document.querySelector('#signup').style.display = 'block';
            document.querySelector('.alert').style.display = 'block'
            document.querySelector('.alert').innerText = 'Sign-up or Log-in to continue';
            chatUI.render('');
        }
    }

    authenticate(){
        if(this.form === document.querySelector('#login-form')){
            auth.signInWithEmailAndPassword(this.form['loginUserEmail'].value, this.form['loginUserPass'].value).then(() => {
                this.modal.hide();
                this.form.reset();
            });
        }
        else if(this.form === document.querySelector('#signup-form')){
            auth.createUserWithEmailAndPassword(this.form['userEmail'].value, this.form['userPass'].value).then((creds) => {
                return creds.user.updateProfile({
                        displayName: this.form['userName'].value
                    });
                }).then(() => {
                    this.modal.hide();
                    this.form.reset();
                    this.changeUI(auth.currentUser);
            });  
        }
    }
}