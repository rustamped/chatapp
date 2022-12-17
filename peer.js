/*P2P Connection Script*/

//Initialize Placeholder User ID
var user = new Peer(`ID${Math.floor(1000*Math.random())}`); id_input.value = user.id
var connection
//Peer (user) event listeners
user.on('open', function(id){ //when peer is initialized
    console.log('Welcome ' + id);
});  

//Peer (user) Connection event listeners
user.on('connection', function(conn) { 
    console.log('peer connected');
    //Verifies Connection Is Open
    conn.on('open', function() {
        //connection = user.connect(conn.peer)
        alert(`${conn.peer} connected with you!`)
    });
    //Listens for Data Transmitted via Connection
    conn.on('data', function(data) {
        inbox.innerHTML+=`<p>${data}</p>`
    });
});

function updateUserName(name) {
    user = new Peer(name)
    console.log(name)
    alert("Signed in as: "+ name)
}

function openConnection(name) {

    conn = user.connect(name)
    
    conn.on('data', function(data) {
        console.log('received', data);
    })

    conn.on('open', function() {alert(`Connected to ${conn.peer}!`)})

    //conn.on('connection', function() {alert(`Connected to ${name}!`)})
    //user.on('connection', function(conn) {alert(`${conn.peer} Connected with You`)})

    conn.on('open', function() {
        conn.on('data', function(data) {
            console.log("data received")
            inbox.innerHTML = data})
    })

    conn.on('error', function(err){
        console.log('error');
    });

}

function sendMessage(sender,msg) {
    let message = sender+": "+msg
    conn.send(message) //send to friend's screen
    inbox.innerHTML+=`<p style="color:red">${message}</p>`
    chatbox.value = ""
}