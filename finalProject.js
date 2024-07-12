let screen = 0; // 0: initial screen, 1: instructions screen, 2: game screen, 3: inside house, 4: dark hallway, 5: room1, 6: room2, 7: room3, 8: room4, 9: ending screen
let witch;
let gamescreen;
let hauntedHouse;
let darkHallway;
let room1, room2, room3, room4;
let eyeball, brain, candle, spider, inventoryImage, chooseEnding;
let witchX, witchY;
let witchWidth = 60; // Desired width of the witch image
let witchHeight = 60; // Desired height of the witch image
let daydreamFont;
let inventory = []; // Inventory to hold collected items
let clickOrder = ['brain', 'eyeball', 'spider', 'candle']; // Order of items to collect
let currentClickIndex = 0; // Index to check against clickOrder
let badEnding;
let goodEnding;
let creepyGirl; // Declare a variable for the creepy girl image
let badEndingDialogueState = 0; 
let theEnd; // Declare a variable for the "theend.png.jpeg" image
let canvas
let creepyVid


function preload() {
  // Preload images
  gamescreen = loadImage('gamescreen.png');
  hauntedHouse = loadImage('hauntedhousebackup.png');
  witch = loadImage('witch.png');
  darkHallway = loadImage('darkhallway.png');
  room1 = loadImage('room1.png');
  room2 = loadImage('room2backup.png');
  room3 = loadImage('room3.png');
  room4 = loadImage('room4backup.png');
  eyeball = loadImage('eyeball.png');
  brain = loadImage('brain.png');
  candle = loadImage('candle.png');
  spider = loadImage('spider.png');
  inventoryImage = loadImage('inventory.png');
  daydreamFont = loadFont('Daydream.ttf');
  dungeon = loadImage('dungeon.png'); // Load chooseending.png
  creepyGirl = loadImage('creepygirl.png'); // Load the creepy girl image
  badEnding = loadImage('badending.png.jpeg');
  goodEnding = loadImage('goodending.png');
  theEnd = loadImage('theend.png.jpeg'); // Load the "theend.png.jpeg" image
  creepyVid = createVideo (['creepy.video.mp4'])
  creepyVid.hide()
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style ('z-index', '-1')
  canvas.position (0,0)


 
//creepyVid.style('width', windowWidth + 'px')
  displayInitialScreen();
  // Set initial position for the witch (right side of the screen)
  witchX = width - 100;
  witchY = height / 2;

}

function draw() {
  print(creepyVid.time())
  if (screen === 2) {
    displayGame();
  } else if (screen === 3) {
    loadIntoHouse();
  } else if (screen === 4) {
    displayDarkHallway();
  } else if (screen === 5) {
    displayRoom(room1, 'eyeball'); // Display eyeball in room 1
  } else if (screen === 6) {
    displayRoom(room2, 'brain'); // Display brain in room 2
  } else if (screen === 7) {
    displayRoom(room3, 'candle'); // Display candle in room 3
  } else if (screen === 8) {
    displayRoom(room4, 'spider'); // Display spider in room 4
  } else if (screen == 9) {
    displayEndingScreen();
  }else if (screen == 10) {
    badending();
  }else if (screen == 11) {
    goodending();
    } else if (screen == 12) {
    
  scaryVid()
  }else if (screen == 13){
    displayTheEndScreen();
  }

  // Display inventory icon and count in all screens except initial and instruction screens
  if (screen >= 2 && screen !== 9 && screen !=12) {
    displayInventoryIcon();
  }

  // Check for spacebar press to advance dialogue in bad ending
  if (screen === 10 && keyIsPressed && key === ' ') {
    // Limit badEndingDialogueState to 3 to prevent going out of bounds
    badEndingDialogueState = min(badEndingDialogueState, 3);

    // Increment badEndingDialogueState to show the next text
    badEndingDialogueState++;
  }
}


function keyPressed() {
  if (screen === 0 && (key === 'I' || key === 'i')) {
    displayInstructionsScreen();
    screen = 1;
  } else if (screen === 1 && (key === 'S' || key === 's')) {
    screen = 2;
  } else if (screen === 3 && (key === 'D' || key === 'd')) {
    screen = 4;
  } else if ((screen >= 5 && screen <= 8) && (key === 'E' || key === 'e')) {
    screen = 4;
  } else if (key === 'R' || key === 'r') {
    // Restart the game on failure or from the ending screen
    screen = 0;
    inventory = [];
    currentClickIndex = 0;
    displayInitialScreen(); // Call the function to display the initial screen
  } else if (screen == 10 && key == 't') {
    // Check for 'T' press in bad ending screen
    if (badEndingDialogueState < 3) { // Adjusted to match number of dialogue parts
      badEndingDialogueState++;
    }
  }
}




function displayInitialScreen() {
  // Use the gamescreen image for the initial screen background
  image(gamescreen, 0, 0, width, height);
  fill(59, 40, 71);
  textSize(30);
  textAlign(CENTER, CENTER);
  textFont(daydreamFont);
  text('Potion Pursuit', 730, 90);
  textSize(15);
  text('Click "I" to start', 730, 140);
}

function displayInstructionsScreen() {
  background(22, 13, 43);
  fill(59, 40, 71);
  textSize(15);
  textAlign(CENTER, CENTER);
  text('Your job is to explore the haunted house and find the four ingredients for your potion.', width / 2, height / 2 - 40);
  text('You will need an eyeball, a spider, a candle, and a brain.', width / 2, height / 2);
  textSize(12);
  text('Press "S" to start the game', width / 2, height / 2 + 50);
}

function displayGame() {
  // Scale the background to fit the screen
  image(hauntedHouse, 0, 0, width, height);

  // Movement logic
  if (keyIsDown(LEFT_ARROW)) {
    witchX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    witchX += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    witchY -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    witchY += 5;
    
  }

  // Display the witch with specified width and height, flipped horizontally
  push(); // Save the current transformation state
  translate(witchX + witchWidth, witchY); // Move to the witch's position
  scale(1, 1); // Flip the image horizontally
  image(witch, 0, 0, witchWidth, witchHeight); // Draw the image
  pop(); // Restore the original transformation state

  // Check if witch is touching the house (center of the screen)
  if (dist(witchX + witchWidth / 2, witchY + witchHeight / 2, width / 2, height / 2) < 100) {
    screen = 3; // Change screen state to inside house
  }
}

function loadIntoHouse() {
  background(22, 13, 43);
  fill(59, 40, 71);
  textSize(20);
  textAlign(CENTER, CENTER);
  text('You are inside the house!', width / 2, height / 2);
  textSize(12);
  text('Press "D" to enter the dark hallway', width / 2, height / 2 + 50);
}

function displayDarkHallway() {
  // Scale the dark hallway image to fit the screen
  image(darkHallway, 0, 0, width, height);
  fill(255);
  textSize(10);
  text('You are in the dark hallway. Enter the doors to find ingredients.', 720, 100);
}

function mousePressed() {
  if (screen === 4) {
    // Define door positions and dimensions based on the dark hallway image
    let doorWidth = width * 0.15;
    let doorHeight = height * 0.6;
    let door1 = { x: width * 0.15, y: height * 0.25, w: doorWidth, h: doorHeight };
    let door2 = { x: width * 0.35, y: height * 0.25, w: doorWidth, h: doorHeight };
    let door3 = { x: width * 0.55, y: height * 0.25, w: doorWidth, h: doorHeight };
    let door4 = { x: width * 0.75, y: height * 0.25, w: doorWidth, h: doorHeight };

    if (mouseX > door1.x && mouseX < door1.x + door1.w && mouseY > door1.y && mouseY < door1.y + door1.h) {
      screen = 5; // Room 1
    } else if (mouseX > door2.x && mouseX < door2.x + door2.w && mouseY > door2.y && mouseY < door2.y + door2.h) {
      screen = 6; // Room 2
    } else if (mouseX > door3.x && mouseX < door3.x + door3.w && mouseY > door3.y && mouseY < door3.y + door3.h) {
      screen = 7; // Room 3
    } else if (mouseX > door4.x && mouseX < door4.x + door4.w && mouseY > door4.y && mouseY < door4.y + door4.h) {
      screen = 8; // Room 4
    }
  } else if (screen === 5 && isInside(mouseX, mouseY, width * 0.85, height * 0.26, 50, 50)) { // Check if eyeball is clicked in room1
    checkAndAddToInventory('eyeball');
  } else if (screen === 6 && isInside(mouseX, mouseY, width * 0.55, height * 0.57, 50, 50)) { // Check if brain is clicked in room2
    checkAndAddToInventory('brain');
  } else if (screen === 7 && isInside(mouseX, mouseY, width * 0.45, height * 0.53, 50, 50)) { // Check if candle is clicked in room3
    checkAndAddToInventory('candle');
  } else if (screen === 8 && isInside(mouseX, mouseY, width * 0.77, height * 0.77, 50, 50)) { // Check if spider is clicked in room4
    checkAndAddToInventory('spider');
  } else if (screen >= 2 && screen !== 9 && isInside(mouseX, mouseY, width - 60, 20, 40, 40)) { // Check if inventory icon is clicked
    showInventory();
  }
}

function displayRoom(roomImage, item) {
  // Scale the room image to fit the screen
  image(roomImage, 0, 0, width, height);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text('You are in the room. Find the ingredient!', 730, 40);
  textSize(8);
  text('Press "E" to exit back to the dark hallway', 730, 60);

  // Display the item in the respective room
  if (item === 'eyeball') {
    image(eyeball, width * 0.85, height * 0.26, 50, 50); // Display eyeball in room 1
  } else if (item === 'brain') {
    image(brain, width * 0.55, height * 0.57, 50, 50); // Display brain in room 2
  } else if (item === 'candle') {
    image(candle, width * 0.45, height * 0.53, 50, 50); // Display candle in room 3
  } else if (item === 'spider') {
    image(spider, width * 0.77, height * 0.77, 50, 50); // Display spider in room 4
  }
}

function displayInventoryIcon() {
  image(inventoryImage, width - 60, 20, 40, 40); // Display inventory icon
  fill(255);
  textSize(7);
  textAlign(CENTER, CENTER);
  text('Ingredients: ' + currentClickIndex, width - 60, 70); // Display current sequence count
}

function checkAndAddToInventory(item) {
  if (item === clickOrder[currentClickIndex]) {
    currentClickIndex++;
    addToInventory(item);
  } else {
    currentClickIndex = 0; // Reset sequence count if incorrect
  }
}

function addToInventory(item) {
  // Add the item to the inventory array
  inventory.push(item);

  // Check if the last four items in inventory match the winning sequence
  if (inventory.length >= 4 &&
      inventory[inventory.length - 4] === 'brain' &&
      inventory[inventory.length - 3] === 'eyeball' &&
      inventory[inventory.length - 2] === 'spider' &&
      inventory[inventory.length - 1] === 'candle') {
    // Display chooseEnding GIF
    screen = 9; // Set a new screen state for ending
  }
}

function isInside(x, y, rx, ry, rw, rh) {
  // Check if (x, y) is inside the rectangle (rx, ry, rw, rh)
  return (x >= rx && x <= rx + rw && y >= ry && y <= ry + rh);
}

function displayEndingScreen() {
  // Display the ending screen with chooseEnding image or GIF
  image(dungeon, 0, 0, width, height);
  fill(255);
  textSize(13);
  textAlign(CENTER, CENTER);
  text('Oh this is odd, the middle door is usually the way out of here.', 720, 50);
  text('Guess we need to take a different way. Choose a door.', 720, 90);

  // Define door positions based on the dungeon image
  let doorWidth = width * 0.15;
  let doorHeight = height * 0.6;
  let door1 = { x: width * 0.15, y: height * 0.25, w: doorWidth, h: doorHeight };
  let door3 = { x: width * 0.75, y: height * 0.25, w: doorWidth, h: doorHeight };

  // Check if the mouse is clicked over a door
  if (mouseIsPressed) {
    if (mouseX > door1.x && mouseX < door1.x + door1.w && mouseY > door1.y && mouseY < door1.y + door1.h) {
      screen = 10; // Set screen to 10 for bad ending
    } else if (mouseX > door3.x && mouseX < door3.x + door3.w && mouseY > door3.y && mouseY < door3.y + door3.h) {
      screen = 11; // Set screen to 11 for good ending
    }
  }


  // Limit badEndingDialogueState to 3 to prevent going out of bounds
  badEndingDialogueState = min(badEndingDialogueState, 3);

  // Display appropriate ending based on the screen state
  // if (screen == 10) {
    
  // } else if (screen === 11) {
   
  // }
}

function badending(){
  image(dungeon, 0, 0, width, height);
  fill(255);
  textSize(13);
  textAlign(CENTER, CENTER);
image(badEnding, 0, 0, width, height); // Display bad ending
    image(creepyGirl, width * 0.4, height * 0.4, 200, 200); // Display creepy girl image

    // Display dialogue based on badEndingDialogueState
    if (badEndingDialogueState == 0) {
      print('bad ending')
      text('Click "T" to continue...', 730, 580);
    } else if (badEndingDialogueState == 1) {
      text('So it is you who has been breaking into my house and stealing my goods.', 730, 580);
    } else if (badEndingDialogueState == 2) {
      text('You shall pay..', 730, 580);
      } else if (badEndingDialogueState == 3) {
      screen = 12; // Proceed to "theend.png.jpeg" screen
    }
}

  
  
function goodending(){
  image(dungeon, 0, 0, width, height);
  fill(255);
  textSize(13);
  textAlign(CENTER, CENTER);
   image(goodEnding, 0, 0, width, height); // Display good ending
    fill(255);
    textSize(15);
    text('You made it out! You got all the ingredients for your potion.', width / 2, height / 2); // Add text for good ending
    inventory.hide ()
}

function scaryVid(){
  background(0)
    creepyVid.show()
    creepyVid.play()
  
  if(creepyVid.time() > 2.5){
     creepyVid.hide()
     creepyVid.stop()
     screen = 13
  }
}

function displayTheEndScreen() {
  
  background(0);
   image(theEnd, 0, 0, width, height); // Display "theend.png.jpeg" image
  
  fill(61, 5, 5);
  textSize(30);
  textAlign(CENTER, CENTER);
  text('You died.', 730,350); // Display "you died" text
  textSize(20);
  text('Press "R" to restart', 730,430);
  inventory.hide()
 
}