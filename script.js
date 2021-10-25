
const Levels  =  [{text:"LEVEL 1",levelPath:"LEVEL1/level_1.html"},{text:"LEVEL 2",levelPath:"LEVEL2/level_2.html"},{text:"LEVEL3",levelPath:"LEVEL1/level_1.html"}]
// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}
const selectLevel = () =>{
  
  fx.setText("Select Level").then(() => {
    var wrapper = document.querySelector(".container");

    Levels.forEach((item,i)=>{
      setTimeout(() => {
      var a = document.createElement('a');
      a.setAttribute('href', item.levelPath);

      var b = document.createElement('button');
      b.setAttribute('content', item.text);
      b.setAttribute('class', 'text-link');
      b.setAttribute('id', item.text);
      b.setAttribute('href',item.levelPath);
      b.setAttribute('onClick', '');
      b.textContent = item.text;
      a.append(b)
      wrapper.appendChild(a);
    },i* 800);
    })
  })
}

const Good = () =>{
  fx.setText("Good Let's start").then(() => {
    setTimeout(() => {
    var elem = document.getElementById("YesB");
    elem.remove();
    selectLevel();

      },1000);
  })
}
  const run = () =>{
  b.setAttribute('content', 'YES');
  b.setAttribute('class', 'text-link');
  b.setAttribute('id', 'YesB');

  b.setAttribute('onClick', 'Good()');
  b.textContent = 'YES';
  
  var wrapper = document.querySelector(".container");
  wrapper.appendChild(b);
  }

// ——————————————————————————————————————————————————
// Exampl e
// ——————————————————————————————————————————————————

const phrases = [
'Wellcome human',
"You don't talk to anybody",
"You don't interact with anybody.",
"Your whole sense of reality is, pretty warped...",
"Do you want to play a game?"];

var b = document.createElement('button');
const el = document.querySelector('.text');
const fx = new TextScramble(el);
const con = document.querySelector('.container');

phrases.forEach((name, i) => {
  setTimeout(() => {
    fx.setText(name).then(() => {
      if (phrases.length-1 == i)
      run();
    })
  }, i * 50);
});
