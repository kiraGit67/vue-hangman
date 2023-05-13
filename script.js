"use strict";

Vue.createApp({
  data() {
    return {
      h1text: "HangMan!",
      h1span: "Let's Play ",
      h2text: "Status",
      h3text: "Fails",
      buttonText: "New Game",
      randomWord: "",
      words: [
        "apiserver",
        "backend",
        "flexbox",
        "frontend",
        "framework",
        "grid",
        "javascript",
        "json",
        "vue",
      ],
      keys: [],
      //triedKeys: [],
      guesses: [],
      fails: 0,
      maxFails: 10,
      hitChars: 0,
      winningScore: 0,
      maxWinningScore: 10,
    };
  },
  created() {
    this.splitAlphabet();
    this.startGame();
  },
  methods: {
    startGame() {
      this.fails = 0;
      //this.triedKeys = [];
      this.randomWord = this.pickRandomWord();
      this.guesses = [];
      this.hitChars = 0;
      this.winningScore = 0;
      this.maxWinningScore = 10;
    },
    pickRandomWord() {
      function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }
      const randomIndex = getRandomNumber(1, this.words.length);
      return this.words[randomIndex - 1];
    },
    guess(letter) {
      if (this.fails === this.maxFails) {
        return;
      }
      /**/
      if (this.guesses.includes(letter)) {
        return;
      }

      this.guesses.push(letter);

      if (!this.randomWord.includes(letter)) {
        this.fails++;
        this.maxWinningScore--;
      } else {
        this.hitChars++;
      }
    },
    splitAlphabet() {
      this.keys = "abcdefghijklmnopqrstuvwxyz".split("");
    },
    isKeyDisabled(letter) {
      return this.guesses.includes(letter);
    },
  },
  computed: {
    randomLetters() {
      const randomArray = this.randomWord.toLowerCase().split("");

      return randomArray.map((randomChar) => {
        if (this.guesses.includes(randomChar)) {
          return randomChar;
        } else {
          return "_";
        }
      });
    },
    gameState() {
      if (
        this.randomWord.split("").reduce((prevChar, currentChar) => {
          if (prevChar === true) {
            return this.guesses.includes(currentChar);
          }
          return false;
        }, true)
      ) {
        //return "win";
        this.winningScore = this.maxWinningScore;
        return {
          text: "Game Won!",
          style: "win",
        };
      }

      if (this.fails < 10) {
        //return "active";
        return {
          text: "Game Active!",
          style: "active",
        };
      }

      if (this.fails >= 10) {
        //return "fail";
        return {
          text: "Game Failed!",
          style: "fail",
        };
      }
    },
    failsStyle() {
      return {
        backgroundColor: `rgba(255, 0, 0, 0.${this.fails})`,
      };
    },
    winStyle() {
      return {
        color: `hsl(120, ${
          this.hitChars * (100 / this.randomWord.length)
        }%, 25%)`,
      };
    },
    /*
    alphabetLetters() {
      const alpharray = [];

      for (let i = 0; i < this.alphabet.length; i++) {
        alpharray.push({
          letter: this.alphabet[i],
          disabled: this.charsPressed.includes(this.alphabet[i]),
        });
      }
      console.log(alpharray);
      return alpharray;

      //return this.alphabet;
      /**
       * {
       *      alphabet: 'a',
       *      disabled: true / false,
       * }
       
    },
    */
  },
}).mount("#app");
