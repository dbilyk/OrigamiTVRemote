# Origami TV Remote
Create Origami Studio prototypes for TV with a phone remote.

### Step 1: Install node.js on your computer.
[Node Installation Guide](https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/)

### Step 2: Install Origami Studio on your computer, if you haven't already.
[Download Origami Studio](https://fb.me/getorigamistudio)

### Step 3: Download and unzip this repo.
**Important** - Once it's downloaded, you _must_ move **OrigamiServer** to any other folder besides Downloads. 

_(Trying to run it from Downloads folder causes permissions issues because it installs a bunch of packages from Node Package Manager)_
 
Then, **run** Origami Server.  
If it blocks you from opening it, simply **right-click**, then select **Open**.

Give any permissions that may be requested as the terminal installs the necessary libraries.

You will have the option to use iMessage to send the link you'll use to display the app remote.  It can get annoying to type.


After that, you can open the demo origami project and check that origami is recieving commands when you tap on your phone remote. 

### Step 4: Make some cool TV prototypes!



## Customizing the remote

### Adding Actions
All the important stuff is in __OrigamiServer.app > Contents > MacOS > tv_server__.
To add a new button action:

* add the command ```someKey : "someValue"``` to static/commands.js

* add your button to the remote in static/ReactRemote.js and style it via styles.css

+ Add the _value_ of your command as a _class_ on your button html element, ie:
```<div class = {"someOtherClasses " +  COMMANDS.key.myCoolNewAction}></div>```.  

+ **Important** - Notice that the COMMANDS object is exposed to the client (app remote) globally, so you can reference it directly in the react component, and the server will automatically listen for and pass along the _same_ command to Origami.

+ currently only **click** events can be added this way.

+ The last step is just to actually listen for the command in Origami.  Reference the demo file for how you can set up a component to listen for and act on commands send down from the server.  When OrigamiServer is running, it will print the commands it recieves from the remote before sending them to origami.
