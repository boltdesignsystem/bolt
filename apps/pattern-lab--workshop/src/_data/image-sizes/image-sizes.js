const imageSizes = require('./image-sizes.data.json').boltImageSizes;

module.exports.sizes = imageSizes;


// export const ImageSizes = [
//   50,
//   100,
//   200,
//   320,
//   480,
//   640,
//   800,
//   1024,
//   1366,
//   1536,
//   1920,
//   2560,
//   2880
// ];
  
// };

// { width: 50, upscale: false },
// { width: 100, upscale: false },
// { width: 200, upscale: false },
// { width: 320, upscale: false },
// { width: 480, upscale: false },
// { width: 640, upscale: false },
// { width: 800, upscale: false },
// { width: 1024, upscale: false },
// { width: 1366, upscale: false },
// { width: 1536, upscale: false },
// { width: 1920, upscale: false },
// { width: 2560, upscale: false },
// { width: 2880, upscale: false }

// export type Size = typeof Sizes;

// export function cssClassForSize(
//   size: string,
//   prefix: string
// ) {
//   return Sizes.hasOwnProperty(size) ? `${prefix}${size}` : null;
// }



// $url = 'data.json'; // path to your JSON file
// $data = file_get_contents($url); // put the contents of the file into a variable
// $characters = json_decode($data); // decode the JSON feed

// // echo $characters[0] ->name;

// // foreach($characters as $character) {
// //   echo $character->name. '<br>';
// // }
