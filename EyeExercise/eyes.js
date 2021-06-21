const balls = document.getElementsByClassName('ball');
// Interprets mouse location coordiantes into coordinates for eyeballs 
document.onmousemove = (event) => { 
  let x = (event.clientX * 100) / window.innerWidth + '%';
  let y = (event.clientY * 100) / window.innerHeight + '%';

  for (let i = 0; i < 2; i += 1) {
    balls[i].style.left = x;
    balls[i].style.top = y;
    balls[i].transform = 'translate(-' + x + ',-' + y + ')';
  }
}


