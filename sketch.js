let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let curLayer = 0;

// change these three lines as appropiate
let sourceFile = "input_w.jpg";
let maskFile   = "mask_w.png";
let outputFile = "output_2.png";

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
  colorMode(HSB);
}

function draw () {
  if (curLayer == 0) { //background
    let num_lines_to_draw = 40;
    // get one scanline
    for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<1080; j++) {
      for(let i=0; i<1920; i++) {
        colorMode(RGB);
        let pix = sourceImg.get(i, j);
        // create a color from the values (always RGB)
        let col = color(pix);
        let mask = maskImg.get(i, j);

        colorMode(HSB, 360, 100, 100);
        // draw a "dimmed" version in gray
        let h = hue(col);
        let s = saturation(col);
        let b = brightness(col);

        let new_brt = map(b, 0, 100, 30, 50);
        //let new_sat = map(s,0,100,20,80);
        let new_col = color(h, 0, new_brt);
        set(i, j, new_col);
      }
    }
    renderCounter = renderCounter + num_lines_to_draw;
    updatePixels();
  }
  else if (curLayer == 1) { //Halo around cat
   for(let i=0; i<200; i++) {
      // let x1 = random(0, width);
      // let y1 = random(0, height);
      let x1 = 1440;
      let y1 = height/2;
     

      let mask = maskImg.get(x1, y1);
     if(mask[1] > 128) {
   noStroke();
    colorMode(RGB);

        // for(i=0;i<59;i++){
          fill(245, 245, 73);
          ellipse(x1,y1, 1050);

          fill(245, 245, 93);
          ellipse(x1,y1, 950);

          fill(247, 247, 105);
          ellipse(x1,y1, 850);

          fill(247, 247, 99);
          ellipse(x1,y1, 750);

          fill(247, 247, 129); 
          ellipse(x1, y1, 650);  

          fill(245, 245, 169); 
          ellipse(x1, y1, 550);  

          fill(245, 245, 179); 
          ellipse(x1, y1, 450); 

          fill(245, 245, 200); 
          ellipse(x1, y1, 350);  
      
        fill(245, 245, 215); //less opaque white at center of halo
        ellipse(x1, y1, 250);

        fill(255,255,255); //white at center of halo
        ellipse(x1, y1, 150);

     //}
        // fill(255,255,0);
        // ellipse(x1-40, y1, 20);
        // ellipse(x1+40, y1, 20);

        // fill(255);
        // ellipse(x1-20, y1, 20);
        // ellipse(x1+20, y1, 20);


        // colorMode(HSB,255);
        // const c = color('hsb(62, 150%, 100%)');
        // fill(c);
        // ellipse(x1, y1, 80);
        
      }
    }
    renderCounter = renderCounter + 1;
  }
  else { //elements on top of cat and on top of background
    
    for(let i=0; i<100; i++) {
      let x1 = random(0, width);
      let y1 = random(0, height);
      let x2 = x1 + random(-10, 10);
      let y2 = y1 + random(-10, 10);
      colorMode(RGB);
      let pix = sourceImg.get(x1, y1);
      let mask = maskImg.get(x1, y1);
      let col = color(pix);
     
      
      fill(col);
      if(mask[1] > 128) {
       
        ellipse(x1, y1, 10);
      } 
    }
    renderCounter = renderCounter + 1;
    // set(i, j, new_col);
  }
  // print(renderCounter);
  if(curLayer == 0 && renderCounter > 1080) {
    curLayer = 1;
    renderCounter = 0;
    print("Switching to curLayer 1");
  }
  if(curLayer == 1 && renderCounter > 500) {
    curLayer = 2;
    renderCounter = 0;
    print("Switching to curLayer 2");
  }
  else if(curLayer == 2 && renderCounter > 1500) {
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

// let sourceImg=null;
// let maskImg=null;
// let renderCounter=0;

// // change these three lines as appropiate
// let sourceFile = "input_5.jpg";
// let maskFile   = "mask_5.png";
// let outputFile = "output_1.png";

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

// function draw () {
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

//   // function draw () {
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

//   updatePixels();
//   renderCounter = renderCounter + 1;
//   print(renderCounter);
//   if(renderCounter > 1080) {
//     console.log("Done!")
//     noLoop();
//     // uncomment this to save the result
//     // saveArtworkImage(outputFile);
//   }
// }

// function keyTyped() {
//   if (key == '!') {
//     saveBlocksImages();
//   }
// }