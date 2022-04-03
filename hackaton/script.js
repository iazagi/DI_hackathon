const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
let canClick = false; //if its flashing you can't click
let start = document.querySelector("h1");


const getRandomPanel = () => {
  const panels = [
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
  ];

  //parseIn give us a number with out the remaynder
  return panels[parseInt(Math.random() * panels.length)];
};

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

//function the will make the panels "flash" in order chencing the class to active
//the promise rap the flashing panels in time outs
const flash = panel => {
  return new Promise(resolve => {
    panel.className += ' active';
    setTimeout(() => {
      panel.className = panel.className.replace(
        ' active',
        ''
      );
      setTimeout(() => {
        resolve();
      }, 550);
    }, 1000);
  });
};

//


const panelClicked = panelClicked => {
  if (!canClick) return; 
  const expectedPanel = sequenceToGuess.shift(); // takes out the first element from the array
  if (expectedPanel === panelClicked) { //check if the panel click is the same as the panel flash
    if (sequenceToGuess.length === 0) {
      // start new round
      sequence.push(getRandomPanel());//insert a new panel to the array
      sequenceToGuess = [...sequence];
      startFlashing();
      
    }
  } else {
    // end game
    alert('game over');
    location.reload();
  }
};

///
const startFlashing = async () => {
  canClick = false;
  for (const panel of sequence) {
    await flash(panel); ////call the flash function , 
    //await is for giving a time dillay so the panels don't flash at the same time 
  }
  canClick = true;
};


/// call the function on page load

start.addEventListener(`click`, startFlashing);