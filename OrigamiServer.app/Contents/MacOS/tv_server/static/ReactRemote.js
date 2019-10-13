let getIP = ()=>{
  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
  var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
  pc.createDataChannel('');//create a bogus data channel
  pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
  pc.onicecandidate = function(ice)
  {
  if (ice && ice.candidate && ice.candidate.candidate)
  {
    console.log(ice)
    var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
    return myIP
    //pc.onicecandidate = noop;
  }
  };
}

function StartSocket(){
  const socket = io(getIP());

  for(let commandKey in COMMANDS.key){
    let commandVal = COMMANDS.key[commandKey]
    let remoteButton = document.querySelector("." + commandVal)
    console.log(remoteButton)
    //if there's a node in the dom named with one of the values in the commands object, then attach socket listener.
    if(remoteButton){
      remoteButton.addEventListener("click",(e)=>{
        socket.emit(commandVal)
        console.log(commandVal)
      })      
    }

  }

}

//define your actual remote here.  
//You can add and remove command keys in commands.js.  You'll just need to reference them by their exact VALUE in Origami.
//Link your remote buttons below by adding the command value as a className to your remote button.

let ReactRemote = ()=>{
  return(<div>
    <div className = "remote--sheet">
      <div className="header">
        <p>TV remote</p>
      </div>
      <div className = "remote--dpad-container">
        <div className = {"btn " + COMMANDS.key.up}>
          <i className="material-icons">expand_less</i>
        </div>
        
        <div className = {"btn " + COMMANDS.key.left}>
          <i className="material-icons">chevron_left</i>
        </div>
        
        <div className = {"btn " + COMMANDS.key.ok}>
          OK
        </div>
        
        <div className = {"btn " + COMMANDS.key.right}>
          <i className="material-icons">chevron_right</i>
        </div>
        
        <div className = {"btn " + COMMANDS.key.down}>
          <i className="material-icons">expand_more</i>
        </div>
        
        
      </div>
    </div>
  </div>)
}


ReactDOM.render(<ReactRemote />,document.querySelector("#root"))
StartSocket()