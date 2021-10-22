let canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 600;
let ctx = canvas.getContext("2d");
let bg_image = document.getElementById("background");
let image_flappy = document.getElementById("flappy");
let buttonStart = document.getElementById("start-button");
let image_pipeUP = document.getElementById("pipeUP");
let image_pipeDOWN = document.getElementById("pipeDOWN");
let form = document.getElementById("form-container");

//game vars and consts
let dX_bird = 50;
let dY_bird = 180;

let max = 10;
let min = -370;
let dX_pipe = canvas.width - 20;
let dY_pipe = Math.floor(Math.random() * (max - min + 1) + min); //random entre 0 y -400
let hole = 600;
let pipes = [{ x: dX_pipe, y: dY_pipe }];

let gravity = 5;
let fly = 5;
// let frames = 0;

let key_press = false;
let collision = false;

//funtions

function init() {
  collision = false;
  ctx.drawImage(bg_image, 0, 0, 600, 504, 0, 0, 1000, 600); //fondo
  ctx.drawImage(image_flappy, 0, 0, 498, 351, dX_bird, dY_bird, 60, 40); //pajaro
  ctx.drawImage(image_pipeUP, 0, 0, 138, 793, pipes[0].x, pipes[0].y, 100, 450); //pipeUP
  ctx.drawImage(
    image_pipeDOWN,
    0,
    0,
    138,
    793,
    pipes[0].x,
    pipes[0].y + canvas.height,
    100,
    450
  ); //pipeDOWN
}

function draw() {
  statusCollision();
  if (collision == false) {
    ctx.drawImage(bg_image, 0, 0, 600, 504, 0, 0, 1000, 600); //fondo
    ctx.drawImage(image_flappy, 0, 0, 498, 351, dX_bird, dY_bird, 60, 40); //pajaro

    for (let i = 0; i < pipes.length; i++) {
      ctx.drawImage(
        image_pipeUP,
        0,
        0,
        138,
        793,
        pipes[i].x,
        pipes[i].y,
        100,
        450
      ); //pipeUP
      ctx.drawImage(
        image_pipeDOWN,
        0,
        0,
        138,
        793,
        pipes[i].x,
        pipes[i].y + canvas.height,
        100,
        450
      ); //pipeDOWN

      pipes[i].x -= 5;

      if (pipes[i].x == 500) {
        dY_pipe = Math.floor(Math.random() * (max - min + 1) + min);
        pipes.push({ x: dX_pipe, y: dY_pipe });
      }

      //colision
      if (pipes[i].x <= dX_bird + 40 && pipes[i].x + 100 >= dX_bird) {
        if (
          dY_bird < 450 - Math.abs(pipes[i].y) ||
          dY_bird + 40 > pipes[i].y + canvas.height
        ) {
          collision = true;
        }
      }
    }

    if (key_press == false) {
      dY_bird += gravity;
    } else if (key_press == true) {
      dY_bird -= fly;
    }

    // if (y_bird < y_pipe_up) {
    //   console.log(y_bird)
    //   console.log(y_pipe_up)
    //   console.log("fail")
    // }
  }

  requestAnimationFrame(draw);
}

function statusCollision() {
  if (dY_bird <= 0 || dY_bird >= canvas.height - 40) {
    collision = true;
  }
}

//buttons
buttonStart.addEventListener("click", function () {
  buttonStart.setAttribute("disabled", "true");
  collision = false;
  draw();
});

document.addEventListener("keydown", function (event) {
  if (event.code == "Space") {
    key_press = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code == "Space") {
    key_press = false;
  }
});

//start game
window.onload = init;
