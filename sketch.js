let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let curLayer = 0;



let maskCenter = null;


// change these three lines as appropiate
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

  maskCenterSearch2(20);
}
/*for editing purposes*/
let X_STOP = 1920;
let Y_STOP = 1080;

function maskCenterSearch2(min_width) {
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

// function maskCenterSearch(min_width) {
//   let max_up_down = 0;
//   let max_left_right = 0;
//   let max_x_index = 0;
//   let max_y_index = 0;

//   // first scan all rows top to bottom
//   print("Scanning mask top to bottom...")
//   for(let j=0; j<Y_STOP; j++) {
//     // look across this row left to right and count
//     let mask_count = 0;
//     for(let i=0; i<X_STOP; i++) {
//       let mask = maskImg.get(i, j);
//       if (mask[1] > 128) {
//         mask_count = mask_count + 1;
//       }
//     }
//     // check if that row sets a new record
//     if (mask_count > max_left_right) {
//       max_left_right = mask_count;
//       max_y_index = j;
//     }
//   }

//     // now scan once left to right as well
//     print("Scanning mask left to right...")
//     for(let i=0; i<X_STOP; i++) {
//       // look across this column up to down and count
//       let mask_count = 0;
//       for(let j=0; j<Y_STOP; j++) {
//         let mask = maskImg.get(i, j);
//         if (mask[1] > 128) {
//           mask_count = mask_count + 1;
//         }
//       }
//       // check if that row sets a new record
//       if (mask_count > max_up_down) {
//         max_up_down = mask_count;
//         max_x_index = i;
//       }
//     }

//     print("Scanning mask done!")
//     if (max_left_right > min_width && max_up_down > min_width) {
//       maskCenter = [max_x_index, max_y_index];
      
//     }
// }



function draw () {
  if (curLayer == 0) { //background
    let num_lines_to_draw = 40; 
    // get one scanline
    for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<Y_STOP; j++) {
      for(let i=0; i<X_STOP; i++) {
        colorMode(RGB);

          /*greyed out code*/
          let pix = sourceImg.get(i, j);
          // create a color from the values (always RGB)
          let col = color(pix);
          // set(i, j, col);
          
          
          colorMode(HSB, 360, 100, 100);
          // draw a "dimmed" version in gray
          let h = hue(col);
          let s = saturation(col);
          let b = brightness(col);
  
          let new_brt = map(b, 0, 50, 30, 50);
        //  let new_sat = map(s,0,100,20,80);
          let new_col = color(50, 80, new_brt); //60 saturation is nice and 50 hue is nice
          // let new_col = color(h, 0, new_brt);
          
          set(i, j, new_col);
        
      
      }
    }
  
    renderCounter = renderCounter + num_lines_to_draw;
    updatePixels();
  }

  else if (curLayer == 1) { 
    
  /*blurry effect in background using ellipses with different transparencies*/ 

  colorMode(RGB);
  for (let i = 0; i < 40; i++) {
    let size = random(500);
    let x = random(1920);
    let y = random(1080)
    fill(255,255,255, 20);
    ellipse(x,y, size)
  }

  
/*Halo around my cat that utilises 25% opacity to create a glow effect */
    
      if (maskCenter !== null) {
      
        fill(255, 255, 255);
       
        ellipse(maskCenter[0], maskCenter[1], 50);
      
      }
  

      /*Working out the placement of my ellipses based on each image and its mask */
      
      /*input 1*/
      // let halox = 960;
      // let haloy = 540; 

       //input 2
      //  let halox = 1190;
      //  let haloy = 680; 

        /*input 3*/
        // let halox = 770;
        // let haloy = 700; 

         /*input 4*/
        //  let halox = 960;
        //  let haloy = 450; 

        /*input 5*/
        // let halox = 1120;
        // let haloy = 600; 

      /*input 6*/
      //    let halox = 1440;
      // let haloy = 500; 

      /*spare code for if I want to find the center of the mask – doesn't work on all images */
      let halox = maskCenter[0];
      let haloy = maskCenter[1];


   noStroke();
   colorMode(RGB);
   
   
   fill(245, 245, 73,50);
   ellipse(halox ,haloy, 1050);

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

   
//   let halox = [960,1190,770,960,1120,1440];
//    let haloy = [540,690,700,450,600,500];
//    let cur_halo_x = 0;
//     let cur_halo_y = 0;
//     if((sourceFile == "input_1.jpg" ) && (maskFile == "mask_1.png")){
//         cur_halo_x = halox[0];
//         cur_halo_y = haloy[0];
//     }
//     if((sourceFile == "input_2.jpg") && (maskFile == "mask_2.png")){
//         cur_halo_x = halox[1];
//         cur_halo_y = haloy[1];
//     }
//     if((sourceFile == "input_3.jpg") && (maskFile == "mask_3.png")){
//       cur_halo_x = halox[2];
//       cur_halo_y = haloy[2];
//   }
//   if((sourceFile == "input_4.jpg") && (maskFile == "mask_4.png")){
//     cur_halo_x = halox[3];
//     cur_halo_y = haloy[3];
// }
// if((sourceFile == "input_5.jpg") && (maskFile == "mask_5.png")){
//   cur_halo_x = halox[4];
//   cur_halo_y = haloy[4];
// }
// if((sourceFile == "input_6.jpg") && (maskFile == "mask_6.png")){
//   cur_halo_x = halox[5];
//   cur_halo_y = haloy[5];
// }
//     // the ellipse code for the halo responding to the above if statements
//     if((cur_halo_x != 0) && (cur_halo_y != 0)) {
//       fill(245, 245, 73,50);
//       ellipse(cur_halo_x ,cur_halo_y, 1050);

//       fill(245, 245, 93,50);
//       ellipse(cur_halo_x, cur_halo_y, 950);

//       fill(247, 247, 105,50);
//       ellipse(cur_halo_x, cur_halo_y, 850);

//       fill(247, 247, 99,50);
//       ellipse (cur_halo_x, cur_halo_y, 750);

//       fill(247, 247, 129,50); 
//       ellipse(cur_halo_x, cur_halo_y, 650);  

//       fill(245, 245, 169,50); 
//       ellipse(cur_halo_x, cur_halo_y, 550);  

//       fill(245, 245, 179,50); 
//       ellipse(cur_halo_x, cur_halo_y, 450); 

//       fill(245, 245, 200,50); 
//       ellipse(cur_halo_x, cur_halo_y, 350);  
  
//     fill(245, 245, 215,50); 
//     ellipse(cur_halo_x, cur_halo_y, 250);

//     fill(255,255,255,50); //white at center of halo with a low opacity
//     ellipse(cur_halo_x, cur_halo_y, 150);
//     }
  
  
    renderCounter = renderCounter + 1;

   
    
  }
  else { /*elements on top of cat and on top of background*/
    
    for(let i=0; i<100; i++) {
      let x1 = random(0, width);
      let y1 = random(0, height);
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
  if(curLayer == 1 && renderCounter > 1) {
    curLayer = 2;
    renderCounter = 0;
    print("Switching to curLayer 2");
  }
  else if(curLayer == 2 && renderCounter > 1500) {
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

