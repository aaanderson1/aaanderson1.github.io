//database class - wrapper around firebase
//set information - key value 
//set reactive callback for getting the value

const ref = "rps-multiplayer-ref";
class Database{
    constructor() {
        this.database = firebase.database();
        this.keyValues = {};
        this.keyCallbacks = {};
        this.database.ref().on("value", this.onValue.bind(this));
        this.lastValues = {};
    }
    setValue(key, value){
        this.lastValues[key] = value;
        this.database.ref().set(this.lastValues);
    }
    getValue(callback){
        return this.database.ref().once("value").then((snapshot) => {
            let values = snapshot.val();
            if (!values) {
                values = {};
            }
            this.updateLastValue(snapshot.val());
            callback(this.lastValues);  
        });
    }
    onSetValue(key, callback){
        this.keyCallbacks[key] = callback;
    }
    onValue(snapshot) {
        this.updateLastValue(snapshot.val());
        for (let [key, value] of Object.entries(this.keyCallbacks)) {
            value(this.lastValues[key]);   
        }
    }

    updateLastValue(values) {
        if (!values) {
            this.lastValues = {};
            return;
        }
        this.lastValues = values;
    }
}
