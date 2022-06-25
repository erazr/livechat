class Chatroom {
    constructor(room){
        this.room = room;
        this.chats = db.collection('chats').doc('messages');
        this.unsub;
    }
    async addChat(message){
        // chat obj
        const now = new Date();
        const chat = {
            created_at: firebase.firestore.Timestamp.fromDate(now),
            room: this.room,
            message,
            username: auth.currentUser.displayName,
        };
        // save and return chat document
        const response = await this.chats.collection('messages').add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.chats.collection('messages').where('room', '==', this.room).onSnapshot(snap => {
            snap.docChanges().forEach(change => {
                if(change.type === 'added'){
                    callback(change.doc.data());
                    console.log(change.doc.data());
                }
            });
        });      
    }
    updateRoom(room){
        this.room = room;
        if(this.unsub){
            this.unsub();
        }
    }
}