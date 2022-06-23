class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        // chat obj
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save and return chat document
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.chats.where('room', '==', this.room).orderBy('created_at').onSnapshot(snap => {
            snap.docChanges().forEach(change => {
                if(change.type === 'added'){
                    callback(change.doc.data());
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