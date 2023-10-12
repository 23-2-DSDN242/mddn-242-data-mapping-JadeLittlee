let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let curLayer = 0;

let maskCenter = null;


// These lines control which image (1-6) that you see when you view the render program
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
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
  background(255,255,0, 100);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  colorMode(HSB);

  maskCenterSearch(20);
}
/*for editing purposes when adjusting the code*/
let X_STOP = 1920; //width of canvas
let Y_STOP = 1080; //height of canvas

function maskCenterSearch(min_width) {
  // we store the sum of x,y whereever the mask is on
  // at the end we divide to get the average
  let mask_x_sum = 0;
  let mask_y_sum = 0;
  let mask_count = 0;

  // first scan all rows top to bottom
  print("Scanning mask top to bottom...")
  for(let j=0; j<Y_STOP; j++) {
    // look across this row left to right and count
    for(let i=0; i<X_STOP; i++) {
      let mask = maskImg.get(i, j);
      if (mask[1] > 128) {
        mask_x_sum = mask_x_sum + i;
        mask_y_sum = mask_y_sum + j;
        mask_count = mask_count + 1;
      }
    }
  }

  print("Scanning mask done!")
  if (mask_count > min_width) {
    let avg_x_pos = int(mask_x_sum / mask_count);
    let avg_y_pos = int(mask_y_sum / mask_count);
    maskCenter = [avg_x_pos, avg_y_pos];
    print("Center set to: " + maskCenter);
  }
}



function draw () {
  if (curLayer == 0) { //background layer – the original image and the yellow tinge applied to this image
    let num_lines_to_draw = 40; 
    // get one scanline
    for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<Y_STOP; j++) {
      for(let i=0; i<X_STOP; i++) {
        colorMode(RGB);

          let pix = sourceImg.get(i, j);
          // create a color from the values (always RGB)
          let col = color(pix);
          
          colorMode(HSB, 360, 100, 100);
          let b = brightness(col);
  
          //drawing a yellow background that utilises hue, saturation, and brightness
          let new_brt = map(b, 0, 50, 30, 50);
          let new_col = color(50, 80, new_brt); 
      
          set(i, j, new_col);
        
      }
    }
  
    renderCounter = renderCounter + num_lines_to_draw;
    updatePixels();
  }

  else if (curLayer == 1) { //layer 2 with the second layer of the background (the low opacity white ellipses), and the halo around my cat
    
  /*blurry/faded (bokeh) effect in background using white ellipses with 20% opacity*/ 

  colorMode(RGB);
  for (let i = 0; i < 40; i++) {
    let size = random(500);
    let x = random(1920);
    let y = random(1080)
    fill(255,255,255, 20);
    ellipse(x,y, size); //This is how the bokeh effect is being drawn
  }

  
/*Halo around my cat that utilises 50% opacity to create a glow effect */
    
      if (maskCenter !== null) {
        fill(255, 255, 255); //white
        ellipse(maskCenter[0], maskCenter[1], 50); //this is a small white ellipse that is placed at the center of the mask to help identify where the code has found the center (not for design purposes - purely for understanding where the center of the mask is).
      }

      /*This takes the center of the mask and applies the halo where the center is */
      let halox = maskCenter[0];
      let haloy = maskCenter[1];


   noStroke();
   colorMode(RGB);
   
   //These 10 ellipses and there fill colour make up the halo design.
   fill(245, 245, 73,50);
   ellipse(halox ,haloy, 1050); //outer-most ellipse

   fill(245, 245, 93,50);
      ellipse(halox, haloy, 950);

      fill(247, 247, 105,50);
      ellipse(halox, haloy, 850);

      fill(247, 247, 99,50);
      ellipse (halox, haloy, 750);

      fill(247, 247, 129,50); 
      ellipse(halox, haloy, 650);  

      fill(245, 245, 169,50); 
      ellipse(halox, haloy, 550);  

      fill(245, 245, 179,50); 
      ellipse(halox, haloy, 450); 

      fill(245, 245, 200,50); 
      ellipse(halox, haloy, 350);  
  
    fill(245, 245, 215,50); 
    ellipse(halox, haloy, 250);

    fill(255,255,255,50); //white at center of halo with a low opacity
    ellipse(halox, haloy, 150);

    renderCounter = renderCounter + 1;

  }
  else { /*This is drawing the small ellipses on top of my cat – giving that soft pixelation effect*/
    
    for(let i=0; i<100; i++) {
      let x1 = random(0, width);
      let y1 = random(0, height);
      colorMode(RGB);
      let pix = sourceImg.get(x1, y1);
      let mask = maskImg.get(x1, y1);
      let col = color(pix); //this takes the true colours of my cat and applies this colour to the small ellipses
     
      
      fill(col);
      if(mask[1] > 128) {
       
        ellipse(x1, y1, 10); // this draws all the ellipses at point size 10, and they're all drawn randomly within the mask
      } 
    }
    renderCounter = renderCounter + 1;
    
  }
  // print(renderCounter);
  if(curLayer == 0 && renderCounter > 1080) { //this is the yellow background layer
    curLayer = 1;
    renderCounter = 0;
    print("Switching to curLayer 1");
  }
  if(curLayer == 1 && renderCounter > 1) { //this is the background bokeh ellipses and the halo layer
    curLayer = 2;
    renderCounter = 0;
    print("Switching to curLayer 2");
  }
  else if(curLayer == 2 && renderCounter > 1500) { //this is the layer for the cat mask and the pixelation (using small ellipses) effect on top of the cat
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
   //saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}

