(function(exports){
  //these are the commands that define the communication between the remote, the server, the origami prototype.
  //reference the strings in the classnames

  return exports.key = {
    left:"left",
    right:"right",
    up:"up",
    down:"down",
    ok:"ok",
    back:"back",
    home:"home",
    RC:"RC",
    keyboard:"keyboard",
    volUp:"volUp",
    volDn: "volDn",
    
    mute:"mute",
    muteOn:"muteOn",
    muteOff:"muteOff",

    power:"power",
    powerOn:"powerOn",
    powerOff:"powerOff",

    cc:"cc",
    ccOn:"ccOn",
    ccOff:"ccOff",
    more:"more"
  }

}(typeof exports === 'undefined' ? this.COMMANDS = {}: exports));