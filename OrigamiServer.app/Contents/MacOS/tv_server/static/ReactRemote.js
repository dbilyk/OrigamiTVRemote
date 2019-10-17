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


//svg remote
const SVGRemote = props => (
  <svg width={375*3} height={653*3} viewBox="0 0 375 653">
    <defs>
      <rect id="prefix__a" x={0.5} y={0.846} width={191} height={54} rx={27} />
      <rect id="prefix__c" x={0.5} y={0.846} width={339} height={378} rx={44} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d="M12 0h351c6.627 0 12 5.373 12 12v644H0V12C0 5.373 5.373 0 12 0z"
        fill="#1C1D1E"
      />
      <g className = {props.classes.vol} transform="translate(91.5 558.154)">
        <mask id="prefix__b" fill="#fff">
          <use xlinkHref="#prefix__a" />
        </mask>
        <use fill="#2C2D2E" xlinkHref="#prefix__a" />
        <g mask="url(#prefix__b)" fill="#FFF">
          <path
            className = {props.classes.volDnBG}
            d="M27.5.846H96v54H27.5c-14.912 0-27-12.089-27-27 0-14.912 12.088-27 27-27z"
            fillOpacity={0.057}
          />
          <path
            className = {props.classes.volDnIcon}
            d="M58.845 29.237h-16.69c-.765 0-1.391-.626-1.391-1.391s.626-1.391 1.39-1.391h16.691c.765 0 1.391.626 1.391 1.39 0 .766-.626 1.392-1.39 1.392z"
            fillOpacity={0.5}
            fillRule="nonzero"
          />
        </g>
        <g mask="url(#prefix__b)" fill="#FFF">
          <path
            className = {props.classes.volUpBG}
            d="M164.868.846h-68.5v54h68.5c14.912 0 27-12.089 27-27 0-14.912-12.088-27-27-27z"
            fillOpacity={0.057}
          />
          <path
            className = {props.classes.volUpIcon}
            d="M150.143 29.203h-6.786v6.786c0 .746-.61 1.357-1.357 1.357-.746 0-1.357-.611-1.357-1.357v-6.786h-6.786c-.746 0-1.357-.61-1.357-1.357s.61-1.357 1.357-1.357h6.786v-6.786c0-.747.61-1.357 1.357-1.357.746 0 1.357.61 1.357 1.357v6.786h6.786c.746 0 1.357.61 1.357 1.357 0 .746-.61 1.357-1.357 1.357z"
            fillOpacity={0.5}
            fillRule="nonzero"
          />
        </g>
        <path
          d="M96.368.846v54"
          strokeOpacity={0.217}
          stroke="#1C1D1E"
          mask="url(#prefix__b)"
        />
      </g>
      <g transform="translate(17.104 557.15)">
        <circle className = {props.classes.muteBG} fill="#2C2D2E" cx={28.896} cy={28.851} r={28} />
        <path
          className = {props.classes.muteIcon}
          d="M19.228 19.184a1.15 1.15 0 000 1.628l4.227 4.228-.335.346h-3.465c-.635 0-1.155.52-1.155 1.155v4.62c0 .636.52 1.156 1.155 1.156h3.465l3.8 3.8c.728.728 1.976.208 1.976-.82V30.48l4.828 4.828a7.885 7.885 0 01-1.848 1.051c-.416.174-.67.613-.67 1.063 0 .832.843 1.363 1.605 1.051.924-.381 1.79-.89 2.565-1.513l1.547 1.548c.45.45 1.179.45 1.629 0a1.15 1.15 0 000-1.629L20.868 19.184a1.164 1.164 0 00-1.64 0zM36.98 28.85c0 .948-.173 1.86-.473 2.703l1.767 1.768a10.321 10.321 0 001.016-4.47 10.39 10.39 0 00-6.676-9.703c-.682-.266-1.41.266-1.41.993v.22c0 .439.29.82.705.982 2.969 1.2 5.071 4.112 5.071 7.507zm-10.06-7.265l-.197.196 2.172 2.172v-1.56c0-1.027-1.248-1.536-1.976-.808zm7.172 7.265c0-2.044-1.178-3.8-2.887-4.654v2.067l2.864 2.865c.012-.093.023-.185.023-.278z"
          fillOpacity={0.5}
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
      <g transform="translate(300.5 557.154)">
        <circle className = {props.classes.ccBG} fill="#2C2D2E" cx={28.5} cy={28.846} r={28} />
        <path
          className = {props.classes.ccIcon}
          d="M37.25 18.846h-17.5a2.5 2.5 0 00-2.5 2.5v15a2.5 2.5 0 002.5 2.5h17.5c1.375 0 2.5-1.125 2.5-2.5v-15c0-1.375-1.125-2.5-2.5-2.5zm-10 8.125c0 .35-.275.625-.625.625H26a.619.619 0 01-.625-.625h-2.5v3.75h2.5c0-.35.275-.625.625-.625h.625c.35 0 .625.275.625.625v.625c0 .687-.563 1.25-1.25 1.25h-3.75c-.688 0-1.25-.563-1.25-1.25v-5c0-.688.563-1.25 1.25-1.25H26c.688 0 1.25.562 1.25 1.25v.625zm8.75 0c0 .35-.275.625-.625.625h-.625a.619.619 0 01-.625-.625h-2.5v3.75h2.5c0-.35.275-.625.625-.625h.625c.35 0 .625.275.625.625v.625c0 .687-.563 1.25-1.25 1.25H31c-.688 0-1.25-.563-1.25-1.25v-5c0-.688.563-1.25 1.25-1.25h3.75c.688 0 1.25.562 1.25 1.25v.625z"
          fillOpacity={0.5}
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
      <g transform="translate(17.918 477.572)">
        <circle className = {props.classes.backBG} fill="#2C2D2E" cx={28.082} cy={28.428} r={28} />
        <path
          className = {props.classes.backIcon}   
          d="M24.784 21.071v-3.006a.5.5 0 00-.822-.382L19.089 21.8a.5.5 0 000 .764l4.873 4.118a.5.5 0 00.822-.382v-3.018l6.48-.023h.026c3.375 0 6.11 2.728 6.11 6.093 0 3.383-2.75 6.125-6.141 6.125H18.547v2.212H31.26c4.616 0 8.359-3.732 8.359-8.337 0-4.587-3.728-8.305-8.328-8.305h-.036l-6.47.023z"
          fill="#979797"
          fillRule="nonzero"
        />
      </g>
      <g transform="translate(159.5 478)">
        <circle className = {props.classes.homeBG} fill="#2C2D2E" cx={28} cy={28} r={28} />
        <path
          className = {props.classes.homeIcon}
          d="M25.357 37.352v-6.605h5.284v6.605c0 .726.595 1.32 1.321 1.32h3.963c.726 0 1.32-.594 1.32-1.32v-9.247h2.246c.608 0 .899-.753.436-1.15L28.884 17.01a1.331 1.331 0 00-1.77 0l-11.043 9.947c-.449.396-.171 1.15.436 1.15h2.246v9.246c0 .726.594 1.32 1.32 1.32h3.964c.726 0 1.32-.594 1.32-1.32z"
          fillOpacity={0.5}
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
      <g transform="translate(301 478)">
        <circle className = {props.classes.keyboardBG} fill="#2C2D2E" cx={28} cy={28} r={28} />
        <path
          className = {props.classes.keyboardIcon}
          d="M39.429 18H16.57a2.853 2.853 0 00-2.842 2.857l-.015 14.286A2.866 2.866 0 0016.571 38H39.43a2.866 2.866 0 002.857-2.857V20.857A2.866 2.866 0 0039.429 18zM26.57 22.286h2.858v2.857H26.57v-2.857zm0 4.285h2.858v2.858H26.57V26.57zm-4.285-4.285h2.857v2.857h-2.857v-2.857zm0 4.285h2.857v2.858h-2.857V26.57zm-1.429 2.858H18V26.57h2.857v2.858zm0-4.286H18v-2.857h2.857v2.857zm11.429 10h-8.572a1.433 1.433 0 01-1.428-1.429c0-.785.643-1.428 1.428-1.428h8.572c.785 0 1.428.643 1.428 1.428 0 .786-.643 1.429-1.428 1.429zm1.428-5.714h-2.857V26.57h2.857v2.858zm0-4.286h-2.857v-2.857h2.857v2.857zM38 29.429h-2.857V26.57H38v2.858zm0-4.286h-2.857v-2.857H38v2.857z"
          fillOpacity={0.5}
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
      <g transform="translate(17.496 20.154)">
        <circle className = {props.classes.powerBG} fill="#343437" cx={18.504} cy={18.846} r={18} />
        <path
          className = {props.classes.powerIcon}
          d="M18.504 9c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1s1-.45 1-1v-8c0-.55-.45-1-1-1zm5.13 4.25c1.13 1.2 1.83 2.8 1.87 4.57.09 3.83-3.08 7.13-6.91 7.17a6.981 6.981 0 01-7.09-6.99c0-1.84.71-3.51 1.87-4.76.37-.39.37-1-.01-1.38a.993.993 0 00-1.43.02 8.92 8.92 0 00-2.43 5.86c-.14 4.88 3.83 9.1 8.71 9.25 5.1.16 9.29-3.93 9.29-9 0-2.37-.92-4.51-2.42-6.11-.38-.41-1.04-.42-1.44-.02a.99.99 0 00-.01 1.39z"
          fillOpacity={0.5}
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
      <g transform="translate(17.5 74.154)">
        <mask id="prefix__d" fill="#fff">
          <use xlinkHref="#prefix__c" />
        </mask>
        <use fill="#2C2D2E" xlinkHref="#prefix__c" />
        <path
          className = {props.classes.leftBG}
          d="M.5 8.12v363.188l111.131-111.131c39.052-39.053 39.052-102.37 0-141.422a99.474 99.474 0 00-.158-.158L.5 8.12z"
          fill="#38393A"
          mask="url(#prefix__d)"
        />
        <g className = {props.classes.leftIcon} mask="url(#prefix__d)" fill="#979797" fillRule="nonzero">
          <path d="M59.61 171.554a2.5 2.5 0 10-4.32-2.517l-9.507 16.315a8 8 0 00-.094 7.89l9.571 17.36a2.5 2.5 0 004.379-2.413l-8.203-14.88a8 8 0 01.094-7.89l8.08-13.865z" />
        </g>
        <g mask="url(#prefix__d)">
          <path
            className = {props.classes.upBG}
            d="M.5.846H340L214.548 126.298c-24.603 24.603-64.493 24.603-89.096 0L.5 1.346"
            fill="#38393A"
          />
          <path
            className = {props.classes.upIcon}
            d="M188.291 78.955a2.5 2.5 0 102.518-4.32l-16.315-9.506a8 8 0 00-7.89-.094l-17.361 9.57a2.5 2.5 0 002.414 4.38l14.879-8.203a8 8 0 017.89.094l13.865 8.08z"
            fill="#979797"
            fillRule="nonzero"
          />
        </g>
        <g mask="url(#prefix__d)">
          <path
            d="M339.5 8.12v363.188L228.369 260.177c-39.052-39.053-39.052-102.37 0-141.422l.158-.158L339.5 8.12z"
            fill="#38393A"
          />
          <path
            d="M280.84 171.554a2.5 2.5 0 014.32-2.517l9.507 16.315a8 8 0 01.094 7.89l-9.571 17.36a2.5 2.5 0 11-4.379-2.413l8.202-14.88a8 8 0 00-.093-7.89l-8.08-13.865z"
            fill="#979797"
            fillRule="nonzero"
          />
        </g>
        <g mask="url(#prefix__d)">
          <g transform="translate(131.75 151.346)">
            <circle fill="#38393A" cx={38.132} cy={38.132} r={38.132} />
            <text
              fontFamily="Roboto-Bold, Roboto"
              fontSize={21}
              fontWeight="bold"
              letterSpacing={0.208}
            >
              <tspan x={23.632} y={45.132} fill="#979797">
                {'OK'}
              </tspan>
            </text>
          </g>
        </g>
        <g mask="url(#prefix__d)">
          <path
            d="M.5 378.846H340L214.548 253.393c-24.603-24.603-64.493-24.603-89.096 0L.5 378.346"
            fill="#38393A"
          />
          <path
            d="M188.291 300.186a2.5 2.5 0 112.518 4.32l-16.315 9.506a8 8 0 01-7.89.094l-17.361-9.57a2.5 2.5 0 112.414-4.38l14.879 8.203a8 8 0 007.89-.094l13.865-8.079z"
            fill="#979797"
            fillRule="nonzero"
          />
        </g>
      </g>
      <text
        fontFamily="Roboto-Bold, Roboto"
        fontSize={17}
        fontWeight="bold"
        letterSpacing={0.208}
        fill="#FFF"
        transform="translate(0 -.846)"
      >
        <tspan x={144.5} y={45.846}>
          {'TV Remote'}
        </tspan>
      </text>
    </g>
  </svg>
)


//TODO: make this a class
let ReactRemote = ()=>{

    let modifierClasses = {
        bgActive:"bg__active",
        bgDisabled: "bg__disabled",
        iconActive: "icon__active",
        iconDisabled: "icon__disabled"

    }

    let [state, setState] = React.useState({
        classes:{
          vol:"",
          volDnBG:"",
          volDnIcon:"",
          volUpBG:"",
          volUpIcon:"",
          muteBG:"",
          muteIcon:"",
          ccBG:"",
          ccIcon:"",
          volUpBG:"",
          volUpIcon:"",
          keyboardBG:"",
          keyboardIcon:"",
          backBG:"",
          backIcon:"",
          homeBG:"",
          homeIcon:"",
          powerBG:"",



        },
        callbacks:{
          toggleMomentarily:(speed, key)=>{
            let newState = {...state}
            newState[key] = newState[key] ? false:true
            setState(newState)
            setTimeout(()=>{
            newState[key] = newState[key] ? false:true
            },speed)
          },
          toggle:(key)=>{
            let newState = state[key] ? false:true
            setState(newState)
          }
        }

    })

    let addClassMomentarily = (stateKey)=>{

    }
    
    React.useEffect(()=>{
        console.log("remounted")
    })

    return(<div className = {""}>
        
        { <SVGRemote classes = {state.classes} callbacks = {state.callbacks}/> }
    </div>)
  }

  ReactDOM.render(<ReactRemote />,document.querySelector("#root"))

//call this within component mounting
StartSocket()