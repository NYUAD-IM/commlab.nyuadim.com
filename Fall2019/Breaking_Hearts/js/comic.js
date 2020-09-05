var numPanels = 7;
var topPanel = 0;
var bottomPanel = numPanels - 1;
var blockSliding = true;
var top_ctx = [];
var bottom_ctx = [];
var panelWidth = 450;
var panelHeight = 300;
var panelBorder = 20;
var reverse = false;
var slideTopHelp = [
  {'header': 'I’m sorry for breaking your heart', 'content': 'These were the words Sara knew she’d have to say at some point today. They were the words she dreaded. She and Alex had been dating for the past 3 years, but today, she had to end it. With a sigh, Sara picked up her pen and began to write.'},
  {'header': 'Please don’t hate me', 'content': 'This was the thought nagging at Sara’s mind as she sat there. It looped and looped around her head, distracting her from any other thoughts. She had so much she wanted to say, but in the end, the breakup letter was only 38 words long. 38 words to end 38 months of being together. It was almost poetic. Sara looked at her clock, it was almost 2pm, the time they agreed to meet at his apartment. She had wanted to mail the letter, but thought the least she could do was break up with him in person. With a last read over, she stuffed the letter in a envelope and headed out.'},
  {'header': 'THE MEETING', 'content': 'Sara arrived early, but Alex opened the door almost immediately. He was holding flowers out to her with one hand. She accepted the flowers guiltily and gave him the card. “I’m sorry -” Sara began to say. She wanted to apologize quickly and leave, but she stopped. Something felt off. The room became cold. Alex stared at the card blankly.'},
  {'header': 'Oh God, this can’t be happening', 'content': 'Sara felt as if she were in a bad dream. She’d never been scared of Alex, never seen him as a threat, but that shifted suddenly. The moment he had finished reading the letter something in his eyes had changed. They’d gone cold.  And now those cold eyes were staring her down. But it wasn’t his eyes she was focused on, but the knife in his hand.'},
  {'header': 'THE MURDER', 'content': 'Sara started backing away, trying to plead with him, but she could say nothing. There were no words that could negate the damage the letter had already caused. She tried to get to the door, but he grabbed her. She was trapped. The knife came down once, twice, again and again. She began falling.'},
  {'header': 'I can’t breathe', 'content': 'Sara cried out, but there was no sound. Her punctured lungs could not support it. Her body was broken. All she was capable of was feeling- feeling the blood run down her lips, feeling pain. Even that sensation was about to end. As she began to die, her mind didn’t have room for any last regrets, memories, or fears. The only thing that occupied her mind, was the fact that she was dying.'},
  {'header': '', 'content': ''}
]
var slideBottomHelp = [
  {'header': 'I’m sorry for breaking your heart', 'content': 'Alex whispered as he held Sara’s heart in his palm. It was dripping and messy, bleeding out slowly. As he stared at it he thought to himself that this was what his own heart looked like on the inside, broken. Although his heart still beat, he felt as if it had been ripped out of his chest.'},
  {'header': 'Please don’t hate me', 'content': 'Alex said, but he was pretty sure Sara couldn’t hear him anymore. He looked at his hands. They were covered in blood, her blood. He’d been caught in a blind rage that had tinted his vision, making everything appear red with fury; but now that had faded and he saw with clarity what he’d done. His heart began to ache.'},
  {'header': 'THE MURDER', 'content': 'Alex could see Sara was scared, but he lacked any empathy. He was numb. But as he held the knife, one feeling began to return to him: rage. Looking at Sara, this feeling intensified. She had not only shattered his heart, but his plans for the future. She had to pay for this loss. He stared at her, taking in her terror and felt good. She tried to run, but he grabbed her and started attacking her with the knife. Her blood warmed him.'},
  {'header': 'Oh God, this can’t be happening', 'content': 'Alex had never been a quick reader, but the letter was short and the message was clear. He felt his future crumbling around him. “This can’t be happening!” “This Can’t be happening!” His mind was spinning quickly; he was losing control. He didn’t even notice himself grabbing the kitchen knife.'},
  {'header': 'THE MEETING', 'content': 'Alex stood in the living room for a while before Sara arrived. He played with his tie, his jacket, making sure everything was perfect. Everything had to be perfect. He’d spent the morning decorating his apartment, making everything special for this moment. It wasn’t extravagant, but he’d put a lot of thought into this and knew she’d appreciate it. <br>The doorbell rang and he rushed to the door, greeting Sara with a bouquet. Sara, offered him a letter and he smiled. She wrote him a love letter. How thoughtful.  He opened it without hesitation.'},
  {'header': 'I can’t breathe', 'content': 'Alex thought. The girl I love is going to marry me today. Alex was giddy with excitement, almost to the point of feeling sick. Yet this was the good sort of sickness, butterflies that made him feel so happy he could fly. His alarm went off. One hour until she’d arrive.'},
  {'header': '', 'content': ''}
]

function setTranslateX(element, value) {
  element.style.transform = 'translateX(' + value.toString() + 'px)';
}

function getTranslateX(element) {
  return parseFloat(element.style.transform.split('px')[0].split('(')[1])
}

function centerComic() {
  var comicTop = document.getElementById('comic-top');
  var comicBottom = document.getElementById('comic-bottom');
  var height = window.innerHeight;
  var width = window.innerWidth;


  if (height < 680 || width < 1060) {
    document.getElementById('size-error').style.display = 'block';
    blockSliding = true;
  } else {
    document.getElementById('size-error').style.display = 'none';
    blockSliding = false;
  }

  var border = (width - panelWidth - panelBorder) / 2;
  setTranslateX(comicTop, border - topPanel * (panelWidth + panelBorder));
  setTranslateX(comicBottom, -1 * bottomPanel * (panelWidth + panelBorder) + border);
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

function hijackScroll() {
  document.onkeydown = preventDefaultForScrollKeys;

  window.addEventListener('wheel', function(e) {
    preventDefault(e);

    var comicTop = document.getElementById('comic-top');
    var comicBottom = document.getElementById('comic-bottom');

    if (e.deltaY > 0) {
      forwardSlide();
    } else if (e.deltaY < 0) {
      backwardSlide();
    }
  });
}

function addHeartbeat(element) {
  element.classList.add('heartbeat');
}

function forwardSlide() {
  if (blockSliding) {
    return;
  }

  if (topPanel == numPanels - 1) {
    document.getElementById('reverse').style.display = 'block';
    fadeIn('reverse');
    return;
  }

  // setTime(ctx, radius, {'hour': currentTime.hour + 1, 'minute': currentTime.minute}, 1);

  var comicTop = document.getElementById('comic-top');
  var comicBottom = document.getElementById('comic-bottom');

  var cumulative = 0;
  blockSliding = true;

  var forward = setInterval(function() {
    if (cumulative != panelWidth + panelBorder) {
      setTranslateX(comicTop, getTranslateX(comicTop) - 5);
      setTranslateX(comicBottom, getTranslateX(comicBottom) + 5);
      cumulative += 5;
    } else {
      clearInterval(forward);
      fadeOut('comic-top-' + (topPanel - 1));
      fadeOut('comic-bottom-' + (bottomPanel + 1));
      setTimeout(function() {
        blockSliding = false;
      }, 500);
    }
  }, 10);

  topPanel += 1;
  bottomPanel -= 1;
  fadeIn('comic-top-' + topPanel);
  fadeIn('comic-bottom-' + bottomPanel);
}

function backwardSlide() {
  document.getElementById('reverse').style.display = 'none';

  if (blockSliding || topPanel == 0) {
    return;
  }

  // setTime(ctx, radius, {'hour': currentTime.hour - 1, 'minute': currentTime.minute}, 1);

  var comicTop = document.getElementById('comic-top');
  var comicBottom = document.getElementById('comic-bottom');

  var cumulative = 0;
  blockSliding = true;

  var backward = setInterval(function() {
    if (cumulative != panelWidth + panelBorder) {
      setTranslateX(comicTop, getTranslateX(comicTop) + 5);
      setTranslateX(comicBottom, getTranslateX(comicBottom) - 5);
      cumulative += 5;
    } else {
      clearInterval(backward);
      fadeOut('comic-top-' + (topPanel + 1));
      fadeOut('comic-bottom-' + (bottomPanel - 1));
      setTimeout(function() {
        blockSliding = false;
      }, 500);
    }
  }, 10);

  topPanel -= 1;
  bottomPanel += 1;
  fadeIn('comic-top-' + topPanel);
  fadeIn('comic-bottom-' + bottomPanel);
}

function loadPictures() {
  document.getElementById('comic-top').style.width = (panelWidth + panelBorder) * numPanels + "px";
  document.getElementById('comic-bottom').style.width = (panelWidth + panelBorder) * numPanels + "px";
  for (var x = 0; x < numPanels; x++) {
    var canvas = document.createElement('canvas');
    canvas.id = 'comic-top-' + x;
    canvas.classList.add('comic');
    canvas.width = panelWidth;
    canvas.height = panelHeight;
    document.getElementById('comic-top').appendChild(canvas);
    var ctx = canvas.getContext('2d');
    top_ctx.push(ctx);

    var background = new Image();

    var direction = 'top';
    var position = x

    if (reverse) {
      direction = 'bottom';
      position = numPanels - x - 1;
    }

    background.src = 'images/slides/' + direction + '-slide-' + position + '.jpg';
    background.position = x;
    background.onload = function() {
      top_ctx[this.position].drawImage(this, 0, 0, panelWidth, panelHeight);
    }

    canvas = document.createElement('canvas');
    canvas.id = 'comic-bottom-' + x;
    canvas.classList.add('comic');
    canvas.width = panelWidth;
    canvas.height = panelHeight;
    document.getElementById('comic-bottom').appendChild(canvas);
    ctx = canvas.getContext('2d');
    bottom_ctx.push(ctx);

    direction = 'bottom';
    position = numPanels - x - 1;

    if (reverse) {
      direction = 'top';
      position = x;
    }

    background = new Image();
    background.src = 'images/slides/' + direction + '-slide-' + position + '.jpg';
    background.position = x;
    background.onload = function() {
      bottom_ctx[this.position].drawImage(this, 0, 0, panelWidth, panelHeight);
    }
  }
  document.getElementById('comic-top-' + topPanel).style.opacity = 1;
  document.getElementById('comic-bottom-' + bottomPanel).style.opacity = 1;
  addHeartbeat(document.getElementById('comic-top-3'));
  addHeartbeat(document.getElementById('comic-bottom-3'));
  if (reverse) {
    addHeartbeat(document.getElementById('comic-top-0'));
    addHeartbeat(document.getElementById('comic-bottom-6'));
  } else {
    addHeartbeat(document.getElementById('comic-top-6'));
    addHeartbeat(document.getElementById('comic-bottom-0'));
  }
}

function fadeOut(id) {
  document.getElementById(id).classList.add('fadeout');
  setTimeout(function() {
    document.getElementById(id).style.opacity = 0;
    document.getElementById(id).classList.remove('fadeout');
  }, 1000);
}

function fadeIn(id) {
  document.getElementById(id).classList.add('fadein');
  setTimeout(function() {
    document.getElementById(id).style.opacity = 1;
    document.getElementById(id).classList.remove('fadein');
  }, 2000);
}

document.getElementById('help').onmouseover = function() {
  if (blockSliding) {
    return;
  }

  var topSlide = slideTopHelp;
  var bottomSlide = slideBottomHelp;
  var topHelp = topPanel;
  var bottomHelp = numPanels - bottomPanel - 1;
  if (reverse) {
    topHelp = numPanels - topPanel - 1;
    bottomHelp = bottomPanel;
    topSlide = slideBottomHelp;
    bottomSlide = slideTopHelp;
  }

  document.getElementById('comic-top-help').innerHTML = topSlide[topHelp].content;
  document.getElementById('comic-top-help-header').innerHTML = topSlide[topHelp].header;
  document.getElementById('comic-bottom-help').innerHTML = bottomSlide[bottomHelp].content;
  document.getElementById('comic-bottom-help-header').innerHTML = bottomSlide[bottomHelp].header;
  document.getElementById('comic-top-help').style.display = 'block';
  document.getElementById('comic-bottom-help').style.display = 'block';
  document.getElementById('comic-top-help-header').style.display = 'block';
  document.getElementById('comic-bottom-help-header').style.display = 'block';
  blockSliding = true;
}

document.getElementById('help').onmouseout = function() {
  document.getElementById('comic-top-help').style.display = 'none';
  document.getElementById('comic-bottom-help').style.display = 'none';
  document.getElementById('comic-top-help-header').style.display = 'none';
  document.getElementById('comic-bottom-help-header').style.display = 'none';
  blockSliding = false;
}

window.addEventListener('wheel', function(e) {
  preventDefault(e);
});

document.getElementById('tutorial-confirm').onclick = function() {
  document.getElementById('tutorial').classList.add('fadeout');
  setTimeout(function() {
    document.getElementById('tutorial').style.display = 'none';
    hijackScroll();
  }, 1000);
}

document.getElementById('reverse-confirm').onclick = function() {
  document.getElementById('reverse').classList.add('fadeout');
  comicTop = document.getElementById('comic-top');
  while (comicTop.firstChild) {
    comicTop.removeChild(comicTop.firstChild);
  }
  comicBottom = document.getElementById('comic-bottom');
  while (comicBottom.firstChild) {
    comicBottom.removeChild(comicBottom.firstChild);
  }
  topPanel = 0;
  bottomPanel = numPanels - 1;
  top_ctx = [];
  bottom_ctx = [];
  reverse = !reverse;
  centerComic();
  loadPictures();
  setTimeout(function() {
    document.getElementById('reverse').style.display = 'none';
    document.getElementById('reverse').style.opacity = '0';
    document.getElementById('reverse').classList.remove('fadeout');
  }, 1000);
}

document.getElementById('reverse-cancel').onclick = function() {
  document.getElementById('reverse').classList.add('fadeout');
  setTimeout(function() {
    document.getElementById('reverse').style.display = 'none';
    document.getElementById('reverse').style.opacity = '0';
    document.getElementById('reverse').classList.remove('fadeout');
  }, 1000);
}

centerComic();
loadPictures();

window.addEventListener('resize', centerComic);
