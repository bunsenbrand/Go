
var size = 1000;
var border = 10;
var boardsize = size - 2 * border;
var interval = boardsize / 20;
var a = border + interval;
var b = border + boardsize - interval;
var boardcol;
var backcol;
var linecol;
var stonestroke;
var acol;
var bcol;
var posx;
var posy;
var lastx = 0;
var lasty = 0;
var turn = -1;
var turns = new Array();
var turncount = -1;
var spots = new Array(19);

for (i = 0; i < 19; i++) {
  spots[i] = new Array(19);
  for (j = 0; j < 19; j++) {
    spots[i][j] = 0;
  }
}


function setup() {

  canv = createCanvas(1000, 1000);

  noCursor();

  // Standard Coloring
  boardcol = color(214,171,107);
  backcol = color(20,20,20);
  linecol = color(20,20,20);
  stonestroke = color(0,0,0);
  acol = color(255,255,255);
  bcol = color(0,0,0);

  canv.style("display","block");
  canv.style("margin","0 auto");
  canv.style("marginTop","100px");

  createP("");
  createP("");
  createP("");
  createP("");
  
  sel = createSelect();
  sel.style("display","block");
  sel.style("margin","0 auto");
  sel.option("Standard");
  sel.option("Inverted");
  sel.option("Matrix");
  sel.changed(styleUpdate);

}

function styleUpdate() {

  if (sel.value() == "Standard") {
    boardcol = color(214,171,107);
    backcol = color(20,20,20);
    linecol = color(50,50,50);
    stonestroke = color(0,0,0);
    acol = color(255,255,255);
    bcol = color(0,0,0);

   }
   else if (sel.value() == "Inverted") {
     boardcol = color(73,33,4);
     backcol = color(200,200,200);
     linecol = color(200,200,200);
     stonestroke = color(0,0,0);
     acol = color(255,255,255);
     bcol = color(0,0,0);

   }
   else if (sel.value() == "Matrix") {
     boardcol = color(0,0,0);
     backcol = color(0,0,0);
     linecol = color(0,255,26);
     stonestroke = color(0,0,0);
     acol = color(0,0,0);
     bcol = color(0,0,0);
   }

}

function draw() {

  document.body.style.backgroundColor = backcol;
  background(backcol);

  // board

  fill(boardcol);
  square(border, border, boardsize);

  // lines

  fill(0);

  push();

  for (i = 0; i < 19; i++) {
    stroke(linecol);
    line(a, a + i * interval, b, a + i * interval);
  }

  for (i = 0; i < 19; i++) {
    stroke(linecol);
    line(a + i * interval, a, a + i * interval, b);
  }

  pop();

  // positioning

  posx = int(round(map(mouseX, a, b, 0, 18, 18 * interval)));
  posy = int(round(map(mouseY, a, b, 0, 18, 18 * interval)));


  // displaying stones

  for (i = 0; i < 19; i++) {
    for (j = 0; j < 19; j++) {

      var x = a + i * interval;
      var y = a + j * interval;

      if(spots[i][j] == 1) {

        fill(acol);
        stroke(stonestroke);
        circle(x,y, interval / 2)

        if (sel.value() == "Matrix") {
          fill(linecol);
          textSize(interval/3);
          text("1", x - interval/8, y + interval/8);
        }

      }
      else if(spots[i][j] == 2) {

        fill(bcol);
        stroke(stonestroke);
        circle(x,y, interval / 2);

        if (sel.value() == "Matrix") {
          fill(linecol);
          textSize(interval/3);
          text("0", x - interval/8, y + interval/8);
        }

      }
    }
  }

  if(turn == 1) {

      fill(acol);
      stroke(stonestroke);
      circle(mouseX,mouseY, interval / 2);

      if (sel.value() == "Matrix") {
        fill(linecol);
        textSize(interval/3);
        text("1", mouseX - interval/8, mouseY + interval/8);
      }
  }
  else {

      fill(bcol);
      stroke(stonestroke);
      circle(mouseX,mouseY, interval / 2);

      if (sel.value() == "Matrix") {
        fill(linecol);
        textSize(interval/3);
        text("0", mouseX - interval/8, mouseY + interval/8);
      }
  }
}

function mouseClicked() {

  if(mouseX >= border && mouseX <= (boardsize + border) &&
      mouseY >= border && mouseY <= (boardsize + border)) {

      if(spots[posx][posy] == 0) {

        if(turn == 1) {
          spots[posx][posy] = 1;
          turncount += 1;
          turns[turncount] = createVector(posx,posy);
        }
        else {
          spots[posx][posy] = 2;
          turncount += 1;
          turns[turncount] = createVector(posx,posy);
        }

        lastx = posx;
        lasty = posy;

        turn *= -1;
      }
  }
}

function keyPressed() {

  // DELETE
  if(keyCode == 8) {
    spots[posx][posy] = 0;
  }

  // UNDO
  if(keyCode == 90) {
    spots[turns[turncount].x][turns[turncount].y] = 0;
    turncount -= 1;
    turn *= -1;
  }

  // TURN CHANGE
  if(keyCode == 87) {
    turn = 1;
  }

  if(keyCode == 66) {
    turn = -1;
  }
}
