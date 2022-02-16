// Dear programmer,
// When I wrote this code, only god and
// I knew how it worked.
// Now, only god knows it!

// Therefore, if you are trying to know,
// omptimize, or debug it and you fail (most surely)
// please increase this counter as a warning for
// the next person:
// total_hours_wasted_here = 154

let game = null;
let t = null;
let time = 0;
let mainMenu = document.querySelector('.start');
let startForm = document.querySelector('#startForm');
let scoreMenu = document.querySelector('.endgame');
// Navigation
let nav = document.querySelector('.main__nav__ul');
let btnOpen = document.querySelector('.main__nav__open');
let btnClose = document.querySelector('.main__nav__close');

function toPersian(number){
    return number.toString().replace(/[0-9]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 1728));
}

function shuffle(array) {
  // special thanks to stackoverflow
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function timer() {
    time--;

    // Display time
    const minuts = Math.floor(time/60);
    const seconds = ('00'+(time%60)).slice(-2);
    document.querySelector('#time').innerText =
        toPersian(`${minuts}:${seconds}`);

    if (time == 0) {
      game.endGame();
    }
}

function calcScore(rights, moves, time) {
  return (rights * 5) - (moves - rights) + ~~(time / 5);
}

function getScores() {
  scores = window.localStorage.getItem('scores');
  if (!scores) {
    return [];
  }
  return JSON.parse(scores);
}

function saveScores(rights, moves, time) {
  let scores = getScores();

  scores.push(
    {
      'moves': moves,
      'rights': rights,
      'score': calcScore(rights, moves, time),
      'time': time
    }
  );

  scores.sort(function(a, b) {
      return b.score - a.score;
  });

  scores = scores.slice(0, 5);

  window.localStorage.setItem('scores', JSON.stringify(scores));
}

function showScore(game, win) {
  const title = scoreMenu.querySelector('#scoreTitle');
  const scoreN = scoreMenu.querySelector('#scoreN');
  const table = scoreMenu.querySelector('#scoreTable');

  const score = calcScore(game.rights, game.moves, time);
  let record = getScores();
  record = ((record.length > 0)?
      getScores()[0].score:0);
  
  title.innerText = ((win)?
    "تبریک! شما برنده شدید":
    "متاسفیم! دوباره تلاش کنید");
    
  scoreN.innerText = ` ${toPersian(score)}`;

  if (score >= record) {
    const trophy = document.createElement('i');
    trophy.classList = 'record fa fa-trophy';
    scoreN.prepend(trophy);
  }
  
  saveScores(game.rights, game.moves, time);

  scores = getScores();
  table.innerHTML =
      `<tr><th>#</th><th>حرکت‌ها</th>
      <th>انتخاب صحیح</th>
      <th>زمان باقیمانده</th>
      <th>امتیاز</th></tr>`;
  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    row = document.createElement('tr');
    row.innerHTML = `<td>${toPersian(i+1)}</td>
                    <td>${toPersian(score.moves)}</td>
                    <td>${toPersian(score.rights)}</td>
                    <td>${toPersian(score.time)}</td>
                    <td>${toPersian(score.score)}</td>
                  `
    table.appendChild(row);
  }

  scoreMenu.style.display = 'flex';
}

// Game Class
class Game {
  icons =
      ['gift', 'cake', 'key', 'bone', 'heart',
       'star', 'trophy', 'shirt', 'camera', 'cannabis',
       'car', 'bell', 'gem', 'carrot', 'lightbulb',
       'apple-whole', 'ice-cream', 'gamepad',
       'cookie-bite', 'eye', 'droplet', 'marker']
  numbers =
      ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹',
       '۱۰', '۱۱', '۱۲', '۱۳', '۱۴', '۱۵', '۱۶',
       '۱۷', '۱۸']
  gameTheme = null;
  gameSize = null;
  rights = 0;
  moves = 0;

  prepareGame () {
    // close menus
    btnClose.click();
    // Get and clear gamewrapper
    const gameWrapper = document.querySelector('.game .sq-wrapper');
    gameWrapper.innerHTML = '';
    document.querySelector('#moves').innerText = toPersian(this.moves);

    // Create gameboard
    const gameboard = document.createElement('div');
    gameboard.classList = `gameboard grid-${this.gameSize}`;
    // Create game items
    let gameContents = [];
    if (this.gameTheme == 'icons') {
      gameContents = shuffle(this.icons);
      gameContents = gameContents.slice(0, (this.gameSize**2)/2);
    } else if (this.gameTheme == 'numbers') {
      gameContents = this.numbers.slice(0, (this.gameSize**2)/2);
    }
    let gameItems = [];
    for (let i = 0; i < (this.gameSize**2)/2; i++) {
      let item = document.createElement('div');
      item.classList = 'game-item';
      item.dataset.id = i;
      content = gameContents.pop();
      if (this.gameTheme == 'icons') {
        item.innerHTML = `<i class="fa fa-${content}"></i>`;
      } else if (this.gameTheme == 'numbers') {
        item.innerHTML = `<span>${content}</span>`;
      }
      item.innerHTML += '<span class="overlay"></span>';
      gameItems.push(item);
      gameItems.push(item);
    }
    shuffle(gameItems);
    for (let j = 0; j < gameItems.length; j++) {
      gameboard.innerHTML += gameItems[j].outerHTML;
    }
    // append gameboard to wrapper
    gameWrapper.appendChild(gameboard);
  }

  endGame(win=false) {
    clearInterval(t);
    showScore(this, win);
  }

  constructor (formData) {
    this.gameTheme = formData.get('theme');
    this.gameSize = formData.get('size');
    this.prepareGame();
    time = (this.gameSize==4)? 61:121;
    t = setInterval(timer, 1000);
    timer();
  }

  addMove() {
    this.moves++;
    document.querySelector('#moves').innerText = toPersian(this.moves);
  }

  checkMoves (items) {
    this.addMove();
    if (items[0].dataset.id == items[1].dataset.id) {
      items.forEach(element => {
        element.classList.add('passed');
        element.classList.remove('show');
      })
      this.rights++;

      if (this.rights== (this.gameSize**2/2) ) {
        this.endGame(true);
      }
    } else {
      items.forEach(element => {
        sleep(500).then(() => { element.classList.remove('show'); });
      })
    }
  }
}

// Start Game
function startGame(form) {
  formData = new FormData(form);
  game = new Game(formData);

  // Game items
  gameItems = document.querySelectorAll('.game-item');
  gameItems.forEach(element => {
    element.addEventListener('click', e => {
      e.target.parentElement.classList.add('show');
      activeItems = document.querySelectorAll('.game-item.show');
      if (activeItems.length > 1) {
        const gameboard = document.querySelector('.gameboard');
        gameboard.style.pointerEvents = 'none';
        sleep(500).then(() => {gameboard.style.pointerEvents = 'all';});
        game.checkMoves(activeItems);
      }
    })
  });
}

startForm.addEventListener('submit', e => {
  e.preventDefault();
  startGame(startForm);
  mainMenu.style.display = 'none';
});

// Game options
function restartGame() {
  clearInterval(t);
  scoreMenu.style.display = 'none';
  mainMenu.style.display = 'none';
  startGame(startForm);
}

function newGame() {
  clearInterval(t);
  mainMenu.style.display = 'flex';
  scoreMenu.style.display = 'none';
}

// Navigation
btnOpen.addEventListener('click', e => {
  e.preventDefault();
  nav.classList.add('open');
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  nav.classList.remove('open');
});