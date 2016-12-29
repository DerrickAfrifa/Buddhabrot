var iterations = 2000;
var escaped;
var minRad = -2;
var maxRad = 2;
var heatmap;

function initialiseHeatmap(){
    heatmap = new Array();
    for(var row=0; row<width; row++){
        heatmap[row] = new Array();
        for(var col=0; col<height; col++){
            heatmap[row][col] = 0;
        }
    }
}

function buddhabrot(){
    escaped = new Array();

    for(var j=0; j<100000; j++){
            var xOnScreen = Math.round(random(0, width));
            var yOnScreen = Math.round(random(0, height));

            var xOnPlane = map(xOnScreen, 0, width, minRad, maxRad);
            var yOnPlane = map(yOnScreen, 0, height, minRad, maxRad);

            var xOnPlaneC = xOnPlane;
            var yOnPlaneC = yOnPlane;

            var i;
            for(i=0; i<iterations; i++){
                var real = Math.pow(xOnPlane,2) - Math.pow(yOnPlane,2);
                var imaginary = 2*xOnPlane*yOnPlane;

                xOnPlane = real + xOnPlaneC;
                yOnPlane = imaginary + yOnPlaneC;

                if(Math.pow(real, 2) + Math.pow(imaginary, 2) > Math.pow(2,2)) break;
            }

            if(i != iterations){
                escaped.push([xOnScreen, yOnScreen]);
            }
    }

    for(var k=0; k < escaped.length; k++){
        var escapedX = escaped[k][0];
        var escapedY = escaped[k][1];

        var xOnPlane = map(escapedX, 0, width, maxRad, minRad);
        var yOnPlane = map(escapedY, 0, height, maxRad, minRad);

        var xOnPlaneC = xOnPlane;
        var yOnPlaneC = yOnPlane;

        for(i=0; i < iterations; i++){
            var real = Math.pow(xOnPlane,2) - Math.pow(yOnPlane,2);
            var imaginary = 2*xOnPlane*yOnPlane;

            xOnPlane = real + xOnPlaneC;
            yOnPlane = imaginary + yOnPlaneC;

            if(Math.pow(xOnPlane, 2) + Math.pow(yOnPlane, 2) > Math.pow(2,2)) break;

            var hx = Math.round(map(xOnPlane, minRad, maxRad, 0, width));
            var hy = Math.round(map(yOnPlane, minRad, maxRad, 0, height));

            try{
                heatmap[hx][hy] += 0.02;
            }catch(e){}
        }
    }
}


function setup(){
    createCanvas(1000, 1000);
    background(0);
    initialiseHeatmap();
    img = createImage(width, height);

    for(var i=0; i<50; i++){
        //console.log(i);
        buddhabrot();
    }

    img.loadPixels();
    for(var k=0; k < heatmap.length; k++){
        var heatRow = heatmap[k];
        for(var l=0; l < heatRow.length; l++){
            var heat = heatmap[k][l];
            img.set(l, k, Math.round(heat));
        }
    }
    img.updatePixels();
    console.log("finished");
    image(img, 0, 0);
}

function draw(){

}
