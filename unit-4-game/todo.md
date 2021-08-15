The player will have to guess the answer, just like in Word Guess. This time, though, the player will guess with numbers instead of letters. 
Here's how the app works:

There will be four crystals displayed as buttons on the page.
The player will be shown a random number at the start of the game.

When the player clicks on a crystal, it will add a specific amount of points to the player's total score. 

Your game will hide this amount until the player clicks a crystal.
When they do click one, update the player's score counter.

The player wins if their total score matches the random number from the beginning of the game.
The player loses if their score goes above the random number.

The game restarts whenever the player wins or loses.

When the game begins again, the player should see a new random number. Also, all the crystals will have four new hidden values. Of course, the user's score (and score counter) will reset to zero.

The app should show the number of games the player wins and loses. To that end, do not refresh the page as a means to restart the game.

Option 1 Game design notes

The random number shown at the start of the game should be between 19 - 120.
Each crystal should have a random hidden value between 1 - 12.
*************************
PSEUDOCODE
CrystalsCollector! orange heading
"Directions: You will be given a random number at the start of the game.
There are four crystals below. By clicking on a crystal you will add a specific amount of points to your total score. 
You win the game by matching your total score to random number, you lose the game if your total score goes above the random number.
The value of each crystal is hidden from you until you click on it.
Each time when the game starts, the game will change the values of each crystal."

Generate random # in top green box
Each gem is also a random generated number.
you must add up to be the random generated number in the green box by clicking the random gem #'s
Show win/lose box
Show total score on bottom
background pattern