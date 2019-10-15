
var express = require("express")
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server,{pingTimeout:60000});
var path = require("path")
var ip = require("ip")
const imessage = require('osa-imessage')
var commands = require('./static/commands.js');


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
console.log(`\n\n\x1b[1mTo start controlling your Origami prototype from your iPhone (Mac):\x1b[22m\n
Option 1 - Create a direct connection to phone:\n
1) Go to Wifi > Create network... > create it (any name will do) and connect to it on your mac.\n
  Once you're connected...\n
2) On your iPhone, go to \x1b[1mSettings > Wi-Fi\x1b[22m, find and connect to the network you just made.\n
  Then...\n
3) Restart this program go to the link below:\n 
   \x1b[1mhttp://${ip.address("en0")}:${PORT}/static/remote.html\x1b[22m on your phone.\n
   \n
  \x1b[1mOR...\x1b[22m
Option 2 - use current Wi-Fi connection:\n
   1) Make sure you're connected to a Wi-Fi network.\n
   2) enter your email below to get an iMessage link to the TV remote:\n
   `)

askForImessage()



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
      imessage.send(name,`Open Origami Remote on your iPhone at: http://${ip.address("en0")}:${PORT}/static/remote.html`).catch(err=>{console.log("Failed to send iMessage. Sometimes restarting the server solves the problem.")})
      console.log("Link Sent!")
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

  //start listening for commands
  for(let command in commands.key){
    let commandVal = commands.key[command]
    socket.on(commandVal, ()=>{
      nextProtoState.key = commandVal
      console.log(commandVal)
    })
  }
  
});