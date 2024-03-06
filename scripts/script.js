'use strict';

// variables for cost and quantity info
let muffins = 0;
let musclesOwned = 0;
let muscleCost = 10;
let siblingsOwned = 0;
let siblingCost = 40;

let previousTime = 0; // stores the interval since the last time sibling labour was performed
let previousMuscleCostComparison = true; // stores the value of the previous muscle cost and muffin count comparison
let previousSiblingCostComparison = true; // stores the value of the previous sibling cost and muffin count comparison

// variables to store the time passed
let seconds = 0;
let minutes = 0;
let hours = 0;

// variable for the game loop
let gameLoop;

// function that gets called when the webpage loads
function start() {
    
    // start looping with an interval of 0.1 seconds
    gameLoop = setInterval(main, 100);
}

// main game loop
function main() {
    
    // call cost checking function
    checkCosts();

    // call sibling labour function
    siblingLabour();

    // call function to update time
    updateTime();

    // check if the player has more than 2000 muffins, and call the win function if true
    if (muffins >= 2000) {win();}
}

// function that gets called when the user wins
function win() {

    // stop the game loop
    clearInterval(gameLoop);
    
    // disable the buttons
    document.getElementById('muffin-button').disabled = true;
    document.getElementById('muscle-button').disabled = true;
    document.getElementById('sibling-button').disabled = true;

    // display the win header
    document.getElementById('win-header').style.display = 'flex';

    // display and update the time header
    document.getElementById('final-time-header').style.display = 'flex';
    document.getElementById('final-time-header').innerText = 'Your time: ' + hours + ':' + minutes + ':' + seconds;
}

// function to update the time passed
function updateTime() {

    // incrament seconds by 0.1, and go back to 0 when 60 seconds have passed
    seconds = (seconds + 0.1) % 60;

    // round to one decimal place because javascript is stupid
    seconds = Math.round(seconds * 10) / 10;

    // check if the seconds have been reset to 0
    if (!seconds) {

        // incrament minutes by 1 every time 60 seconds have passed, and go back to 0 after 60 minutes
        minutes = (minutes + 1) % 60;

        // check if the minutes have been reset to 0
        if (!minutes) {

            // incrament hours by 1 every time 60 minutes have passed
            hours++;
        }
    }

    // update timer header
    document.getElementById('timer').innerText = 'Time: ' + hours + ':' + minutes + ':' + seconds;

}

// function to check if the user has enough muffins to buy muscles or siblings
function checkCosts() {

    // compare costs and store the boolean value in a variable
    let muscleCostComparison = muffins >= muscleCost;
    let siblingCostComparison = muffins >= siblingCost;

    // compare the current muscle comparison result to the previous muscle comparison result
    if (muscleCostComparison != previousMuscleCostComparison) {

        // store the reference to the muscle button html element
        let muscleButton = document.getElementById('muscle-button');
        
        // check if the user has enough muffins to buy a muscle or not
        if (muscleCostComparison) {

            // update button data to show that the user can buy a muscle
            muscleButton.style.backgroundColor = 'darkgray';
            muscleButton.style.cursor = 'pointer';
            muscleButton.disabled = false;
        } else {

            // update button data to show that the user can not buy a muscle
            muscleButton.style.backgroundColor = 'gray';
            muscleButton.style.cursor = 'default';
            muscleButton.disabled = true;
        }

        // reset the text color since it gets changed when the background color changes
        muscleButton.style.color = 'black';

        // update the previous muscle cost comparison
        previousMuscleCostComparison = !previousMuscleCostComparison;
    }

    // compare the current sibling comparison result to the previous sibling comparison result
    if (siblingCostComparison != previousSiblingCostComparison) {

        // store the reference to the sibling button html element
        let siblingButton = document.getElementById('sibling-button');

        // check if hte user has enough muffins to buy a sibling or not
        if (siblingCostComparison) {

            // update button data to show that the user can buy a sibling
            siblingButton.style.backgroundColor = 'darkgray';
            siblingButton.style.cursor = 'pointer';
            siblingButton.disabled = false;
        } else {

            // update button data to show that the user can not buy a sibling
            siblingButton.style.backgroundColor = 'gray';
            siblingButton.style.cursor = 'default';
            siblingButton.disabled = true;
        }

        // reset the text color since it gets changed when the background color changes
        siblingButton.style.color = 'black';

        // update the previous sibling cost comparison
        previousSiblingCostComparison = !previousSiblingCostComparison;
    }
}

// function to add a muffin every time the muffin is clicked
function addMuffin() {

    // increase muffin count by one plus the amount of muscles ownedc
    muffins += 1 + musclesOwned;

    // update the text on the screen
    updateText();
}

// function to add a muscle when the button is clicked
function addMuscle() {

    // increase muscle count by one
    musclesOwned++;

    // deduct muscle cost from muffin count
    muffins -= muscleCost;

    // increase the muscle cost by 30% and round to a whole number
    muscleCost = Math.round(muscleCost * 1.3);

    // update the text on the screen
    updateText();
}

// function to add a sibling when the button is clicked
function addSibling() {

    // increase sibling count by one
    siblingsOwned++;

    // deduct sibling cost from muffin count
    muffins -= siblingCost;

    // increase the sibling cost by 10
    siblingCost += 10;

    // update the text on the screen
    updateText();
}

// function to perform sibling labour
function siblingLabour() {

    // incrament the previous time counter by 0.1 seconds, and go back to 0 when 1 second has passed
    previousTime = (previousTime + 1) % 10;

    // check if the previous time counter has been reset to 0
    if (!previousTime) {

        // increase muffin count by the number of siblings owned
        muffins += siblingsOwned;

        // update the text on the screen
        updateText();
    }
}

// function to update the text on the screen
function updateText() {

    // update the muffins owned
    document.getElementById('muffins-owned').innerText = 'Muffins: ' + muffins;

    // update the muscles owned
    document.getElementById('muscles-owned').innerText = 'Muscles owned: ' + musclesOwned;

    // update the muscle cost
    document.getElementById('muscle-cost').innerText = 'Muscle cost: ' + muscleCost + ' muffins';

    // update the siblings owned
    document.getElementById('siblings-owned').innerText = 'Siblings owned: ' + siblingsOwned;

    // update the sibling cost
    document.getElementById('sibling-cost').innerText = 'Sibling cost: ' + siblingCost + ' muffins';
}