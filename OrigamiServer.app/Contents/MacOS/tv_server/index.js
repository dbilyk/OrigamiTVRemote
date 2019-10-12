
var express = require("express")
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server,{pingTimeout:60000});
var path = require("path")
var ip = require("ip")
const imessage = require('osa-imessage')

//get phone or email input from the command line for imessage.
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


//serve static remote files
app.use("/static",express.static(path.join(__dirname,"static")))



let PORT = 3001

server.listen(PORT).on("error",()=>{return})
  
console.log(ip.address("en0"))
console.log(`\n\n\x1b[1mTo start controlling your origami prototype from your iPhone (Mac):\x1b[22m
1) Go to Wifi > Create network... > create it (any name will do) and connect to it on your mac.\n
  Once you're connected...\n
2) On your iPhone, go to \x1b[1mSettings > Wi-Fi\x1b[22m, find and connect to the network you just made.\n
  Then...\n
3) Restart this program and enter your iMessage email below OR...\n
   Go to the link below:\n \x1b[1mhttp://${ip.address("en0")}:${PORT}/static/remote.html\x1b[22m on your phone.`)

askForImessage()

//remote keys
let keys = {
  left:"l",
  right:"r",
  up:"u",
  down:"d",
  ok:"ok",
  back:"back",
  home:"home"
}

//state passing var
let nextProtoState = {key:null}



app.get("/nextState", (req,res)=>{
  res.send(nextProtoState)
  nextProtoState.key = null
})






function askForImessage(){
  readline.question(`Email:`, (name) => {
    //email regex
    if(name.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      imessage.send(name,`Open Origami Remote on your iPhone at: http://${ip.address("en0")}:${PORT}/static/remote.html.`)
      readline.close()
  
    }
    else{
      console.log("that wasn't a valid email... try again.")
      readline.close()
      askForImessage()
    }
  })
}





io.on('connection', function (socket) {
  socket.on('L', function () {
    nextProtoState.key = keys.left
    console.log("L");
    
  })
  
  socket.on('R', function () {
    nextProtoState.key = keys.right
    console.log("R");

  });

  socket.on('U', function () {
    nextProtoState.key = keys.up
    console.log("U");

  });

  socket.on('D', function () {
    nextProtoState.key = keys.down
    console.log("D");

  });

  socket.on('OK', function () {
    nextProtoState.key = keys.ok
    console.log("OK");

  });

  socket.on('BACK', function () {
    console.log("BACK");

  });

  socket.on('HOME', function () {
    console.log("HOME");

  });
});