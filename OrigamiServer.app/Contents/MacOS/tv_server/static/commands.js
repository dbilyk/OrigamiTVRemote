(function(exports){
  //these are the commands that define the communication between the remote, the server, the origami prototype.
  //reference the strings in the classnames

  return exports.key = {
    left:"l",
    up:"u",
    down:"d",
    ok:"ok",
    back:"back",
    home:"home",
    RC:"RC",
    volumeUp:"volumeUp",
    volumeDn: "volumeDn",
    mute:"mute",
    CC:"CC",
    more:"more",
    right:"r",
  }

}(typeof exports === 'undefined' ? this.COMMANDS = {}: exports));