const {Message}=require('node-nats-streaming')

class listener{
    constructor(client,subject,queue){
        this.client = client
        this.subject = subject
        this.queue = queue
        this.ackWait = 5 * 1000;
    }

    subscriptionOptions(){
        return this.client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this.ackWait) 
        .setDurableName('my-cart')
    }

    listen(callback){
     const subscription =  this.client.subscribe(
        this.subject,
        this.queue,
            this.subscriptionOptions()
        )
        subscription.on('message',(msg)=>{
            const parsedData = this.parsedMessage(msg);
            callback({parsedData,msg})        
        })
    }

    parsedMessage(msg){
        const data = msg.getData();
        return typeof data === 'string'
        ? JSON.parse(data)
        :JSON.parse(data.toString('utf8'))
    }
}
module.exports = listener;