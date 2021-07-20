// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '267',
    width: '640',
    videoId: 'NIJmSun-6gA',
    playerVars: {
    'playsinline': 0,
    'listType':'user_uploads',
    'modestbranding':1
    },
    // events: {
    // 'onReady': onPlayerReady,
    // 'onStateChange': onPlayerStateChange
    // }
});
}

// 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//     event.target.playVideo();
// }

const   base_R = 204,
        base_G = 190,
        base_B = 204,
        dark_R = 29,
        dark_G = 28,
        dark_B = 29,
        pink_R = 232,
        pink_G = 74,
        pink_B = 103;
let     level = 0.8, // 0 = no static, 1 = more static
        videoLevel = 0.5;

const   videoSteadyState = 0.5,
        videoDelta = -0.001;

console.log('Gridlock Website');



let mapImageData;
function loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}
async function loadAlphaMap() {
    let canvas = document.querySelector('#map-canvas');
    let ctx = canvas.getContext('2d');
    let img = await loadImage("gridlock-alpha-map.png");
    ctx.drawImage(img, 0, 0);
    let data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    return data;
}
async function startStatic() {
    mapImageData = await loadAlphaMap();
    renderVideoStatic();
}
startStatic();

// let checkerize = false;
let animationOffset = true;
videoLevel = 1;
let videoCanvas = document.querySelector('#video-canvas');
function renderVideoStatic() {
    requestAnimationFrame(renderVideoStatic);
    if (animationOffset) {
        if (videoLevel > videoSteadyState) {
            videoLevel += videoDelta;
        }
        let ctx = videoCanvas.getContext("2d");
        // get canvas pixel data
        let imgData;
        imgData = ctx.createImageData(videoCanvas.width, videoCanvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            let value = Math.random();
            // imgData.data[i] = mapImageData[i];
            // imgData.data[i+1] = mapImageData[i+1];
            // imgData.data[i+2] = mapImageData[i+2];
            // imgData.data[i+3] = mapImageData[i+3];
            // console.log(mapImageData);
            if (value < mapImageData[i+3]/256) {
                imgData.data[i] = pink_R;
                imgData.data[i+1] = pink_G;
                imgData.data[i+2] = pink_B;
                imgData.data[i+3] = 192;
            } else {
                // imgData.data[i] = base_R;
                // imgData.data[i+1] = base_G;
                // imgData.data[i+2] = base_B;
                // imgData.data[i+3] = 255;
            }
        }
        // Put the modified data back
        ctx.putImageData(imgData, 0, 0);
    } else {
        // do nothing
    }
    animationOffset = !animationOffset;
}

const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    videoCanvas.style.opacity = '0';
    player.playVideo();
});














// Regular Monochrome Static
// function renderStatic() {
//     requestAnimationFrame(renderStatic);
    
//     let ctx = canvas.getContext("2d");
    
//     // get canvas pixel data
//     let imgData = ctx.createImageData(canvas.width, canvas.height);
    
//     // Data is packed in a 1 Dimensional 8Bit Int Array in RGBA format
//     // IE Data[0] = R value ... Data[3] = A value
//     // Skip a head by 4 each loop to achieve this
//     for (let i = 0; i < imgData.data.length; i += 4) {
//     // Static is basically random monochrome pixels
//     // Choose a random value
//     let value = (Math.random() * 255) | 0;
    
//     // Set all colour elements to the same value for a random greyscale pixel
//     imgData.data[i] = value;
//     imgData.data[i + 1] = value;
//     imgData.data[i + 2] = value;
    
//     // Set A element to 255 for max opacity
//     imgData.data[i + 3] = 255;
//     }
    
//     // Put the modified data back
//     ctx.putImageData(imgData, 0, 0);
// }



// let backgroundCanvas = document.querySelector('#background-canvas');
// let ctx = backgroundCanvas.getContext('2d');
// function renderStatic(canvas) {
//     requestAnimationFrame(renderStatic(canvas));
    
//     let ctx = canvas.getContext("2d");
    
//     // get canvas pixel data
//     let imgData = ctx.createImageData(canvas.width, canvas.height);
    
//     // Data is packed in a 1 Dimensional 8Bit Int Array in RGBA format
//     // IE Data[0] = R value ... Data[3] = A value
//     // Skip a head by 4 each loop to achieve this
//     for (let i = 0; i < imgData.data.length; i += 4) {
//         // let gradientLevel = i / imgData.data.length;
//         let value = Math.random();
//         if (value > level) {
//             imgData.data[i] = dark_R;
//             imgData.data[i+1] = dark_G;
//             imgData.data[i+2] = dark_B;
//             imgData.data[i+3] = 25;
//         } else {
//             imgData.data[i+3] = 0;
//         }
//     }
    
//     // Put the modified data back
//     ctx.putImageData(imgData, 0, 0);
// }
// renderStatic(backgroundCanvas);


        // if (!checkerize) {
            
        // } else {
        //     imgData = ctx.getImageData(0, 0, videoCanvas.width, videoCanvas.height);
        //     for (let i = 0; i < imgData.data.length; i += 4) {
        //         if (i % 8 == 0) {
        //             let value = Math.random();
        //             if (value > 0.1 && imgData.data[i] == pink_R) {
        //                 // leave it alone
        //             } else {
        //                 let value = Math.random();
        //                 if (value > videoLevel) {
        //                     imgData.data[i] = pink_R;
        //                     imgData.data[i+1] = pink_G;
        //                     imgData.data[i+2] = pink_B;
        //                     imgData.data[i+3] = 255;
        //                 } else {
        //                     imgData.data[i] = base_R;
        //                     imgData.data[i+1] = base_G;
        //                     imgData.data[i+2] = base_B;
        //                     imgData.data[i+3] = 255;
        //                 }
        //             }
        //         } else {
        //             let value = Math.random();
        //             if (value > 0.1 && imgData.data[i] == base_R) {
        //                 // leave it alone
        //             } else {
        //                 let value = Math.random();
        //                 if (value > videoLevel) {
        //                     imgData.data[i] = pink_R;
        //                     imgData.data[i+1] = pink_G;
        //                     imgData.data[i+2] = pink_B;
        //                     imgData.data[i+3] = 255;
        //                 } else {
        //                     imgData.data[i] = base_R;
        //                     imgData.data[i+1] = base_G;
        //                     imgData.data[i+2] = base_B;
        //                     imgData.data[i+3] = 255;
        //                 }
        //             }
        //         }
        //     }
        // }
        