(function(exports){
  //these are the commands that define the communication between the remote, the server, the origami prototype.
  //reference the strings in the classnames

  return exports.key = {
    left:"l",
    right:"r",
    up:"u",
    down:"d",
    ok:"ok",
    back:"back",
    home:"home",
    RC:"RC",
    volumeUp:"volumeUp",
    volumeDn: "volumeDn",
    muteOn:"muteOn",
    muteOff:"muteOff",
    powerOn:"powerOn",
    powerOff:"powerOff",
    CCON:"CCON",
    CCOFF:"CCOFF",
    more:"more"
  }

}(typeof exports === 'undefined' ? this.COMMANDS = {}: exports));