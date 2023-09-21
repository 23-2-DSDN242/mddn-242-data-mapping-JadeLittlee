// let sourceImg=null;
// let maskImg=null;
// let renderCounter=0;

// // change these three lines as appropiate
// let sourceFile = "input_5.jpg";
// let maskFile   = "mask_5.png";
// let outputFile = "output_5.png";

// function preload() {
//   sourceImg = loadImage(sourceFile);
//   maskImg = loadImage(maskFile);
// }

// function setup () {
//   let main_canvas = createCanvas(1920, 1080);
//   main_canvas.parent('canvasContainer');

//   imageMode(CENTER);
//   noStroke();
//   background(0, 0, 128);
//   sourceImg.loadPixels();
//   maskImg.loadPixels();
// }

// // return;
// function draw () {
//   // return;
//   let j = renderCounter;
//   // get one scanline
//   for(let i=0; i<1920; i++) {
//     let pix = sourceImg.get(i, j);
//     let mask = maskImg.get(i, j);
//     if(mask[0] > 128) {
//       // draw the full pixels
//       set(i, j, pix);
//     }
//     else {
//       // draw a "dimmed" version in gray
//       let gray_color = 64 + pix[1] / 8;
//       set(i, j, gray_color);
//     }
//   }
// }
// // function draw () {
// //   for(let i=0;i<10000;i++) {
// //     let x = floor(random(sourceImg.width));
// //     let y = floor(random(sourceImg.height));
// //     let pix = sourceImg.get(x, y);
// //     let mask = maskImg.get(x, y);
// //     fill(pix);
    
// //     if(mask[0] > 128) {
// //       stroke(pix);
// //     strokeWeight(6);
// // line(x-15, y, x+15, y);
// //     }
// //     else {
// //       let  pointSize = 20;
// //       noStroke();
// //       rect(x, y, pointSize, pointSize);    
// //     }
// //   }
// // }

//     // if(mask[0] > 128) {
//     //   let pointSize = 10;
//     //   ellipse(x, y, pointSize, pointSize);
//     // }
//     // else {
//     //   let pointSize = 20;
//     //   rect(x, y, pointSize, pointSize);    
//     // }
 
//   renderCounter = renderCounter + 1;
//   if(renderCounter > 1080) {
//     console.log("Done!")
//     noLoop();
//     // uncomment this to save the result
//     // saveArtworkImage(outputFile);
//   }
  

// function keyTyped() {
//   if (key == '!') {
//     saveBlocksImages();
//   }
// }


let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_8.jpg";
let maskFile   = "mask_8.png";
let outputFile = "output_1.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0, 0, 128);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}

function draw () {
  let j = renderCounter;
  // get one scanline
  for(let i=0; i<1920; i++) {
    let pix = sourceImg.get(i, j);
    let mask = maskImg.get(i, j);
    if(mask[0] > 128) {
      // draw the full pixels
      set(i, j, pix);
    }
    else {
      // draw a "dimmed" version in gray
      let gray_color = 64 + pix[1] / 8;
      set(i, j, gray_color);
    }
  }
  updatePixels();
  renderCounter = renderCounter + 1;
  print(renderCounter);
  if(renderCounter > 1080) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    // saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}