const resolve = require('path').resolve
const fs = require('fs')
const sharp = require('sharp');

// joining path of directory
const inputFolder = 'test'
const outputFolder = 'image2'

const jpgOption = {
  quality: 60,
  trellisQuantisation: true,
  optimizeScans: true,
  quantisationTable: 4,
  force: false
}
const webpOption = {
  quality: 75
}
const resizeSize = [320, 480, 600, 720, 1024, 1440, 1920, 2560]
const directoryPath = resolve(__dirname, `./public/image/frames`)
// passsing directoryPath and callback function
fs.readdir(directoryPath, (err, files) => {
  // handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }

  files.forEach((file, index) => {

    let name = file.slice(0, -4)

      sharp(`./public/image/frames/${file}`)
      // .trim(50)
        .resize(1920, 1000)
        // .extend({
        //   top: -10,
        //   bottom: -50,
        //   left: 10,
        //   right: 10,
        //   background: { r: 0, g: 0, b: 0, alpha: 0 }
        // })
        .webp(webpOption)
        .toFile(`./public/image/frames2/${name}.webp`)

  })
})