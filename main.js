
let game = {

    init: function () {

        this.symbols = ['X', 'O'];
        this.squares = Array.from(document.querySelectorAll('.square'));
        this.turnIndicator = document.querySelector('.turnIndicator');
        this.button = document.querySelector('.newGame');
        this.board = document.querySelector('.board');

        // sets of the winning square position cominations ->
        this.winningSets = [

            // horizontal 
            [0, 1, 2], [3, 4, 5], [6, 7, 8],

            // vertical 
            [0, 3, 6], [1, 4, 7], [2, 5, 8],

            // diagonal 
            [0, 4, 8], [2, 4, 6]
        ];

        // for squares and button
        this.addEventListeners();

        // game reset
        this.newGame();
    },


    // *Function - squares & button event listeners
    addEventListeners: function () {

        // re-directing 'this' to the game itself (ttt) - instead of the current square
        let ttt = this;

        this.squares.forEach(function (x) {
            x.addEventListener('click', function () {
                ttt.play(this);
            }, false)
        })

        // invoking a new game w/ new game btn
        this.button.addEventListener("click", function () {
            ttt.newGame();
        }, false);
    },


    // *Function - reseting the game
    newGame: function () {

        // set player to first player (X)
        this.activePlayer = 0;

        // reset the gameOver let
        this.gameOver = false;

        // clearing out the squares
        this.squares.forEach(function (x) {
            x.classList.remove(game.symbols[0]);
            x.classList.remove(game.symbols[1]);
        })

        // remove gameOver class from board if it exists
        this.board.classList.remove("gameOver");

        // set the turn indicator (X's turn)
        this.setTurnIndicator();
    },


    // *Function - turn indicator 
    setTurnIndicator: function () {

        this.turnIndicator.innerText = `Current Player: ` + this.symbols[this.activePlayer];
    },


    // *Function - the game 
    play: function (el) {

        // check if square is empty
        if (!this.gameOver && el.classList.length == 1) {

            // set the contents to player's symbol
            el.classList.add(this.symbols[this.activePlayer]);

            // check & say who's the winner 
            if (this.checkWin()) {
                this.turnIndicator.innerText = `Player ` + this.symbols[this.activePlayer] + ` won this one!`;

                // call the game over function
                this.endGame();
            }

            // check if there is a draw
            else if (this.checkDraw()) {
                this.turnIndicator.innerText = `Looks like we have a draw..`;
                this.endGame();
            }

            // set next player's turn
            else {
                // change the turn (0 -> 1 or 1 -> 0)
                this.activePlayer = 1 - this.activePlayer;

                // turn indicator text
                this.setTurnIndicator();
            }
        }
    },


    // *Function - check who won
    checkWin: function () {
        let ttt = this;

        // checking if the curr symbol filled all of the positions
        // of one of the winning pos. combinations
        return this.winningSets.some(function (x) {

            return x.every(function (i) {
                return Array.from(ttt.squares[i].classList)
                    .indexOf(ttt.symbols[ttt.activePlayer]) > -1;
            })
        })
    },


    // *Function - check for draw
    checkDraw: function () {

        // true if every square is filled
        return this.squares.every(function (x) {
            return x.classList.length > 1;
        })
    },


    // *Function - end of the game
    // set the game over let and board class when the game ends
    endGame: function () {
        this.gameOver = true;
        this.board.classList.add('gameOver');
    }

}



// call the init() function of game when the page loads
game.init();









