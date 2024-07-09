let screen = 0; // 0: initial screen, 1: instructions screen, 2: game screen, 3: inside house, 4: dark hallway, 5: room1, 6: room2, 7: room3, 8: room4
let witch;
let hauntedHouse;
let darkHallway;
let room1, room2, room3, room4;
let eyeball, inventoryImage;
let witchX, witchY;
let witchWidth = 60; // Desired width of the witch image
let witchHeight = 60; // Desired height of the witch image
let daydreamFont;
let inventory = []; // Inventory to hold collected items

function preload() {
  // Preload images
  hauntedHouse = loadImage('hauntedhousebackup.png');
  witch = loadImage('witch.png');
  darkHallway = loadImage('darkhallway.png');
  room1 = loadImage('room1backup.png');
  room2 = loadImage('room2backup.png');
  room3 = loadImage('room3backup.png');
  room4 = loadImage('room4.png');
  eyeball = loadImage('eyeball.png');
  inventoryImage = loadImage('inventory.png');
  daydreamFont = loadFont('Daydream.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  displayInitialScreen();
  // Set initial position for the witch (right side of the screen)
  witchX = width - 100;
  witchY = height / 2;
}

function draw() {
  if (screen === 2) {
    displayGame();
  } else if (screen === 3) {
    loadIntoHouse();
  } else if (screen === 4) {
    displayDarkHallway();
  } else if (screen === 5) {
    displayRoom(room1, 'eyeball');
  } else if (screen === 6) {
    displayRoom(room2);
  } else if (screen === 7) {
    displayRoom(room3);
  } else if (screen === 8) {
    displayRoom(room4);
  }

  // Display inventory icon in all screens except initial and instruction screens
  if (screen >= 2) {
    displayInventoryIcon();
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
  }
}

function displayInitialScreen() {
  background(22, 13, 43);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  textFont(daydreamFont);
  text('Make a potion!', width / 2, height / 2);
  textSize(20);
  text('Click "I" to start', width / 2, height / 2 + 50);
}

function displayInstructionsScreen() {
  background(22, 13, 43);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Your job is to explore the haunted house and find the four ingredients for your potion.', width / 2, height / 2 - 40);
  text('You will need an eyeball, a spider, a candle, and a brain.', width / 2, height / 2);
  textSize(16);
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
  scale(1,1); // Flip the image horizontally
  image(witch, 0, 0, witchWidth, witchHeight); // Draw the image
  pop(); // Restore the original transformation state

  // Check if witch is touching the house (center of the screen)
  if (dist(witchX + witchWidth / 2, witchY + witchHeight / 2, width / 2, height / 2) < 100) {
    screen = 3; // Change screen state to inside house
  }
}

function loadIntoHouse() {
  background(22, 13, 43);
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text('You are inside the house!', width / 2, height / 2);
  textSize(17);
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
  } else if (screen === 5 && isInside(mouseX, mouseY, width * 0.1, height * 0.2, width * 0.2, height * 0.2)) { // Check if eyeball is clicked in room1
    addToInventory('eyeball');
  } else if (screen === 4 && isInside(mouseX, mouseY, width - 60, 20, 40, 40)) { // Check if inventory icon is clicked
    showInventory();
  }
}

function displayRoom(roomImage, item) {
  // Scale the room image to fit the screen
  image(roomImage, 0, 0, width, height);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text('You are in the room. Find the ingredient!', 230,40);
  textSize(8);
  text('Press "E" to exit back to the dark hallway', 230,60);

  // Display the eyeball in room 1
  if (item === 'eyeball') {
    image(eyeball, width * 0.66, height * 0.4, 50, 50);
  }
}

function displayInventoryIcon() {
  image(inventoryImage, width - 60, 20, 40, 40); // Display inventory icon at top right corner
}


