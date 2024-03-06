'use strict';

let musclesOwned = 0;
let muscleCost = 10;
let siblingsOwned = 0;
let siblingCost = 40;
let muffins = 0;
let previousTime = 0;
let previousMuscleCostComparison = false;
let previousSiblingCostComparison = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

let gameLoop;


function start() {
    gameLoop = setInterval(main, 100);
}

function main() {
    checkCosts();
    siblingLabour();

    updateTime();

    if (muffins >= 2000) {win();}
}

function win() {

    clearInterval(gameLoop);
    
    document.getElementById('muffin-button').disabled = true;
    document.getElementById('muscle-button').disabled = true;
    document.getElementById('sibling-button').disabled = true;

    document.getElementById('win-header').style.display = 'flex';

    document.getElementById('final-time-header').style.display = 'flex';

    document.getElementById('final-time-header').innerText = 'Your time: ' + hours + ':' + minutes + ':' + seconds;
}

function updateTime() {

    seconds = (seconds + 0.1) % 60;

    seconds = Math.round(seconds * 10) / 10;

    if (!seconds) {
        minutes = (minutes + 1) % 60;

        if (!minutes) {
            hours = (hours + 1) % 60;1
        }
    }

    

    document.getElementById('timer').innerText = 'Time: ' + hours + ':' + minutes + ':' + seconds;

}

function checkCosts() {

    let muscleCostComparison = muffins >= muscleCost;
    let siblingCostComparison = muffins >= siblingCost;

    if (muscleCostComparison != previousMuscleCostComparison) {

        let muscleButton = document.getElementById('muscle-button');
        
        if (muscleCostComparison) {
            muscleButton.style.backgroundColor = 'darkgray';
            muscleButton.style.cursor = 'pointer';
            muscleButton.disabled = false;
        } else {
            muscleButton.style.backgroundColor = 'gray';
            muscleButton.style.cursor = 'default';
            muscleButton.disabled = true;
        }

        muscleButton.style.color = 'black';

        previousMuscleCostComparison = !previousMuscleCostComparison;
    }

    if (siblingCostComparison != previousSiblingCostComparison) {

        let siblingButton = document.getElementById('sibling-button');

        if (siblingCostComparison) {
            siblingButton.style.backgroundColor = 'darkgray';
            siblingButton.style.cursor = 'pointer';
            siblingButton.disabled = false;
        } else {
            siblingButton.style.backgroundColor = 'gray';
            siblingButton.style.cursor = 'default';
            siblingButton.disabled = true;
        }

        siblingButton.style.color = 'black';

        previousSiblingCostComparison = !previousSiblingCostComparison;
    }
}

function addMuffin() {
    muffins += 1 + musclesOwned;

    updateText();
}

function addMuscle() {
    musclesOwned++;

    muffins -= muscleCost;

    muscleCost = Math.round(muscleCost * 1.3);

    updateText();
}

function addSibling() {
    siblingsOwned++;

    muffins -= siblingCost;

    siblingCost += 10;

    updateText();
}

function siblingLabour() {

    previousTime = (previousTime + 1) % 10;

    if (!previousTime) {
        muffins += siblingsOwned;
        updateText();
    }
}

function updateText() {
    document.getElementById('muffins-owned').innerText = 'Muffins: ' + muffins;

    document.getElementById('muscles-owned').innerText = 'Muscles owned: ' + musclesOwned;

    document.getElementById('muscle-cost').innerText = 'Muscle cost: ' + muscleCost + ' muffins';

    document.getElementById('siblings-owned').innerText = 'Siblings owned: ' + siblingsOwned;

    document.getElementById('sibling-cost').innerText = 'Sibling cost: ' + siblingCost + ' muffins';
}