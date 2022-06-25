class Auth{
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }

    authenticate(modal, form){
        if(form === document.querySelector('#login-form')){
            auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
                modal.hide();
                form.reset();
            });
        }
        else if(form === document.querySelector('#signup-form')){
            auth.createUserWithEmailAndPassword(this.email, this.password).then((creds) => {
                return creds.user.updateProfile({
                        displayName: this.username
                    });
                }).then(() => {
                    modal.hide();
                    form.reset();
                    document.querySelector('#signup').style.display = 'none';
            });  
        }
    }
}