let getIP = ()=>{
  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
  var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
  pc.createDataChannel('');//create a bogus data channel
  pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
  pc.onicecandidate = function(ice)
  {
  if (ice && ice.candidate && ice.candidate.candidate)
  {
    var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
    return myIP
    pc.onicecandidate = noop;
  }
  };
}

let Remote = function(){


  const socket = io(getIP());
  console.log(socket)

  this.left = ()=> {socket.emit("L")}
  this.right = ()=> {socket.emit("R")}
  
  this.up = ()=> {socket.emit("U")}
  this.down = ()=> {socket.emit("D")}
  this.ok = ()=>{socket.emit("OK")}
  this.home = ()=>{socket.emit("HOME")}
  this.back = ()=>{socket.emit("BACK")}

  // this.guide = ()=>{socket.emit("GUIDE")}

  let up = document.querySelector(".up");
  let down = document.querySelector(".down");
  let left = document.querySelector(".left");
  let right = document.querySelector(".right");
  let ok = document.querySelector(".ok");

  up.addEventListener("click",(e)=>{
    this.up()
    console.log("up")
  })
  down.addEventListener("click",(e)=>{
    this.down()
  })
  left.addEventListener("click",(e)=>{
    this.left()
  })
  right.addEventListener("click",(e)=>{
    this.right()
  })
  ok.addEventListener("click",(e)=>{
    this.ok()
  })
}

Remote()
