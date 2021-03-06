var Scrabble = function() {};

Scrabble.prototype = {
  score: function(word) {
    var values = {
      a: 1,
      e: 1,
      i: 1,
      o: 1,
      u: 1,
      l: 1,
      n: 1,
      r: 1,
      s: 1,
      t: 1,
      d: 2,
      g: 2,
      b: 3,
      c: 3,
      m: 3,
      p: 3,
      f: 4,
      h: 4,
      v: 4,
      w: 4,
      y: 4,
      k: 5,
      j: 8,
      x: 8,
      q: 10,
      z: 10
    };
    var score = 0;
    word = word.toLowerCase();
    for (i = 0; i < word.length; i++) {
      letter = word[i];
      score += values[letter];
    }
    if (word.length >= 7) {
      score += 50;
    }
    return score;
  },

  highestScoreFrom: function(arrayOfWords) {
    var highestWord = arrayOfWords[0];
    var highestScore = this.score(arrayOfWords[0]);

    for (var i = 1; i < arrayOfWords.length; i++) {
      var currentWord = arrayOfWords[i];
      var currentWordScore = this.score(currentWord);

      if (currentWordScore > highestScore) {
        highestScore = currentWordScore;
        highestWord = currentWord;
      } else if (currentWordScore == highestScore){
          if ((currentWord.length == 7 && highestWord.length < 7) || currentWord.length < highestWord.length) {
            highestWord = currentWord;
            highestScore = currentWordScore;
          }
      }
    }
  return highestWord;
  }
};

var Player = function(name) {
  this.name = name;
  this.plays = [];
  this.hand = [];
};

Player.prototype = {
  play: function(word) {
    if (this.hasWon()) {
      return false;
    } else {
      // For each index (letter) in playing word, try to find the index of that letter in hand.
      for (var i = 0; i < word.length; i++) {
        var letter = word[i].toLowerCase();
        var letterIndex = this.hand.indexOf(letter);
        if (letterIndex === (-1)) {
          return ("You do not have a'" + letter + "' in your hand to play.");
        } else {
          this.hand.splice(letterIndex, 1);
        }
      }
      this.plays.push(word);
    }
  },
  totalScore: function() {
    var wordsPlayed = this.plays;
    var total = 0;
    // iterate through words played
    for (var i = 0; i < wordsPlayed.length; i++) {
      // add up score
      // DOING THIS B/C Score is only avail to game.  Does it matter?
      myGame = new Scrabble();
      total += myGame.score(wordsPlayed[i]);
    }
    // returns total
    return total;
  },
  hasWon: function() {
    if (this.totalScore > 100) {
      return true;
    } else {
      return false;
    }
  },
  highestScoringWord: function() {
    var myGame = new Scrabble();
    return myGame.highestScoreFrom(this.plays);
  },
  highestWordScore : function() {
    var myGame = new Scrabble();
    var word = myGame.highestScoreFrom(this.plays);
    return myGame.score(word);
  }
};

var TileBag = function() {
  this.startingTiles = ["J", "K", "Q", "X", "Z", "B", "B", "C", "C", "F", "F", "H", "H", "M", "M", "P", "P", "V", "V", "W", "W", "Y", "Y", "G", "G", "G", "D", "D", "D", "D", "L", "L", "L", "L", "S", "S", "S", "S", "U", "U", "U", "U", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "T", "T", "T", "T", "T", "T", "O", "O", "O", "O", "O", "O", "O", "O", "A", "A", "A", "A", "A", "A", "A", "A", "A", "I", "I", "I", "I", "I", "I", "I", "I", "I", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"];
  this.availableTiles = [];
};

TileBag.prototype = {
  startGame: function() {
    var array = this.startingTiles;
    var counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter].toLowerCase();
        array[counter] = array[index].toLowerCase();
        array[index] = temp;
    }
    this.availableTiles = array;
  },
  drawTiles: function(number, player) {
    var selectedTiles = [];
    if (number > 7 || (player.hand.length + number > 7)) {
      return "You may only have seven tiles in your hand";
    } else if (this.availableTiles.length === 0) {
      return "There are no more tiles";
    } else {
      for (var i = 0; i < number; i++) {
        var tile = this.availableTiles.pop();
        selectedTiles.push(tile);
        player.hand.push(tile);
      }
    }
    return selectedTiles;
  }
};

// testing Scrabble
var test = new Scrabble();
console.log(test.score("zox"));
console.log(test.score("exlax"));
console.log(test.score("Boooooo"));
console.log(test.score("Buuuuuu"));

// should return shortest highest word - zooz
console.log(test.highestScoreFrom(["exlax", "zooz"]));

// if highest word is tie and both have 7 letters, return first booooo.
console.log(test.highestScoreFrom(["Boooooo", "Buuuuuu"]));

// testing Player
var lynn = new Player("Lynn");
console.log(lynn.name);

lynn.hand = ["d", "o", "g", "z", "o", "o"];
console.log(lynn.hand);

// test plays & total score
console.log(lynn.plays);
console.log(lynn.totalScore());
lynn.play("dog");
console.log(lynn.hand);
console.log(lynn.plays);
console.log(lynn.totalScore());
lynn.play("ZOO");
console.log(lynn.plays);
console.log(lynn.totalScore());

lynn.hand = ["z", "a", "a", "a", "a", "a"];
lynn.play("zaaaaaa");
console.log(lynn.plays);
console.log(lynn.totalScore());

// test highestScoringWord
console.log("HIGHEST SCORING WORD: " + lynn.highestScoringWord());
console.log("HIGHEST SCORING WORD SCORE: " + lynn.highestWordScore());

lynn.hand = ["z", "o", "o", "o", "o", "o"];
lynn.play("zoooooo");
console.log(lynn.plays);
console.log(lynn.totalScore());

// test highestScoringWord - should still be zaaaaaa
console.log("HIGHEST SCORING WORD: " + lynn.highestScoringWord());
console.log("HIGHEST SCORING WORD SCORE: " + lynn.highestWordScore());

// test has won?
console.log(lynn.hasWon());

// Should not allow me to play this b/c don't have tiles.
console.log(lynn.play("Pretty"));

// test has won when score is over 100
Player.prototype.totalScore = 120;
console.log(lynn.hasWon());
// shouldn't be allowed to play a word now
console.log(lynn.play("zoo"));

// testing TileBag
var myBag = new TileBag();
console.log(myBag.availableTiles);

// Should shuffle tiles and put them in availableTiles
myBag.startGame();
console.log(myBag.availableTiles.length);

console.log(myBag.drawTiles(3, lynn));
console.log(myBag.availableTiles.length);

// should not allow me to draw b/c 3 + 5 > 7.
console.log(myBag.drawTiles(5, lynn));

console.log(lynn.hand);

// should work ok.
console.log(myBag.drawTiles(4, lynn));
// should not allow me to draw b/c I already have 7 tiles.
console.log(myBag.drawTiles(1, lynn));
console.log(lynn.hand);

module.exports = Scrabble;
