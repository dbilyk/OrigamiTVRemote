
var express = require("express")
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server,{pingTimeout:60000});
var path = require("path")
var ip = require("ip")


//serve static remote files
app.use("/static",express.static(path.join(__dirname,"static")))



let PORT = 3001

server.listen(PORT);
// WARNING: app.listen(80) will NOT work here!

let remote_id = null 
let client_ids = []

//server gets a request for remote > sends html + js to phone, sets up socket.
//server is also listening to Origami endpoint.   

let keys = {
  left:"l",
  right:"r",
  up:"u",
  down:"d",
  ok:"ok",
  back:"back",
  home:"home"
}


let nextProtoState = {key:null}



app.get("/nextState", (req,res)=>{
  res.send(nextProtoState)
  console.log(nextProtoState)
  nextProtoState.key = null
})



console.log(ip.address("en0"))
console.log('listening on port ' + PORT)

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