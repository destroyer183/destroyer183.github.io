'use strict';

// function that will determine if an array contains an object
function containsObject(object, array) {
    
    // iterate over every element in the array
    for (let i = 0; i < array.length; i++) {

        // check if the current element matdhes the object
        if (array[i] === object) {

            // return true if object matches array element
            return true;
        }
    }

    // return false if no matches were found
    return false;
}

// constants for the base window size
const BASE_WIDTH = window.innerWidth;
const BASE_HEIGHT = window.innerHeight;
const BASE_ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT;



// enumeration for the different background images for the arm wrestle challenge
const ArmImages = {
    Lose: 'url("assets/arm wrestle/lose.png")',
    Losing: 'url("assets/arm wrestle/losing.png")',
    Equal: 'url("assets/arm wrestle/equal.png")',
    Winning: 'url("assets/arm wrestle/winning.png")',
    Win: 'url("assets/arm wrestle/win.png")'

};

// object to act as a dictionary to allow variables for the arm wresling challenge to be used globally
const ArmWrestleData = {

    // dictionary item to store the game loop delay (ms)
    loopInterval: 10,

    // dictionary item to store the user's arm strength (hp)
    armStrength: 50,

    // dictionary item to store the current hp drain rate interval (amount of loops before hp is drained by 1)
    drainRate: 10,

    // dictionary item to store the interval (loop amount) at which the drain strength should be increased by 0.1
    drainIncreaseInterval: 300,

    // dictionary item to store the amount of arm strength lost every time it is drained
    drainStrength: 0.5,

    // dictionary item to store the amount of game loops that have passed since the last hp drain
    timeSinceLastDrain: 0,

    // dictionary item to store the time since the last drain rate increase (amount of loops passed)
    timeSinceLastDrainIncrease: 0,

    // dictionary item to store the current arm state to display
    armImage: ArmImages.Equal,

    // variable to act as the game loop
    gameLoop: null
};



// enumeration for the different types of story sections
const TypeOptions = {
    Normal: 'normal',
    Quiz: 'quiz',
    ArmWrestle: 'arm wrestle'
};

// large object to act as a dictionary to allow variables to be used globally regardless of where they are used, and to store all data for the story
const StoryData = {

    // dictionary item to store the current choicepath
    choicePath: '',

    // dictionary item to store the current page number
    pageNumber: 0,

    // dictionary item to store a bool to determine whether or not the choice buttons should be displayed
    displayChoiceButtons: false,

    // dictionary item to store the current story data that has been loaded
    currentData: '',

    // dictionary item to store the text from all the pages that have been loaded
    allPages: [],

    // dictionary item to represent the template for the following dictionaries that represent each section of the story
    Template: {

        // dictionary item to store the text that will be displayed
        text: ['', '', '', '', ''],

        // dictionary item to store the possible choice options that the user can select
        choiceText: ['', '', '', '', ''],

        // dicionary item to store the question data for the quiz challenges
        questions: ['', '', '', '', ''],

        // dicitonary item to store the solution data for the quiz challenges
        solutions: ['', '', '', '', ''],

        // dictionary item to store an enumeration value to represent what type of information is being loaded (normal text, or a type of challenge)
        sectionType: TypeOptions.Normal,

        // dictionary item to hold text for if the user gets a winning story ending or sucessfully completes a challenge
        win: '',

        // dictionary item to hold text for if the user gets a losing story ending or fails a challenge
        lose: ''
    },

    '': {
        text: [
            'BEEP BEEP BEEP you hear. It\'s 8am, and the sound of your alarm clock has woken you up on Monday for school. You get up, get dressed and cleaned up, and then you eat and get on the bus to go to school.',
            'After you get to school and get to math class, you realize that you forgot to do your homework, as you played video games all weekend.',
            'You know that your teacher and parents hate it when homework isn\'t done, and as the teacher is coming around checking homework, you start panicking, as you don\'t know what to do.',
            'This is your first choice, and it will decide how the story continues from this point on. Choose wisely.'
        ],
        choiceText: [
            'Tell the teacher your dog ate your homework', 
            'Tell the teacher the truth', 
            'Tell the teacher that you didn\'t do the homework because it was too easy', 
            'Fight the teacher', 
            'Mystery'
        ],
        sectionType: TypeOptions.Normal,
    },

    '1': {
        text: [
            'Teacher: \"Your dog didn\'t eat your homework.\"\nYou: \"I assure you, he did.\"',
            'Teacher: \"That\'s impossible! The homework was online! Dogs don\'t eat computers! You\'ve made me really angry now. I\'m calling your parents!\"',
            'After realizing your mistake, you start thinking about what you will do. do you:'
        ],
        choiceText: [
            'Accept the punishment', 
            'Fight the teacher', 
            'Tell the teacher you can prove you did your homework by answering homework questions', 
            'Mystery',
            ''
        ],
        sectionType: TypeOptions.Normal
    },

    '11': { 
        text: ['The teacher called your parents. When you get home, You are scolded and sent to your room while they think of a punishment. What will you do?'],
        choiceText: [
            'Accept the punishment',
            'Fight your parents',
            'Mystery',
            '', ''
        ],
        sectionType: TypeOptions.Normal
    },

    '111': {
        text: [
            'You choose to accept the punishment. You are grounded for a month with your devices taken away for 2 months.',
            'You get too bored from not having your computer for so long, and so you die.\nYOU LOSE'
        ],
        choiceText: ['', '', '', '', ''],
        sectionType: TypeOptions.Normal
    },

    '112': {
        text: [
            'Parents: \"We\'re so dissapointed in you. Now that we\'ve had time to think about what we will do, we will be grounding you for a month and taking away your computer for 2.\"',
            'Horrified at the thought of this, you decide that you will fight your parents for your freedom. You: \"I won\'t let you do that! Not without a fight!\"',
            'Dad: \"Even if you want to fight, I\'m not actually going to fight. Let\'s settle this with an arm wresle.\"'
        ],
        choiceText: [
            'Fight',
            'Don\'t fight',
            '', '', ''
        ],
        sectionType: TypeOptions.Normal
    },

    '1121': {
        text: ['Click anywhere as fast as you can to overpower your dad.\nThe longer the battle goes on, the stronger he gets.'],
        choiceText: ['', '', '', '', ''],
        sectionType: TypeOptions.ArmWrestle,
        win: 'You sucessfully overpower your dad, and gain the most influence and power in your family.\nYOU WIN',
        lose: 'You get overpowered by your dad, and as a result, you get grounded for two months, and you lose your devices for 4 months.\nYOU LOSE'
    },

    '1122': {
        text: ['You choose to accept the punishment. Your dad sneers at you, and says: \"Good choice. You wouldn\'t want to fight me. You are grounded for a month, and your devices will be taken away for 2 months.\"\nYOU LOSE'],
        choiceText: ['', '', '', '', ''],
        sectionType: TypeOptions.Normal
    },

    '113': {
        text: [
            'In a hurry, you flee from the country and go to the USA. When you get past the border, you rent an apartment, enroll in a new school, and start a new life.',
            'A few weeks into school, you forget your homework again. This seems familiar...',
            'YOU LOSE'
        ],
        choiceText: ['', '', '', '', ''],
        sectionType: TypeOptions.Normal
    },

    '12': {
        text: [
            'You: \"Get ready, because I\'m about to fight you.\"',
            'Teacher: \"Well this is my class, so you\'re fighting by my rules! Math battle!\"'
        ],
        choiceText: [
            'Accept fight',
            'Refuse fight',
            'Mystery',
            '', ''
        ],
        sectionType: TypeOptions.Normal
    },

    '121': {
        text: [
            'You choose to accept the fight. But what the teacher doesn\'t know is that you were lying about accepting it on his terms.',
            'You start attacking the teacher, catching him off guard. Since he is old, you easily win the fight.',
            'However, the school board ends up finding out about this, and you are expelled.'
        ]
    },

    '123': {
        text: [
            'You throw your desk at your teacher. It hits him really hard, knocking him over with a yelp of pain. ',
            'When the ambulance comes, you find out you broke some of his ribs.'
        ],
    },

    '13': {
        text: [
            'You: \"I can prove that I did my homework, and that my dog actually ate my computer, even though I don\'t have my computer.\"\nTeacher: \"And how will you do that?\"',
            'You: \"By answering some questions from the homework.\"\nTeacher: \"Haha. Good luck.\"'
        ],
        questions: [
            '1.\nIf you pick 4 points at random \non the surface of a sphere,\nand draw lines connecting them all\ntogether, making a 3D shape,\nwhat is the probability that the\ncenter of the circle will\nbe within the shape?',
            '2.\nSolve: 2 x^2y^11 + 3xy^1 - 15y = 0,\ny(1) = 0 y^1 (1) = 1',
            '3.\nWhat property of the universe is\nresponsible for making things near\nblack holes experience time slower?',
            '', ''
        ],
        solutions: [
            '1/8',
            'y(x) = 0.2x^2.5 - 0.2x^-3',
            'Mass warping space time',
            'e', 'e'
            // the reason I've put text in the last two solutions is because the text boxes that coorespond to these two can't be typed in, 
            // and so this prevents the user from getting a correct answer evaluation from text box that isn't displayed.
            // the contents of the text box won't be able to equal the solution.
        ],
        sectionType: TypeOptions.Quiz,
        win: 'You cheated. YOU LOSE',
        lose: 'Teacher: \"You lied! You didn\'t do your homework! I\'m calling your parents to tell them you lied to my face about doing your homework.\"'
    },

    '14': {
        text: [
            'You take your chewed up, bent and broken computer of your bag. The teacher stares at it in confusion and awe for a moment, before speaking.',
            'Teacher: \"Wow. Your dog really did eat your homework. I didn\'t think that was possible. Sorry for the misunderstanding.\"',
            'You don\'t get in trouble for not doing your homework, since you couldn\'t do it.\nYOU WIN'
        ],
        choiceText: ['', '', '', '', ''],
        sectionType: TypeOptions.Normal
    },

    '2': {
        text: [
            'Teacher: \"Well then how prepared are you for todays pop quiz?\"',
            'You realize that you don\'t know the stuff on the homework, meaning you will most likely fail the quiz. What will you do?'
        ],
        choiceText: [
            'Attempt the quiz',
            'Try to cheat on the quiz',
            'Fight the teacher',
            'Mystery',
            ''
        ],
        sectionType: TypeOptions.Normal
    },

    '21': {
        text: ['You try the quiz. You fail the quiz since you didn\'t understand the contents of it since you didn\'t do your homework. Your parents find out.']
    },

    '22': {
        text: [
            'You try to cheat on the quiz by looking over at peope around you. When you finish the quiz, you think that you did pretty good, and you go to hand it to the teacher.',
            'As soon as you hand it to the teacher, he rips it up in front of you. Teacher: \"I know you cheated! I saw you looking over at people all around you for answers. I dont need to look at this to determine your mark. It\'s a 0.\"'
        ]
    },

    '23': {
        text: [
            'You: \"Get ready, because I\'m about to fight you.\" Teacher: \"Well this is my class, so you\'re fighting by my rules! Math battle!\"',
            'Being the idiot you are, you blindly accept the fight, thinking you will be fine. The teacher hands you a pencil and paper, and hands you the quiz paper.',
            'Teacher: \"The rules are simple. You just have to get at least 3 correct answers, and you win.\"'
        ],
        questions: [
            '1.\nSquare the number 392.',
            '2.\nSolve: a^2 + b^2 = 1\nc^2 + d^2 = 2\n(ac + bd)^2 + (ad - bc)^2 = ?',
            '3.\nCalculate the minimum number of turns\nneeded to solve every possible scramble\non a standard 3x3x3 rubiks cube.',
            '4.\nx = 1, y = 10\nSolve:\ndy / dx = (10x - 1) / (4 + 3y^2)',
            '5.\nk = 33,\nSolve for x, y, z:\nx^3 + y^3 + z^3 = k'
        ],
        solutions: [
            '153664',
            '2',
            '20',
            '5x^2 - y^3 = 4y + x + A',
            '\nX = -80538738812075974\nY = 80435758145817515\nZ = 12602123297335631'
        ],
        sectionType: TypeOptions.Quiz,
        win: 'You cheated.\nYOU LOSE',
        lose: 'Teacher: Looks like you lose. I wonder why. Your parents will be finding out soon.'
    },

    '24': {
        text: [
            'You: \"Actually, I\'m going to give you a quiz. And if you fail, I\'m going to tell the school board that you aren\'t good enough at math to teach this class.\"',
            'Teacher: \"No thanks. In my own classroom, you can\'t make me do anything, so I don\'t have to do your quiz. However, you have to do mine, or I will assume you didn\'t do your homework.\"'
        ],
        choiceText: [
            'Take the quiz',
            'Don\'t take the quiz',
            '', '', ''
        ],
        sectionType: TypeOptions.Normal
    },

    '241': {
        text: ['You choose to take the teachers quiz.'],
        questions: [
            '1.\nIf you pick 4 points at random \non the surface of a sphere,\nand draw lines connecting them all\ntogether, making a 3D shape,\nwhat is the probability that the\ncenter of the circle will\nbe within the shape?',
            '2.\nSolve: 2 x^2y^11 + 3xy^1 - 15y = 0,\ny(1) = 0 y^1 (1) = 1',
            '3.\nWhat property of the universe is\nresponsible for making things near\nblack holes experience time slower?',
            '', ''
        ],
        solutions: [
            '1/8',
            'y(x) = 0.2x^2.5 - 0.2x^-3',
            'Mass warping space time',
            'e', 'e'
        ],
        sectionType: TypeOptions.Quiz,
        win: 'You cheated.\nYOU LOSE',
        lose: 'Teacher: \"You failed the quiz. I\'m sure your parents will be delighted to hear about this.\"'
    },

    '3': {
        text: [
            'Teacher: \"Oh, well that\'s good. Then I assume that you wlll be able to ace the pop quiz today, because if you don\'t, your parents will be delighted to hear that you didn\'t do your homework and failed a quiz because of it.\"',
            'After realizing what you\'ve gotten yourself into, you must now choose what you will do.'
        ],
        choiceText: [
            'Attempt the quiz',
            'Fight the teacher',
            'Mystery',
            '', ''
        ],
        sectionType: TypeOptions.Normal
    },
    
    '31': {
        text: ['You choose to attempt the quiz.'],
        questions: [
            '1.\nSolve: 6 / 2(1 + 2)',
            '2.\n1 + 4 = 5\n2 + 5 = 12\n3 + 6 = 21\n8 + 11 = ?',
            '3.\nSolve for x: 3x = (5 + (4^2 + 6^2)) - 5(5! -3)',
            '', ''
        ],
        solutions: [
            '9',
            '96',
            '-176',
            'e', 'e'
        ],
        sectionType: TypeOptions.Quiz,
        win: 'Teacher: \"Wow. You really are smart enough to ace the quiz without doing homework. Sorry for bothering you.\"\nYOU WIN',
        lose: 'Teacher: \"Well well well. You didn\'t pass the quiz. I wonder why. I think your parents will be interested to hear about this.\"'
    },

    '32': {
        text: [
            'You: \"Get ready, because I\'m about to fight you.\"',
            'Teacher: \"Well this is my class, so you\'re fighting by my rules! Math battle!\"'
        ],
        choiceText: [
            'accept fight',
            'refuse fight',
            'mystery'
        ],
        sectionType: TypeOptions.Normal
    },

    '321': {
        text: ['Teacher: \"The rules are simple. I\'m going to give you a quiz, and you have to get at least 3 correct answers to win.\"'],
        questions: [
            '1.\nFind the square root of x:\n3x = 6(5! - 3) - ((3^3)6 - (5! - 6^2) - (6^2))',
            '2.\nSquare the number 392.',
            '3.\nSimplify:\n(x + 5y)^2',
            '4.\nFactor:\n3x^2 - 8x - 3',
            '5.\nFactor fully:\n4(x^2 + 10x + 25) - 4x^2 - 24x - 36'
        ],
        solutions: [
            '14',
            '153664',
            'x^2 + 10xy + 25y^2',
            '(x - 3) (3x + 1)',
            '16(x + 4)'
        ],
        sectionType: TypeOptions.Quiz,
        win: 'Teacher: \"Well, you win. I guess you didn\'t need to do your homework.\"\nYOU WIN',
        lose: 'Teacher: \"Looks like you lose. I guess you should\'ve done your homework. Your parents will be finding out soon.\"'
    },

    '322': {
        text: ['Teacher: \"Well then I\'m going to phone your parents and tell them about this.\"']
    },

    '33': {
        text: [
            'You: \"Actually, I\'m going to give you a quiz. And if you fail, I\'m going to tell the school board that you aren\'t good enough at math to teach this class.\"',
            'Teacher: \"And if I ace the quiz, I get to fail you for this class.\"'
        ],
        choiceText: [
            'Deal',
            'No deal'
        ],
        sectionType: TypeOptions.Normal
    },

    '323': {
        text: [
            'You choose to beat up the teacher with your fists. Since he is in his fifties and you are a teen, you easily overpower him and beat him.',
            'However, the school board ends up finding out, and you get expelled.'
        ]
    },

    '331': {
        text: [
            'You: \"Deal.\"',
            'The teacher, who underestimated the size of your brain, ended up completely failing the quiz.\nYou: \"Well I wonder what the school board will do when they hear about this.\"',
            'The school board ended up punishing the teacher, however the punishments were not disclosed to the school. The teacher still has his job, so the board probably lowered his salary.\nYOU WIN'
        ],
        choiceText: ['', '', '', '', ''],
        sectionType: TypeOptions.Normal
    },

    '332': {
        text: ['Teacher: \"Well then I\'m going to tell your parents about what has happened here as you have wasted too much of my time for this to continue.\"']
    },

    '4': {
        text: [
            'You: \"Get ready, because I\'m about to fight you.\"',
            'Teacher: \"Well this is my class, so you\'re fighting by my rules! Math battle!\"',
            'Unsure about whether or not you can beat your teacher at his own game, you think about what you will do'
        ],
        choiceText: [
            'Accept fight',
            'Refuse fight',
            'Run away',
            'Mystery',
            ''
        ],
        sectionType: TypeOptions.Normal
    },

    '41': {
        text: [
            'You: \"I accept.\"',
            'Teacher: \"The rules are simple. I\'m going to give you a quiz, and you just have to get at least 3 correct answers to win.\"'
        ],
        questions: [
            '1.\nFind the square root of x:\n3x = 6(5! - 3) - ((3^3)6 - (5! - 6^2) - (6^2))',
            '2.\nSquare the number 392.',
            '3.\nSimplify:\n(x + 5y)^2',
            '4.\nFactor:\n3x^2 - 8x - 3',
            '5.\nFactor fully:\n4(x^2 + 10x + 25) - 4x^2 - 24x - 36'
        ],
        solutions: [
            '14',
            '153664',
            'x^2 + 10xy + 25y^2',
            '(x - 3) (3x + 1)',
            '16(x + 4)'
        ],
        sectionType: TypeOptions.Quiz,
        win: 'Teacher: \"Well, you win. I guess you didn\'t need to do your homework.\"\nYOU WIN',
        lose: 'Teacher: \"Looks like you lose. I guess you should\'ve done your homework. Your parents will be finding out soon.\"'
    },

    '43': {
        text: ['You run away. After realizing you can\'t just sleep on the road, you go back home to angry parents.']
    },

    '44': {
        text: [
            'You choose to beat up the teacher instead of playing his math game. As a strong teen, you easily beat up your math teacher who is an old man.',
            'However, the school board finds out about this and you are expelled.'
        ]
    },

    '5': {
        text: [
            'You noclip through the floor into the worst possible backrooms floor, a massive ocean filled with man-eating monsters.',
            'You tread water until every muscle in your body runs out of strengh, and then you sink down to the monsters and get eaten alive.',
            'YOU DIE'
        ],
        choiceText: ['', '', '', '', ''],
        sectionType: TypeOptions.Normal
    },
};

// function that is called when the user clicks the button to begin the story
function beginStory() {

    // hide start button
    document.getElementById('start-button').style.display = 'none';

    // unhide page change buttons
    document.getElementById('page-buttons').style.display = 'flex';

    // call function to load story data
    loadNewInfo();

    // call function to update page change buttons
    changePage(0);

    // run function to display text
    displayText();
}



// function to load new story info into variables
function loadNewInfo() {
    
    // update current story data
    StoryData.currentData = StoryData[StoryData.choicePath];

    // update array of all pages
    StoryData.allPages = StoryData.allPages.concat(StoryData.currentData.text);

    // update variable so that the choice buttons aren't displayed anymore
    StoryData.displayChoiceButtons = false;

    // check if current story section is a quiz challenge
    if (StoryData.currentData.sectionType == TypeOptions.Quiz) {

        // skip the rest of the code in this function to avoid errors
        return;
    }

    // try to load new choice options
    try {

        let choiceButtons = document.getElementsByClassName('choice-button');
        for (let i = 0; i < choiceButtons.length; i++) {
            choiceButtons[i].innerText = StoryData.currentData.choiceText[i];
        }

    // handle error if new choice options can't be loaded
    } catch (error) {

        // print error message
        console.log('couldn\'t load choice text because of the following error: ' + error);
    }
}



// function to determine which challenge is occuring
function challengeSelector() {

    // determine challenge type and run matching function
    switch (StoryData.currentData.sectionType) {

        case TypeOptions.Quiz:
            // the reason this case doesn't have anything it is because the actual quiz detection is in the 'changePage();' function
            // this is because if I don't put this case here, the next case will actually trigger.
            return;

        // case for arm wrestle challenge
        case TypeOptions.ArmWrestle:
            armWrestleSetup();
            return;
    }
}



// function to display the quiz challenge
function quizChallenge() {

    // hide begin button
    document.getElementById('begin-quiz').style.display = 'none';

    // hide choice buttons
    let choiceButtons = document.getElementsByClassName('choice-button');
    for (let button of choiceButtons) {
        button.style.display = 'none';
    }

    // load background image
    document.body.style.backgroundImage = 'url("assets/school desk.jpg")';
    document.body.style.backgroundSize = 'cover';

    // variables to store the base size of the background image
    let imageWidth = 386;
    let imageHeight = 612;
    let imageAspectRatio = imageHeight / imageWidth;

    // calculate what height the page needs to be in order to display the full background image

    // get current page width
    let pageWidth = window.innerWidth;

    // calculate new page height by multiplying the page width by the image aspect ratio
    let newPageHeight = (pageWidth * imageAspectRatio).toString() + 'px';

    // change page height
    document.body.style.height = newPageHeight;

    let widthRatio = BASE_WIDTH / 386;
    let heightRatio = pageWidth * imageAspectRatio / 612;

    // adjust text template location
    document.getElementById('quiz-template').style.left = (100 * widthRatio).toString() + 'px';
    document.getElementById('quiz-template').style.top = (106 * heightRatio).toString() + 'px';

    // adjust text template sizing
    document.getElementById('quiz-template').style.width = (190 * widthRatio).toString() + 'px';


    // change displayed text to load description at the top
    document.getElementById('story-text').innerText = 'Fill out an answer for each question.\nYou need at least 3 correct answers to pass the test.';

    // hide page change buttons
    document.getElementById('page-buttons').style.display = 'none';
    
    // load quiz question text into elements
    let questions = document.getElementsByClassName('question-text');
    for (let i = 0; i < questions.length; i++) {
        questions[i].innerText = StoryData.currentData.questions[i];
    }

    // display quiz questions and answer boxes
    document.getElementById('quiz-template').style.display = 'initial';

    // load date
    let currentDate = '';

    let fullDate = Date().split('');

    for (let i = 0; i < 16; i++) {
        currentDate += fullDate[i];
    }


    document.getElementById('date-text').innerText = 'Date: ' + currentDate;

    // only display a question if there is text to load into it
    // do this using math instead of if statements to make the code cleaner, because who wants five (almost)identical if statements in a row
    // since every quiz challenge section has at least 3 questions, their cooresponding elements will not be included in this, and will always be displayed.
    document.getElementById('question-4').style.display = 'initial'.repeat(+(StoryData.currentData.questions[3] != '')) + 'none'.repeat(+(StoryData.currentData.questions[3] === ''));
    document.getElementById('question-5').style.display = 'initial'.repeat(+(StoryData.currentData.questions[4] != '')) + 'none'.repeat(+(StoryData.currentData.questions[4] === ''));




    // load submit button
    document.getElementById('submit-answers-button').style.display = 'block';

    // submit button will:

    // determine how many correct answers the user submitted
    // change the text boxes to regular text of what the user put into the text box
    // display a green 'correct!', or a red 'incorrect!' and the solution below
    // display 'you pass!' at the bottom if the user got at least 3 correct answers, and 'you fail!' if the user got less than 3 correct answers
    // the 'submit' button will go away, and a 'continue' button will appear

    // when the continue button is pressed:

    // reset all question challenge styles and variables back to their defaults

    // display the win text if the user got at least 3 correct answers
    // display the lose text if the user didn't do enough, and then it will set the choice path to 11, which leads to angry parents
    // display the page change buttons


    return;
}



// function for the submit button to handle the data for the question challenge
function submitAnswers() {

    // load inputs
    let inputs = [];

    // have separate variable store the raw input data
    let inputValues = [];

    // create variable to store the number of correct answers 
    let correctAnswers = 0;

    // get all question boxes
    let questionInputs = document.getElementsByClassName('question-input');

    // loop over every question box
    for (let questionInput of questionInputs) {

        // push value to input array
        inputs.push(questionInput.value);

        // push value to separate array
        inputValues.push(questionInput.value);

        // hide question box
        questionInput.style.display = 'none';
    }

    // replace input values with bool values converted to integers to represent whether or not they are correct
    for (let i = 0; i < inputs.length; i++) {

        // replace input value with comparison output of the input and the correct solution
        inputs[i] = +(inputs[i] == StoryData.currentData.solutions[i]);

        // incrament correct answer count every time a correct answer is found
        if (inputs[i] === 1) {
            correctAnswers++;
        }
    }

    // load question output text
    let questionInputValues = document.getElementsByClassName('question-inputted-answer');

    // loop over every question output text element
    for (let i = 0; i < questionInputValues.length; i++) {
        
        // assign element the cooresponding value
        questionInputValues[i].innerText = inputValues[i];

        // prevent text showing as 'undefined'
        if (inputValues[i] == '') {
            questionInputValues[i].innerText = 'Answer not given';
        }
    }

    // load text to tell the user if they inputted a correct answer
    let answerOutputs = document.getElementsByClassName('question-answer-output');

    // load solution text in case the user inputted a wrong answer
    let solutionOutputs = document.getElementsByClassName('question-solution-text');
    let temp = [];
    for (let i = 0; i < solutionOutputs.length; i++) {
        
        // change text to solution text
        solutionOutputs[i].innerText = 'solution: ' + StoryData.currentData.solutions[i];
        temp.push(solutionOutputs[i].innerText);
    }

    console.log(temp);
    console.log(solutionOutputs[0].innerText);

    // loop over every answer output
    for (let i = 0; i < answerOutputs.length; i++) {

        // set answer output values
        if (inputs[i]) {

            // update text and text color
            answerOutputs[i].innerText = 'Correct!';
            answerOutputs[i].style.color = 'green';

        } else {

            // update text and text color
            answerOutputs[i].innerText = 'Incorrect!';
            answerOutputs[i].style.color = 'red';

            // display correct solution
            solutionOutputs[i].style.display = 'initial';
        }
    }

    // display question output text
    // use the same math as in the 'quizChallenge' to only display elements if there is data to be displayed
    document.getElementById('question-1-output').style.display = 'initial';
    document.getElementById('question-2-output').style.display = 'initial';
    document.getElementById('question-3-output').style.display = 'initial';
    document.getElementById('question-4-output').style.display = 'initial'.repeat(+(StoryData.currentData.solutions[3] != '')) + 'none'.repeat(+(StoryData.currentData.solutions[3] == ''));
    document.getElementById('question-5-output').style.display = 'initial'.repeat(+(StoryData.currentData.solutions[4] != '')) + 'none'.repeat(+(StoryData.currentData.solutions[4] == ''));

    // hide submit button
    document.getElementById('submit-answers-button').style.display = 'none';
    
    // display 'continue' button
    document.getElementById('quiz-continue-story').style.display = 'block';

    // update text depending on how well the user did on the quiz
    if (correctAnswers >= 3) {
        StoryData.allPages.push(StoryData.currentData.win);
    } else {
        StoryData.allPages.push(StoryData.currentData.lose);
        StoryData.choicePath = '11';
    }
}



// function to continue the story once the quiz challenge has finished
function quizContinueStory() {

    // reset all question challenge styles and variables back to their defaults
    document.getElementById('quiz-template').style.display = 'none';
    document.getElementById('question-1-output').style.display = 'none';
    document.getElementById('question-2-output').style.display = 'none';
    document.getElementById('question-3-output').style.display = 'none';
    document.getElementById('question-4-output').style.display = 'none';
    document.getElementById('question-5-output').style.display = 'none';

    let questionSolutions = document.getElementsByClassName('question-solution-text');
    for (let solution of questionSolutions) {
        solution.style.display = 'none';
    }

    // reset background image
    document.body.style.background = 'none';
    document.body.style.backgroundColor = 'dimgrey';

    // reset page height
    document.body.style.height = BASE_HEIGHT.toString() + 'px';

    // display the page change buttons
    document.getElementById('page-buttons').style.display = 'flex';

    // check if the user won
    if (StoryData.choicePath != '11') {

        // hide choice buttons
        StoryData.displayChoiceButtons = false;

        // change story data to prevent the section from being detected as a challenge after it ends
        StoryData.currentData.sectionType = TypeOptions.Normal;

        // go to next page
        changePage(1);

        // display text
        displayText();

    } else {

        // change story data to prevent the section from being detected as a challenge after it ends
        StoryData.currentData.sectionType = TypeOptions.Normal;

        // go to the next page
        choiceSelector();
        changePage(1);
    }
}



// function to display the arm wrestling challenge
function armWrestleSetup() {

    // hide page change buttons
    document.getElementById('page-buttons').style.display = 'none';

    // hide choice buttons
    let choiceButtons = document.getElementsByClassName('choice-button');
    for (let button of choiceButtons) {
        button.style.display = 'none';
    }

    // set background image
    document.getElementById('arm-wrestle-elements').style.backgroundImage = ArmImages.Equal;
    document.getElementById('arm-wrestle-elements').style.backgroundSize = 'cover';
    // document.getElementById('arm-wrestle-elements').style.backgroundPosition = 'center bottom';

    // display arm wrestle elements
    document.getElementById('arm-wrestle-elements').style.display = 'block';

    // adjust element container size
    document.getElementById('arm-wrestle-elements').style.width = BASE_WIDTH.toString() + 'px';
    document.getElementById('arm-wrestle-elements').style.height = BASE_HEIGHT.toString() + 'px';

    // put instruction text on screen
    document.getElementById('story-text').innerText = StoryData['1121'].text[0];
}



// function that the 'begin' button is bound to, in order to remove stuff and set up everything for the game loop
function armWrestleStart() {

    // remove begin button
    document.getElementById('begin-arm-wrestle').style.display = 'none';

    // remove instruction text
    document.getElementById('story-text').style.display = 'none';

    // add invisible button to act as the click detection
    document.getElementById('click-detection').style.display = 'initial';
    document.getElementById('click-detection').style.width = BASE_WIDTH.toString() + 'px';
    document.getElementById('click-detection').style.height = BASE_HEIGHT.toString() + 'px';

    // run game loop
    ArmWrestleData.gameLoop = setInterval(armWrestleLoop, ArmWrestleData.loopInterval);
}



// function to update arm wrestle variables when the user clicks on the screen
function armWrestleClick() {

    // increase arm strength
    ArmWrestleData.armStrength += 2;
}



// function for the main arm wrestle challenge loop
function armWrestleLoop() {

    // incrament arm strength drain counter
    ArmWrestleData.timeSinceLastDrain = (ArmWrestleData.timeSinceLastDrain + 1) % ArmWrestleData.drainRate;

    // check if arm strength needs to be drained
    if (ArmWrestleData.timeSinceLastDrain === 0) {

        // drain arm strength
        ArmWrestleData.armStrength -= ArmWrestleData.drainStrength;
    }

    // incrament drain strength increase counter
    ArmWrestleData.timeSinceLastDrainIncrease = (ArmWrestleData.timeSinceLastDrainIncrease + 1) % ArmWrestleData.drainIncreaseInterval;

    // check if drain rate interval needs to be decreased
    if (ArmWrestleData.timeSinceLastDrainIncrease === 0) {

        // decrease drain rate interval
        ArmWrestleData.drainRate--;
    }

    // update arm strength bar size
    document.getElementById('health-bar').style.width = (ArmWrestleData.armStrength * 4).toString() + 'px';

    // check if arm strength is over 100
    if (ArmWrestleData.armStrength > 100) {

        // constrain arm strength bar size
        document.getElementById('health-bar').style.width = '400px';
    }

    // check if user isn't losing or winning too much
    if (33 < ArmWrestleData.armStrength && ArmWrestleData.armStrength < 66) {

        // use sprite for equal
        document.getElementById('arm-wrestle-elements').style.backgroundImage = ArmImages.Equal;

    // check if user is losing
    } else if (0 < ArmWrestleData.armStrength && ArmWrestleData.armStrength <= 33) {

        // use sprite for losing
        document.getElementById('arm-wrestle-elements').style.backgroundImage = ArmImages.Losing;

    // check if user is winning
    } else if (66 <= ArmWrestleData.armStrength && ArmWrestleData.armStrength < 100) {

        // use sprite for winning
        document.getElementById('arm-wrestle-elements').style.backgroundImage = ArmImages.Winning;

    // check if user has won
    } else if (ArmWrestleData.armStrength >= 100) {

        // call function to end challenge
        armWrestleEnd();

    // check if user has lost
    } else if (ArmWrestleData.armStrength <= 0) {

        // call function to end challenge
        armWrestleEnd();
    }
}



// function to end the arm wrestle challenge
function armWrestleEnd() {

    // stop game loop
    clearInterval(ArmWrestleData.gameLoop);

    // remove invisible button for click detection
    document.getElementById('click-detection').style.display = 'none';

    // check if user has won
    if (ArmWrestleData.armStrength >= 100) {

        // use sprite for win
        document.getElementById('arm-wrestle-elements').style.backgroundImage = ArmImages.Win;

        // add win text
        document.getElementById('story-text').style.display = 'initial';
        document.getElementById('story-text').innerText = 'YOU WIN';

        // update story text
        StoryData.allPages.push(StoryData.currentData.win);

        // display continue button
        document.getElementById('arm-wrestle-continue').style.display = 'initial';

    // check if user has lost
    } else if (ArmWrestleData.armStrength <= 0) {

        // use sprite for lose
        document.getElementById('arm-wrestle-elements').style.backgroundImage = ArmImages.Lose;

        // add lose text
        document.getElementById('story-text').style.display = 'initial';
        document.getElementById('story-text').innerText = 'YOU LOSE';

        // remove instruction text from story data
        StoryData.allPages.pop();

        // update story text
        StoryData.allPages.push(StoryData.currentData.lose);

        // display continue button
        document.getElementById('arm-wrestle-continue').style.display = 'initial';
    }
}



// function to continue past the arm wrestle challenge
function armWrestleContinue() {

    // fix story text styling
    document.getElementById('story-text').style.display = 'block';

    // reset all variables
    document.getElementById('arm-wrestle-elements').style.display = 'none';

    // reset background image
    document.body.style.background = 'none';
    document.body.style.backgroundColor = 'dimgrey';

    // reset page height
    document.body.style.height = BASE_HEIGHT;

    // display the page change buttons
    document.getElementById('page-buttons').style.display = 'flex';

    // continue story
    changePage(1);
}



// this function will perform special actions when the current choice path needs to be handled differently than most.
function choiceSelector() {

    // check if current choice path is one of the first exceptions
    if (containsObject(StoryData.choicePath, ['122', '242', '42'])) {

        // redirect choice path to another section
        StoryData.choicePath = '11';
    }

    // check if current choice path is one of the second exceptions
    if (containsObject(StoryData.choicePath, ['121', '123', '21', '22', '322', '323', '332', '43', '44'])) {

        // call function to load new story data
        loadNewInfo();

        // call function to change display and change the choice path
        moveChoiceButtons();

        // exit function to skip unnecessary code
        return;
    }

    // call function to load new story data
    loadNewInfo();

    // try to check if the current story data is a challenge
    try {

        // check if the current story data is an arm wrestle challenge or a reaction test challenge
        if (StoryData.currentData.sectionType == TypeOptions.ArmWrestle) {

            // run function to determine which type of challenge is occuring
            challengeSelector();

            // skip the rest of the code after this if statement
            return;
        }

    // handle error if no data is found
    } catch (error) {

        // print error message
        console.log('challenge detection error avoided. error: ' + error);
    }

    // call function to update page buttons
    changePage(0);
}



function moveChoiceButtons() {

    // remove choice buttons
    let choiceButtons = document.getElementsByClassName('choice-button');
    for (let choiceButton of choiceButtons) {
        choiceButton.style.display = 'none';
    }

    // add text
    document.getElementById('story-text').innerText = StoryData.allPages[StoryData.allPages.length - 1];

    // change choice path to 11
    StoryData.choicePath = '11';

    // run choice selector to continue story
    choiceSelector();
}



// function to update the variables and text when the user chooses an option
function makeChoice(choiceNumber) {

    // update choice path
    StoryData.choicePath += choiceNumber;

    // print current choice path 
    console.log('current choice path: ' + StoryData.choicePath);

    // incrament page number
    StoryData.pageNumber++;

    // run function to handle exceptions
    choiceSelector();
}



// function to change the current page that takes an argument that determines whether the program goes fowrard a page or backwards a page
function changePage(incrament) {

    // change page
    StoryData.pageNumber += incrament;

    // create placeholders for buttons
    let backButton = document.getElementById('previous-page-button');
    let forwardButton = document.getElementById('next-page-button');

    // check if the current page is the first page
    if (StoryData.pageNumber === 0) {

        // temporarily disable the button to go back a page
        backButton.disabled = true;

    // if previous condition was false, check if the 'back button' is currently hidden
    } else if (backButton.disabled == true) {

        // unhide back button
        backButton.disabled = false;
    }

    // check if the current page is the last page
    if (StoryData.pageNumber + 1 === StoryData.allPages.length) {

        // temprorarily hide the button to go foward a page 
        forwardButton.disabled = true;

        // check if the current story type is a quiz
        if (StoryData.currentData.sectionType == TypeOptions.Quiz) {

            // display button to begin quiz
            document.getElementById('begin-quiz').style.display = 'initial';

        } else {

            // allow choice buttons to be displayed
            StoryData.displayChoiceButtons = true;
        }

    // if the previous condition was false, check if the 'forward button' is currently hidden
    } else if (forwardButton.disabled == true) {

        // unhide forward button
        forwardButton.disabled = false;
    }

    // call function to display text
    displayText()
}



// function to update the text on the screen and display the choice buttons
function displayText() {

    // update text on screen
    document.getElementById('story-text').innerText = StoryData.allPages[StoryData.pageNumber];

    // make placeholder variables for choice buttons
    let choiceButtons = document.getElementsByClassName('choice-button');

    // check if choice buttons should be displayed, and if they aren't displayed yet
    if (StoryData.displayChoiceButtons) {

        // display choice buttons only if they have text
        for (let button of choiceButtons) {

            // check if the button has text to display
            if (button.innerText != '') {

                // make button visible
                button.style.display = 'initial';

            } else {

                // make sure button is hidden
                button.style.display = 'none';
            }
        }

    // if previous condition was false, check if choice buttons should not be displayed, and if they are displayed
    } else if (!StoryData.displayChoiceButtons) {

        // hide choice buttons
        for (let button of choiceButtons) {
            button.style.display = 'none';
        }
    }
}