//dayle words
const targetWords = ['aahed', 'aargh'];

//all ok words to guess
const dictionary = ['aahed', 'aalii', 'aargh'];
const keyboard = document.querySelector('[data-keyboard]');
const FLIP_ANIMATION_DURATION = 500;
const DANCE_ANIMATION_DURATION = 500;
const alertContainer = document.querySelector('[data-alert-container]');
const guessGrid = document.querySelector('[data-guess-grid]');
const offsetFromDate = new Date(2022, 5, 1);
const msOffset = Date.now() - offsetFromDate;
const dayOffset = msOffset / 1000 / 60 / 60 / 24;
const targetWord = targetWords[Math.floor(dayOffset)];

function startInteraction() {
  document.addEventListener('click', handleMouseClick);
  document.addEventListener('click', handleKeyPress);
}

function stopInteraction() {
  document.removeEventListener('click', handleMouseClick);
  document.removeEventListener('click', handleKeyPress);
}

function handleMouseClick(e) {
  if (e.target.matches('[data-key')) {
    pressKey(e.target.dataset.key);
    return;
  }
  if (e.target.matches('[data-enter]')) {
    submitGuess();
    return;
  }
  if (e.target.matches('[data-delete]')) {
    deleteKey();
    return;
  }
}

function handleKeyPress(e) {
  if (e.key === 'Enter') {
    submitGuess();
    return;
  }
  if (e.key === 'Backspace' || e.key === 'Delete') {
    deleteKey();
    return;
  }
  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key);
    return;
  }
}

function pressKey(key) {
  const nextTile = guessGrid.querySelector(':not([data-letter]');
  nextTile.dataset.letter = key.toLowerCase();
  nextTile.textContent = key;
  nextTile.dataset.state = 'active';
}

function deleteKey() {
  const activeTiles = getActiveTiles();
  const lastTile = activeTiles[activeTiles.length - 1];
  if (lastTile == null) return;
  lastTile.textContent = '';
  delete lastTile.dataset.state;
  delete lastTile.dataset.letter;
}

function submitGuess() {
  const activeTiles = [...getActiveTiles()];
  if (activeTiles.length !== 5) {
    showAlert('Not enough letters');
    shakeTiles(activeTiles);
    return;
  }
  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter;
  }, '');
  if (!dictionary.includes(guess)) {
    showAlert('Not in the word list');
    shakeTiles(activeTiles);
    return;
  }
  stopInteraction();
  activeTiles.forEach((...params) => flipTile(...params, guess));
}

function flipTiles(tile, index, array, guess) {
  const letter = tile.dataset.letter;
  const key = keyboard.querySelector(`[data-key="${letter}"i]`);
  setTimeout(() => {
    tile.classList.add('flip');
  }, (index * FLIP_ANIMATION_DURATION) / 2);

  tile.addEventListener(
    'transitionend',
    () => {
      tile.classList.remove('flip');

      if (targetWord[index] === letter) {
        tile.dataset.state = 'correct';
        key.classList.add('correct');
      } else if (targetWord.includes(letter)) {
        tile.dataset.state = 'wrong-location';
        key.classList.add('wrong-location');
      } else {
        tile.dataset.state = 'wrong';
        key.classList.add('wrong');
      }

      if (index === array.lengt - 1) {
        tile.addEventListener(
          'transitionend',
          () => {
            startInteraction();
            checkWinLose(guess, array);
          },
          { once: true }
        );
      }
    },
    { once: true }
  );
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"');
}

function shakeTiles(title) {
  tiles.forEach((tile) => {
    tile.classList.add('shake');
    tile.addEventListener(
      'animationend',
      () => {
        tile.classList.remove('shake');
      },
      { onece: true }
    );
  });
}

function showAlert(message, duration = 1000) {
  const alert = document.createElement('div');
  alert.textContent = message;
  alert.classList.add('alert');
  alertContainer.prepend(alert);
  if (duration == null) return;

  setTimeout(() => {
    alert.classList.add('hide');
    alert.addEventListener('transitionend', () => {
      alert.remove();
    });
  }, duration);
}

function checkWinLose(guess, tiles) {
  if (guess === targetWord) {
    showAlert('You Win', 5000);
    danceTiles(tiles);
    stopInteraction();
    return;
  }

  const remainingTiles = guessGrid.querySelector(":not([data-letter])")
  if(remainingTiles.lengt === 0){
      showAlert(targetWord.toUpperCase(), null)
      stopInteraction()
  }
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('dance');
      tile.addEventListener(
        'animationend',
        () => {
          tile.classList.remove('dance');
        },
        { onece: true }
      );
    }, (index * DANCE_ANIMATION_DURATION) / 5);
  });
}
