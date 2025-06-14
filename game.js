const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DIFFICULTY ={
    EASY: 10,
    MEDIUM: 5,
    HARD: 3
}

const DIFFICULTY_NAMES = {
    1: 'Easy',
    2: 'Medium',
    3: 'Hard'
};

const DIFFICULTY_VALUES = {
    1: DIFFICULTY.EASY,
    2: DIFFICULTY.MEDIUM,
    3: DIFFICULTY.HARD
};

function ask(question) {
    return new Promise(resolve => 
        rl.question(question,resolve)); 

}

async function main() {
    console.log("Welcome to the Number Guessing Game!");
    console.log("I'm thinking of a number between 1 and 100.");

    console.log("Please select the difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)\n");

    let difficultyChoice;
    while (true) {
        difficultyChoice = await ask("Enter your choice: ");
        if (["1", "2", "3"].includes(difficultyChoice)) break;
        console.log("Invalid choice. Please enter 1, 2, or 3.");
    }

    const chances = DIFFICULTY_VALUES[difficultyChoice];
    const difficultyName = DIFFICULTY_NAMES[difficultyChoice];
    console.log(`\nGreat! You have selected the ${difficultyName} difficulty level.`);
    console.log(`You have ${chances} chances to guess the correct number.\nLet's start the game!\n`);

    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let won = false;

    while (attempts < chances) {
         const guessInput = await ask("Enter your guess: ");
        const guess = Number(guessInput);

        if(isNaN(guess) || guess < 1 || guess > 100) {
            console.log("Invalid input. Please enter a number between 1 and 100.");
            continue;
        }

        attempts++;

        if (guess === secretNumber) {
             console.log(`Congratulations! You guessed the correct number in ${attempts} attempt${attempts > 1 ? 's' : ''}.`);
            won = true;
            break;
        } else if (guess < secretNumber) {
            console.log(`Incorrect! The number is greater than ${guess}.`);
        } else {
            console.log(`Incorrect! The number is less than ${guess}.`);
        }
    }

    if (!won) {
        console.log(`Sorry! You've used all your chances. The correct number was ${secretNumber}.`);
    } 

    rl.close();
}

main();