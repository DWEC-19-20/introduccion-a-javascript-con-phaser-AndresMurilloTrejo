// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var looser;
var won = false;
var poison;
var poison1;
var currentScore = 0;
var winningScore = 70;
var currentLive = 3;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  poison = game.add.physicsGroup();
  createItem(375, 300, 'coin'); //mid mid
  createItem(670, 300, 'coin'); //mid r
  createItem(70, 300, 'badge');  //mid l
  createItem(170, 450, 'coin'); //bot l
  createItem(570, 450, 'badge'); //bot r
  createItem(170, 150, 'coin'); //top l
  createItem(570, 150, 'badge'); //top r
  createPoison(375, 150, 'poison'); //top r
  createPoison(375, 450, 'poison'); //top r
  createPoison(175, 300, 'poison'); //top r
  createPoison(215, 300, 'poison'); //top r
  createPoison(255, 300, 'poison'); //top r
  createPoison(295, 300, 'poison'); //top r
  createPoison(335, 300, 'poison'); //top r

}


// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(500, 200, 'platform'); //top r
  platforms.create(500, 500, 'platform'); //bottom r
  platforms.create(100, 500, 'platform'); //bottom l
  platforms.create(300, 350, 'platform2'); //middle
  platforms.create(100, 200, 'platform'); //top l
  platforms.create(0, 350, 'platform2'); //middle l
  platforms.create(600, 350, 'platform2'); //middle r
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}
function createPoison(left, top, image) {
  var item2 = poison.create(left, top, image);
  item2.animations.add('spin');
  item2.animations.play('spin', 10, true);
}


// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}
function createVenom(){
  poison1 = game.add.physicsGroup();
  var poison = poison1.create(720, 420, 'poison');
  poison.animations.add('spin');
  poison.animations.play('spin', 10, true);
}


// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  
  currentScore = currentScore + 10;

  if (currentScore === winningScore) {
      createBadge();
      createVenom();
  }
}
function poisonHandler(player, poison) {
 if(won ==  true){

 }else{ poison.kill();
  currentLive = currentLive - 1; 
    if(currentLive == 0){
      looser.text = "YOU DIED";
      player.kill();
      
    }
 }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5dB1ad';
    
    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform2', 'platform_2.png');
    
    //Load spritesheets
   // game.load.spritesheet('player', 'chalkers.png', 48, 62);
    game.load.spritesheet('player', 'mikethefrog.png', 32, 32);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison', 'poison.png', 32, 32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();
    

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    text2 = game.add.text(670, 16, "LIVES: " + currentLive, { font: "bold 24px Arial", fill: "white" });
    looser = game.add.text(game.world.centerX, 300, "", { font: "bold 48px Arial", fill: "Red" });
    looser.anchor.setTo(0.5, 1);
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    text2.text = "LIVES: " + currentLive;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, poison, poisonHandler);
    game.physics.arcade.overlap(player, poison1, poisonHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
    
  } 

  function render() {

  }

};
