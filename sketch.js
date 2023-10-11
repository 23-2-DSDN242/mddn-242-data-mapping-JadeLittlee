let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let curLayer = 0;



let maskCenter = null;
let maskCenterSize = null;

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

  maskCenterSearch(20);
}
/*for editing purposes*/
let X_STOP = 1920;
let Y_STOP = 1080;

function maskCenterSearch(min_width) {
  let max_up_down = 0;
  let max_left_right = 0;
  let max_x_index = 0;
  let max_y_index = 0;

  // first scan all rows top to bottom
  print("Scanning mask top to bottom...")
  for(let j=0; j<Y_STOP; j++) {
    // look across this row left to right and count
    let mask_count = 0;
    for(let i=0; i<X_STOP; i++) {
      let mask = maskImg.get(i, j);
      if (mask[1] > 128) {
        mask_count = mask_count + 1;
      }
    }
    // check if that row sets a new record
    if (mask_count > max_left_right) {
      max_left_right = mask_count;
      max_y_index = j;
    }
  }

    // now scan once left to right as well
    print("Scanning mask left to right...")
    for(let i=0; i<X_STOP; i++) {
      // look across this column up to down and count
      let mask_count = 0;
      for(let j=0; j<Y_STOP; j++) {
        let mask = maskImg.get(i, j);
        if (mask[1] > 128) {
          mask_count = mask_count + 1;
        }
      }
      // check if that row sets a new record
      if (mask_count > max_up_down) {
        max_up_down = mask_count;
        max_x_index = i;
      }
    }

    print("Scanning mask done!")
    if (max_left_right > min_width && max_up_down > min_width) {
      maskCenter = [max_x_index, max_y_index];
      maskCenterSize = [max_left_right, max_up_down];
    }
}



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
         
          
        // /*blurry code*/
        // let pix = [0,0,0,255]
        // let mask = maskImg.get(i, j);
        // if (mask[1] > 128) {
        //   pix = sourceImg.get(i, j);
        // }
        // else {
        //   let sum_rgb =  [0,0,0];
        //   let num_cells = 0;
        //   for(let wx=-OFFSET;wx<OFFSET; wx++){
        //   for(let wy=-OFFSET;wy<OFFSET; wy++){
        //     let pix = sourceImg.get(i+wx, j+wy);
        //     for(let c=0; c<3; c++) {
        //       sum_rgb[c] += pix[c];
        //     }
        //     num_cells += 1;
        //   }
        //   }
        //   for(let c=0; c<3; c++) {
        //     pix[c] = int(sum_rgb[c]/num_cells);
        //   }
        // }
        // set(i, j, pix);
      
      }
    }
  
    renderCounter = renderCounter + num_lines_to_draw;
    updatePixels();
  }

  else if (curLayer == 1) { 
    
  /*blurry effect in background using ellipses with different transparencies*/ 

  //rectangle white wash for over the yellow
  colorMode(RGB);
  fill(255,255,255,40);
  rect(0,0,1920,1080);

  //yellow ellipses

  //  colorMode(RGB);
  // fill(255,255,255, 20);
  //  ellipse(width/2,height/2,500); //center circle

  //  fill(255,255,255, 20);
  //  ellipse(width/2-50,height/2-350,600); //middle of the top row of ellipses 

  //  fill(255,255,255, 20);
  //  ellipse(width/2,height/2+350,600); //middle bottom

  //  fill(255,255,255, 20);
  //  ellipse(width/2-450,height/2+350,600); //second from the left at the bottom

  //  fill(255,255,255, 20);
  //  ellipse(150,height/2-300,600); //top left corner

  //  fill(255,255,255, 20);
  //  ellipse(150,height/2+120,450); //middle left corner

  //  fill(255,255,255, 20);
  //  ellipse(1750,height/2-350,500); //top right corner

  //  fill(255,255,255, 20);
  //  ellipse(1700,height/2,600); //middle right 

  //  fill(255,255,255, 20);
  //  ellipse(100,height/2+450,400); //bottom left corner

  //  fill(255,255,255, 20);
  //  ellipse(500,height/2-400,500); //second from the left at the top

  //  fill(255,255,255, 20);
  //  ellipse(1350,height/2-350,600); //second from the right at the top

  //  fill(255,255,255, 20);
  //  ellipse(500,height/2,500); // second from the middle on the left

  //  fill(255,255,255, 20);
  //  ellipse(1300,height/2+100,400); // second from the middle on the right

  //  fill(255,255,255, 20);
  //  ellipse(1400,height/2+400,500);  //second from the right at the bottom

  //  fill(255,255,255, 20);
  //  ellipse(1800,height/2+400,600);  //bottom right corner


    //gray ellipses
  // colorMode(RGB);
  // fill(128,128,128, 50);
  //  ellipse(width/2,height/2,500); //center circle

  //  fill(169,169,169, 50);
  //  ellipse(width/2-50,height/2-350,600); //middle of the top row of ellipses 

  //  fill(128,128,128, 75);
  //  ellipse(width/2,height/2+350,600); //middle bottom

  //  fill(128,128,128, 100);
  //  ellipse(width/2-450,height/2+350,600); //second from the left at the bottom

  //  fill(128,128,128,50);
  //  ellipse(150,height/2-300,600); //top left corner

  //  fill(169,169,169, 100);
  //  ellipse(150,height/2+120,450); //middle left corner

  //  fill(169,169,169, 50);
  //  ellipse(1750,height/2-350,500); //top right corner

  //  fill(128, 128,128, 50);
  //  ellipse(1700,height/2,600); //middle right 

  //  fill(169,169,169, 50);
  //  ellipse(100,height/2+450,400); //bottom left corner

  //  fill(128,128,128, 50);
  //  ellipse(500,height/2-400,500); //second from the left at the top

  //  fill(128,128,128, 50);
  //  ellipse(1350,height/2-350,600); //second from the right at the top

  //  fill(120,120,120, 50);
  //  ellipse(500,height/2,500); // second from the middle on the left

  //  fill(169,169,169, 50);
  //  ellipse(1300,height/2+100,400); // second from the middle on the right

  //  fill(169,169,169, 50);
  //  ellipse(1400,height/2+400,500);  //second from the right at the bottom

  //  fill(169,169,169, 100);
  //  ellipse(1800,height/2+400,600);  //bottom right corner


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
  
  //     if((sourceFile == "input_1.jpg" ) && (maskFile == "mask_1.png")){
        

  //         fill(245, 245, 73,25);
  //         ellipse(halox[0] ,haloy[0], 1050);

  //         fill(245, 245, 93,25);
  //         ellipse(halox[0], haloy[0], 950);

  //         fill(247, 247, 105,25);
  //         ellipse(halox[0], haloy[0], 850);

  //         fill(247, 247, 99,25);
  //         ellipse (halox[0], haloy[0], 750);

  //         fill(247, 247, 129,25); 
  //         ellipse(halox[0], haloy[0], 650);  

  //         fill(245, 245, 169,25); 
  //         ellipse(halox[0], haloy[0], 550);  

  //         fill(245, 245, 179,25); 
  //         ellipse(halox[0], haloy[0], 450); 

  //         fill(245, 245, 200,25); 
  //         ellipse(halox[0], haloy[0], 350);  
      
  //       fill(245, 245, 215,25); 
  //       ellipse(halox[0], haloy[0], 250);

  //       fill(255,255,255,25); //white at center of halo with a low opacity
  //       ellipse(halox[0], haloy[0], 150);
      
  //       }
  //     if((sourceFile == "input_2.jpg") && (maskFile == "mask_2.png")){
        


  //              fill(245, 245, 73,25);
  //              ellipse(halox[1] ,haloy[1], 1050);
     
  //              fill(245, 245, 93,25);
  //              ellipse(halox[1], haloy[1], 950);
     
  //              fill(247, 247, 105,25);
  //              ellipse(halox[1], haloy[1], 850);
     
  //              fill(247, 247, 99,25);
  //              ellipse (halox[1], haloy[1], 750);
     
  //              fill(247, 247, 129,25); 
  //              ellipse(halox[1], haloy[1], 650);  
     
  //              fill(245, 245, 169,25); 
  //              ellipse(halox[1], haloy[1], 550);  
     
  //              fill(245, 245, 179,25); 
  //              ellipse(halox[1], haloy[1], 450); 
     
  //              fill(245, 245, 200,25); 
  //              ellipse(halox[1], haloy[1], 350);  
           
  //            fill(245, 245, 215,25); 
  //            ellipse(halox[1], haloy[1], 250);
     
  //            fill(255,255,255,25); //white at center of halo with a low opacity
  //            ellipse(halox[1], haloy[1], 150);
  //       }
  //       if((sourceFile == "input_3.jpg") && (maskFile == "mask_3.png")){


  //         fill(245, 245, 73,25);
  //         ellipse(halox[2] ,haloy[2], 1050);

  //         fill(245, 245, 93,25);
  //         ellipse(halox[2], haloy[2], 950);

  //         fill(247, 247, 105,25);
  //         ellipse(halox[2], haloy[2], 850);

  //         fill(247, 247, 99,25);
  //         ellipse (halox[2], haloy[2], 750);

  //         fill(247, 247, 129,25); 
  //         ellipse(halox[2], haloy[2], 650);  

  //         fill(245, 245, 169,25); 
  //         ellipse(halox[2], haloy[2], 550);  

  //         fill(245, 245, 179,25); 
  //         ellipse(halox[2], haloy[2], 450); 

  //         fill(245, 245, 200,25); 
  //         ellipse(halox[2], haloy[2], 350);  
      
  //       fill(245, 245, 215,25); 
  //       ellipse(halox[2], haloy[2], 250);

  //       fill(255,255,255,25); //white at center of halo with a low opacity
  //       ellipse(halox[2], haloy[2], 150);
  //  }
           
          
        
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