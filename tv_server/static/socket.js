let Remote = function(){
  const socket = io('192.168.50.250:3001');
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
