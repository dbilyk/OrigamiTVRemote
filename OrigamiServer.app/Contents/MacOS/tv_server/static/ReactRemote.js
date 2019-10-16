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



let PowerSVG = (props)=>{
  return (<svg className = {"icon icon--power " + props.class} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 3c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1zm5.14 2.86c-.39.39-.38 1-.01 1.39 1.13 1.2 1.83 2.8 1.87 4.57.09 3.83-3.08 7.13-6.91 7.17C8.18 19.05 5 15.9 5 12c0-1.84.71-3.51 1.87-4.76.37-.39.37-1-.01-1.38-.4-.4-1.05-.39-1.43.02C3.98 7.42 3.07 9.47 3 11.74c-.14 4.88 3.83 9.1 8.71 9.25 5.1.16 9.29-3.93 9.29-9 0-2.37-.92-4.51-2.42-6.11-.38-.41-1.04-.42-1.44-.02z"/></svg>)
}

let BackSVG = (props)=>{
  return (<svg className = {"icon icon--back " + props.class} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 8v3H5.83l2.88-2.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L2.71 11.3c-.39.39-.39 1.02 0 1.41L7.3 17.3c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.83 13H20c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>)
}
let HomeSVG = (props)=>{
  return (<svg className = {"icon icon--home " + props.class} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/></svg>)
}
let KeyboardSVG = (props)=>{
  return (<svg className = {"icon icon--keyboard " + props.class} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm8 7H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm1-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/></svg>)
}
let CCSVG = (props)=>{
  return (<svg className = {"icon icon--CC " + props.class} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 6.5c0 .28-.22.5-.5.5H10c-.28 0-.5-.22-.5-.5h-2v3h2c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5v.5c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v.5zm7 0c0 .28-.22.5-.5.5H17c-.28 0-.5-.22-.5-.5h-2v3h2c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5v.5c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v.5z"/></svg>)
}
let VolDnSVG = (props)=>{
  return (<svg className = {"icon icon--VolDn " + props.class} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>)
}
let VolUpSVG = (props)=>{
  return (<svg className = {"icon icon--VolUp " + props.class} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>)
}
let MuteSVG = (props)=>{
  return (<svg className = {"icon icon--mute " + props.class} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.63 3.63c-.39.39-.39 1.02 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/></svg>)
}


let ReactRemote = ()=>{
  return(<div>
    <div className = "remote--sheet">
      <div className="header">
        <div className = {"btn power " + COMMANDS.key.powerOn}>          
        </div>
        <p>TV remote</p>
      </div>
      <div className = "remote--dpad-container">
        <div className = {"btn--nav " + COMMANDS.key.up}>
          <i className="material-icons">expand_less</i>
        </div>
        
        <div className = {"btn--nav " + COMMANDS.key.left}>
          <i className="material-icons">chevron_left</i>
        </div>
        
        <div className = {"btn--nav " + COMMANDS.key.ok}>
          OK
        </div>
        
        <div className = {"btn--nav " + COMMANDS.key.right}>
          <i className="material-icons">chevron_right</i>
        </div>
        
        <div className = {"btn--nav " + COMMANDS.key.down}>
          <i className="material-icons">expand_more</i>
        </div>
        
        
      </div>
    </div>
  </div>)
}


ReactDOM.render(<ReactRemote />,document.querySelector("#root"))
StartSocket()