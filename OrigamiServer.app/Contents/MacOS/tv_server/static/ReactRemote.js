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
    //pc.onicecandidate = noop;
  }
  };
}

function StartSocket(){
  const socket = io(getIP());

  // for(let commandKey in COMMANDS.key){
  //   let commandVal = COMMANDS.key[commandKey]
  //   let remoteButton = document.querySelector("." + commandVal)
  //   console.log(remoteButton)
  //   //if there's a node in the dom named with one of the values in the commands object, then attach socket listener.
  //   if(remoteButton){
  //     remoteButton.addEventListener("click",(e)=>{
  //       socket.emit(commandVal)
  //       console.log(commandVal)
  //     })      
  //   }

  // }
  return socket

}

//define your actual remote here.  
//You can add and remove command keys in commands.js.  You'll just need to reference them by their exact VALUE in Origami.
//Link your remote buttons below by adding the command value as a className to your remote button.


//svg remote
const SVGRemote = props => {
  let state = props.state,
  btnPressSpeed = 150,
  disabledStyles = " btn__disabled",
  pressedStyles = " btn__pressed"



  let disabled = state.active.power?"":disabledStyles
  

  let c = {
    vol:{
      up: "volUp" + (state.pressed.volUp?pressedStyles:""),
      dn: "volDn" + (state.pressed.volDn?pressedStyles:""),
    },
    cc   : "btn" + (state.active.cc?pressedStyles   : "") + disabled,
    mute : "btn" + (state.active.mute?pressedStyles : "") + disabled,
    power: "btn" + (state.active.power?pressedStyles: ""),

    back: "btn" + (state.pressed.back?pressedStyles: "") + disabled,
    home: "btn" + (state.pressed.home?pressedStyles: "") + disabled,
    keyboard: "btn" + (state.pressed.keyboard?pressedStyles: "") + disabled,

    up   : "navIcon" + (state.pressed.up?pressedStyles: "") + disabled,
    down : "navIcon" + (state.pressed.down?pressedStyles: "") + disabled,
    left : "navIcon" + (state.pressed.left?pressedStyles: "") + disabled,
    right: "navIcon" + (state.pressed.right?pressedStyles: "") + disabled,
    ok   : "navIcon" + (state.pressed.ok?pressedStyles: "") + disabled,
  }




  
  return (
  <svg width={375*3} height={653*3} viewBox="0 0 375 653">
    <defs>
      <rect id="prefix__a" x={0.5} y={0.846} width={191} height={54} rx={27} />
      <rect id="prefix__c" x={0.5} y={0.846} width={339} height={378} rx={44} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d    = "M12 0h351c6.627 0 12 5.373 12 12v644H0V12C0 5.373 5.373 0 12 0z"
        fill = "#1C1D1E"
      />
      
      <g className = {'vol' + disabled} transform="translate(91.5 558.154)">
        <mask id="prefix__b" fill="#fff">
          <use xlinkHref="#prefix__a" />
        </mask>
        <use fill="#2C2D2E" xlinkHref="#prefix__a" />
        <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.volDn, state.socket)}} className = {c.vol.dn} mask="url(#prefix__b)" fill="#2a2a2a">
          <path  
            //VolDown BG
            d           = "M27.5.846H96v54H27.5c-14.912 0-27-12.089-27-27 0-14.912 12.088-27 27-27z"
            fillOpacity = {1}
          />
          <path
            //VolDnIcon
            d           = "M58.845 29.237h-16.69c-.765 0-1.391-.626-1.391-1.391s.626-1.391 1.39-1.391h16.691c.765 0 1.391.626 1.391 1.39 0 .766-.626 1.392-1.39 1.392z"
            fillOpacity = {0.5}
            fillRule    = "nonzero"
            />
        </g>
        <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.volUp, state.socket)}} className= {c.vol.up} mask="url(#prefix__b)" fill="#2a2a2a">
          <path
            //volUpBG
            d           = "M164.868.846h-68.5v54h68.5c14.912 0 27-12.089 27-27 0-14.912-12.088-27-27-27z"
            fillOpacity = {1}
          />
          <path
            //volUpIcon
            d           = "M150.143 29.203h-6.786v6.786c0 .746-.61 1.357-1.357 1.357-.746 0-1.357-.611-1.357-1.357v-6.786h-6.786c-.746 0-1.357-.61-1.357-1.357s.61-1.357 1.357-1.357h6.786v-6.786c0-.747.61-1.357 1.357-1.357.746 0 1.357.61 1.357 1.357v6.786h6.786c.746 0 1.357.61 1.357 1.357 0 .746-.61 1.357-1.357 1.357z"
            fillOpacity = {0.5}
            fillRule    = "nonzero"
          />
        </g>
        <path
          d             = "M96.368.846v54"
          strokeOpacity = {0.217}
          stroke        = "#1C1D1E"
          mask          = "url(#prefix__b)"
        />
      </g>
      <g onPointerDown = {()=>{state.callbacks.toggle(COMMANDS.key.mute, state.socket)}} className = {c.mute } transform="translate(17.104 557.15)">
        <circle 
          //MUTE BG
          fill    = "#2C2D2E" cx = {28.896} cy = {28.851} r = {28} />
        <path
          //MUTE icon
          d           = "M19.228 19.184a1.15 1.15 0 000 1.628l4.227 4.228-.335.346h-3.465c-.635 0-1.155.52-1.155 1.155v4.62c0 .636.52 1.156 1.155 1.156h3.465l3.8 3.8c.728.728 1.976.208 1.976-.82V30.48l4.828 4.828a7.885 7.885 0 01-1.848 1.051c-.416.174-.67.613-.67 1.063 0 .832.843 1.363 1.605 1.051.924-.381 1.79-.89 2.565-1.513l1.547 1.548c.45.45 1.179.45 1.629 0a1.15 1.15 0 000-1.629L20.868 19.184a1.164 1.164 0 00-1.64 0zM36.98 28.85c0 .948-.173 1.86-.473 2.703l1.767 1.768a10.321 10.321 0 001.016-4.47 10.39 10.39 0 00-6.676-9.703c-.682-.266-1.41.266-1.41.993v.22c0 .439.29.82.705.982 2.969 1.2 5.071 4.112 5.071 7.507zm-10.06-7.265l-.197.196 2.172 2.172v-1.56c0-1.027-1.248-1.536-1.976-.808zm7.172 7.265c0-2.044-1.178-3.8-2.887-4.654v2.067l2.864 2.865c.012-.093.023-.185.023-.278z"
          fillOpacity = {0.5}
          fill        = "#FFF"
          fillRule    = "nonzero"
        />
      </g>
      <g onPointerDown = {()=>{state.callbacks.toggle(COMMANDS.key.cc, state.socket)}} className = {c.cc } transform="translate(300.5 557.154)">
        <circle 
          //CC BG
          fill    = "#2C2D2E"
          cx      = {28.5}
          cy      = {28.846}
          r       = {28}
        />
        <path
          // CC Icon
          d           = "M37.25 18.846h-17.5a2.5 2.5 0 00-2.5 2.5v15a2.5 2.5 0 002.5 2.5h17.5c1.375 0 2.5-1.125 2.5-2.5v-15c0-1.375-1.125-2.5-2.5-2.5zm-10 8.125c0 .35-.275.625-.625.625H26a.619.619 0 01-.625-.625h-2.5v3.75h2.5c0-.35.275-.625.625-.625h.625c.35 0 .625.275.625.625v.625c0 .687-.563 1.25-1.25 1.25h-3.75c-.688 0-1.25-.563-1.25-1.25v-5c0-.688.563-1.25 1.25-1.25H26c.688 0 1.25.562 1.25 1.25v.625zm8.75 0c0 .35-.275.625-.625.625h-.625a.619.619 0 01-.625-.625h-2.5v3.75h2.5c0-.35.275-.625.625-.625h.625c.35 0 .625.275.625.625v.625c0 .687-.563 1.25-1.25 1.25H31c-.688 0-1.25-.563-1.25-1.25v-5c0-.688.563-1.25 1.25-1.25h3.75c.688 0 1.25.562 1.25 1.25v.625z"
          fillOpacity = {0.5}
          fill        = "#FFF"
          fillRule    = "nonzero"
        />
      </g>
      <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.back, state.socket)}} className = {c.back } transform="translate(17.918 477.572)">
        <circle 
          //BACK BG
          fill    = "#2C2D2E"
          cx      = {28.082}
          cy      = {28.428}
          r       = {28}
        />
        <path
          //BACK Icon
          d        = "M24.784 21.071v-3.006a.5.5 0 00-.822-.382L19.089 21.8a.5.5 0 000 .764l4.873 4.118a.5.5 0 00.822-.382v-3.018l6.48-.023h.026c3.375 0 6.11 2.728 6.11 6.093 0 3.383-2.75 6.125-6.141 6.125H18.547v2.212H31.26c4.616 0 8.359-3.732 8.359-8.337 0-4.587-3.728-8.305-8.328-8.305h-.036l-6.47.023z"
          fill     = "#979797"
          fillRule = "nonzero"
        />
      </g>
      <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.home, state.socket)}} className = {c.home } transform="translate(159.5 478)">
        <circle     
          //HOME BG    
          fill    = "#2C2D2E"
          cx      = {28}
          cy      = {28}
          r       = {28}
        />
        <path
          //HOME Icon
          d           = "M25.357 37.352v-6.605h5.284v6.605c0 .726.595 1.32 1.321 1.32h3.963c.726 0 1.32-.594 1.32-1.32v-9.247h2.246c.608 0 .899-.753.436-1.15L28.884 17.01a1.331 1.331 0 00-1.77 0l-11.043 9.947c-.449.396-.171 1.15.436 1.15h2.246v9.246c0 .726.594 1.32 1.32 1.32h3.964c.726 0 1.32-.594 1.32-1.32z"
          fillOpacity = {0.5}
          fill        = "#FFF"
          fillRule    = "nonzero"
        />
      </g>
      <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.keyboard, state.socket)}} className = {c.keyboard } transform="translate(301 478)">
        <circle
          //KEYBOARD BG
          fill    = "#2C2D2E"
          cx      = {28}
          cy      = {28}
          r       = {28}
        />
        <path
          //KEYBOARD Icon
          d           = "M39.429 18H16.57a2.853 2.853 0 00-2.842 2.857l-.015 14.286A2.866 2.866 0 0016.571 38H39.43a2.866 2.866 0 002.857-2.857V20.857A2.866 2.866 0 0039.429 18zM26.57 22.286h2.858v2.857H26.57v-2.857zm0 4.285h2.858v2.858H26.57V26.57zm-4.285-4.285h2.857v2.857h-2.857v-2.857zm0 4.285h2.857v2.858h-2.857V26.57zm-1.429 2.858H18V26.57h2.857v2.858zm0-4.286H18v-2.857h2.857v2.857zm11.429 10h-8.572a1.433 1.433 0 01-1.428-1.429c0-.785.643-1.428 1.428-1.428h8.572c.785 0 1.428.643 1.428 1.428 0 .786-.643 1.429-1.428 1.429zm1.428-5.714h-2.857V26.57h2.857v2.858zm0-4.286h-2.857v-2.857h2.857v2.857zM38 29.429h-2.857V26.57H38v2.858zm0-4.286h-2.857v-2.857H38v2.857z"
          fillOpacity = {0.5}
          fill        = "#FFF"
          fillRule    = "nonzero"
        />
      </g>
      <g onPointerDown = {()=>{state.callbacks.toggle(COMMANDS.key.power, state.socket)}} className = {c.power } transform="translate(17.496 20.154)">
        <circle 
          //POWER BG
          fill    = "#343437"
          cx      = {18.504}
          cy      = {18.846}
          r       = {18}
        />
        <path
          //POWER icon
          d           = "M18.504 9c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1s1-.45 1-1v-8c0-.55-.45-1-1-1zm5.13 4.25c1.13 1.2 1.83 2.8 1.87 4.57.09 3.83-3.08 7.13-6.91 7.17a6.981 6.981 0 01-7.09-6.99c0-1.84.71-3.51 1.87-4.76.37-.39.37-1-.01-1.38a.993.993 0 00-1.43.02 8.92 8.92 0 00-2.43 5.86c-.14 4.88 3.83 9.1 8.71 9.25 5.1.16 9.29-3.93 9.29-9 0-2.37-.92-4.51-2.42-6.11-.38-.41-1.04-.42-1.44-.02a.99.99 0 00-.01 1.39z"
          fillOpacity = {0.5}
          fill        = "#FFF"
          fillRule    = "nonzero"
        />
      </g>
      <g transform="translate(17.5 74.154)">
        <mask id="prefix__d" fill="#fff">
          <use xlinkHref="#prefix__c" />
        </mask>
        <use className = {disabled} fill="#2C2D2E" xlinkHref="#prefix__c" />
        <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.left, state.socket)}} className = {c.left} mask="url(#prefix__d)">
          <path
            //LEFT BG
            d       = "M.5 8.12v363.188l111.131-111.131c39.052-39.053 39.052-102.37 0-141.422a99.474 99.474 0 00-.158-.158L.5 8.12z"
            fill    = "#2a2a2a"
            mask    = "url(#prefix__d)"
          />
          <path 
            //LEFT Icon
            fill     = "#979797"
            fillRule = "nonzero"
            d        = "M59.61 171.554a2.5 2.5 0 10-4.32-2.517l-9.507 16.315a8 8 0 00-.094 7.89l9.571 17.36a2.5 2.5 0 004.379-2.413l-8.203-14.88a8 8 0 01.094-7.89l8.08-13.865z"
          />
        </g>
        <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.up, state.socket)}} className = {c.up} mask="url(#prefix__d)">
          <path
            //UP BG
            d       = "M.5.846H340L214.548 126.298c-24.603 24.603-64.493 24.603-89.096 0L.5 1.346"
            fill    = "#2a2a2a"
          />
          <path
            //UP Icon
            d        = "M188.291 78.955a2.5 2.5 0 102.518-4.32l-16.315-9.506a8 8 0 00-7.89-.094l-17.361 9.57a2.5 2.5 0 002.414 4.38l14.879-8.203a8 8 0 017.89.094l13.865 8.08z"
            fill     = "#979797"
            fillRule = "nonzero"
          />
        </g>
        <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.right, state.socket)}} className = {c.right} mask="url(#prefix__d)">
          <path
            // RIGHT BG
            d       = "M339.5 8.12v363.188L228.369 260.177c-39.052-39.053-39.052-102.37 0-141.422l.158-.158L339.5 8.12z"
            fill    = "#2a2a2a"
          />
          <path
            //RIGHT icon
            d        = "M280.84 171.554a2.5 2.5 0 014.32-2.517l9.507 16.315a8 8 0 01.094 7.89l-9.571 17.36a2.5 2.5 0 11-4.379-2.413l8.202-14.88a8 8 0 00-.093-7.89l-8.08-13.865z"
            fill     = "#979797"
            fillRule = "nonzero"
          />
        </g>
        <g mask="url(#prefix__d)">
          
          <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.ok, state.socket)}} className = {c.ok} transform="translate(131.75 151.346)">
            <circle 
              //OK BG
              fill    = "#2a2a2a"
              cx      = {38.132}
              cy      = {38.132}
              r       = {38.132}
            />
            <path
                transform = "translate(25 30)"                
                d="M13.479 8.505c0 1.47-.26 2.759-.78 3.866-.52 1.108-1.263 1.962-2.23 2.564-.967.601-2.076.902-3.327.902-1.238 0-2.342-.297-3.312-.892-.971-.595-1.723-1.444-2.256-2.548-.533-1.104-.803-2.374-.81-3.81V7.85c0-1.47.265-2.763.794-3.881.53-1.118 1.279-1.976 2.246-2.574C4.771.796 5.877.497 7.121.497c1.244 0 2.35.3 3.317.897.968.598 1.716 1.456 2.246 2.574.53 1.118.795 2.408.795 3.87v.667zM10.36 7.83c0-1.566-.28-2.755-.84-3.569-.561-.813-1.36-1.22-2.4-1.22-1.032 0-1.828.402-2.389 1.205-.56.803-.844 1.98-.851 3.532v.728c0 1.525.28 2.707.84 3.548.561.841 1.368 1.261 2.42 1.261 1.033 0 1.826-.405 2.38-1.215.553-.81.834-1.99.84-3.542v-.728zm10.237 1.815l-1.6 1.722v4.266h-3.076V.702h3.076V7.47l1.354-1.856L24.156.702h3.784l-5.302 6.634 5.455 8.296h-3.66l-3.835-5.988z"
                fill="#979797"
                fillRule="nonzero"
              />
            {/* <text
              fontFamily    = "Arial"
              fontSize      = {21}
              fontWeight    = "bold"
              letterSpacing = {0.208}
            >
              
              
            
              <tspan 
                //OK TEXT
                x    = {23.632}
                y    = {45.132}
                fill = "#979797"
              >
                {'OK'}
              </tspan>
            </text> */}
          </g>
        </g>
        <g onPointerDown = {()=>{state.callbacks.press(btnPressSpeed,COMMANDS.key.down, state.socket)}} className = {c.down} mask="url(#prefix__d)">
          <path
            //DOWN BG
            d       = "M.5 378.846H340L214.548 253.393c-24.603-24.603-64.493-24.603-89.096 0L.5 378.346"
            fill    = "#272727"
          />
          <path
            //DOWN Icon
            d        = "M188.291 300.186a2.5 2.5 0 112.518 4.32l-16.315 9.506a8 8 0 01-7.89.094l-17.361-9.57a2.5 2.5 0 112.414-4.38l14.879 8.203a8 8 0 007.89-.094l13.865-8.079z"
            fill     = "#979797"
            fillRule = "nonzero"
          />
        </g>
      </g>
      
      <path
        transform="translate(150 32)"
        d="M10.677 2.931H6.975V13h-2.49V2.931H.831V.914h9.845v2.017zm6.226 7.072l2.74-9.089h2.772L18.206 13h-2.598L11.416.914h2.764l2.723 9.09zm15.773-1.427h-1.984V13h-2.49V.914h4.49c1.428 0 2.53.318 3.304.955.775.636 1.162 1.535 1.162 2.697 0 .825-.178 1.513-.535 2.063-.357.55-.898.99-1.623 1.316l2.615 4.939V13h-2.673l-2.266-4.424zm-1.984-2.017H32.7c.625 0 1.11-.16 1.452-.478.343-.318.515-.756.515-1.315 0-.57-.162-1.019-.486-1.345-.323-.327-.82-.49-1.49-.49h-2V6.56zm12.543 6.607c-1.317 0-2.39-.404-3.217-1.212-.827-.808-1.24-1.884-1.24-3.229v-.232c0-.902.174-1.709.522-2.42.349-.711.843-1.259 1.482-1.644.64-.384 1.368-.576 2.187-.576 1.229 0 2.196.387 2.901 1.162.706.774 1.059 1.873 1.059 3.295v.98h-5.72c.078.586.312 1.057.702 1.41.39.355.884.532 1.482.532.924 0 1.646-.335 2.166-1.004l1.179 1.32c-.36.508-.847.906-1.461 1.19a4.793 4.793 0 01-2.042.428zm-.274-7.371c-.476 0-.862.16-1.158.481-.296.321-.486.78-.569 1.378h3.337v-.19c-.01-.532-.155-.943-.431-1.233-.277-.29-.67-.436-1.179-.436zm7.787-1.776l.074 1.004c.637-.78 1.497-1.17 2.582-1.17 1.157 0 1.95.456 2.382 1.37.631-.914 1.53-1.37 2.698-1.37.974 0 1.699.283 2.175.85.476.568.714 1.421.714 2.561V13h-2.407V7.272c0-.509-.1-.88-.3-1.116-.199-.235-.55-.353-1.054-.353-.719 0-1.217.343-1.494 1.03L56.127 13h-2.4V7.28c0-.52-.102-.896-.306-1.128-.205-.233-.554-.349-1.046-.349-.681 0-1.173.282-1.478.847V13h-2.399V4.019h2.25zM63.05 8.426c0-.89.172-1.685.515-2.382a3.767 3.767 0 011.481-1.619c.645-.382 1.394-.572 2.246-.572 1.212 0 2.2.37 2.967 1.112.767.741 1.194 1.749 1.283 3.021l.016.615c0 1.378-.384 2.483-1.153 3.316-.77.833-1.802 1.249-3.097 1.249s-2.328-.415-3.1-1.245c-.772-.83-1.158-1.96-1.158-3.387v-.108zm2.399.175c0 .852.16 1.503.481 1.954.321.451.78.677 1.378.677.581 0 1.035-.223 1.362-.668.326-.446.49-1.158.49-2.138 0-.835-.164-1.483-.49-1.942-.327-.46-.786-.69-1.378-.69-.587 0-1.04.23-1.362.686-.32.456-.481 1.163-.481 2.12zm10.667-6.79v2.208h1.536v1.76h-1.536v4.482c0 .332.064.57.191.714.127.143.37.215.73.215.266 0 .501-.019.706-.058v1.818c-.47.144-.954.216-1.453.216-1.682 0-2.54-.85-2.573-2.548v-4.84h-1.311v-1.76h1.311V1.812h2.4zm7.214 11.355c-1.317 0-2.39-.404-3.216-1.212-.828-.808-1.241-1.884-1.241-3.229v-.232c0-.902.174-1.709.523-2.42.348-.711.842-1.259 1.481-1.644.64-.384 1.369-.576 2.188-.576 1.228 0 2.195.387 2.9 1.162.706.774 1.059 1.873 1.059 3.295v.98h-5.72c.078.586.312 1.057.702 1.41.39.355.884.532 1.482.532.924 0 1.646-.335 2.166-1.004l1.18 1.32c-.36.508-.848.906-1.462 1.19a4.793 4.793 0 01-2.042.428zm-.274-7.371c-.476 0-.862.16-1.158.481-.296.321-.485.78-.568 1.378h3.337v-.19c-.011-.532-.155-.943-.432-1.233-.277-.29-.67-.436-1.179-.436z"
        fill="#FFF"
        fillRule="nonzero"
      />
  
    </g>
  </svg>
)}


//TODO: make this a class
let ReactRemote = ()=>{
  let [state, setState] = React.useState({
    pressed:{
      volUp:false,
      volDn:false,
      keyboard:false,
      back:false,
      home:false,
      left:false,
      right:false,
      up:false,
      down:false,
      ok:false
      
    },   
    active:{
      mute:false,
      cc:false,
      power:true

    },
    callbacks:{
      press: (animSpeed, key, socketInstance)=>{
        if(state.active.power){
          socketInstance.emit(key)
          if(!state.pressed[key]){
            let newState = {...state}
            newState.pressed[key] = true
            setState(newState)
            setTimeout(()=>{
              
            let nextState = {...state}
            nextState.pressed[key] = false
            console.log(key)
            setState(nextState)
            },animSpeed)
          }
        }
      },

      //emits the command, but with On, or Off appended to it, depending on the newState.
      toggle: (key, socketInstance)=>{
        if(state.active.power){
          let newState = {...state}
          newState.active[key] = state.active[key] ? false:true
          if(newState.active[key]){
            socketInstance.emit(key + "On")
            console.log(key+"On")
          }
          else{
            socketInstance.emit(key + "Off")
            console.log(key+"Off")
          } 
          setState(newState)
        }
        else{
          if(key == COMMANDS.key.power){
            let newState = {...state}
            newState.active[key] = state.active[key] ? false:true
            socketInstance.emit(key + "On")
            setState(newState)
            
          }
        }
      }

    },
    socket: StartSocket()
  })
  
  
  
  

  //TODO - not sure if this will work.
  // setState({...state,
  //   callbacks:{
  //     press:press,
  //     toggle:toggle
  //   },
  // })

    

    return(<div>
        { <SVGRemote state = {state} /> }
    </div>)
  }

  ReactDOM.render(<ReactRemote />,document.querySelector("#root"))



  //click > callback with on/active key > state gets updated on parent > pass state down > resolve new classes based on state > 