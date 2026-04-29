const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

async function optimizeImage(inputName, outputDir, width, height, quality = 80) {
  const input = path.join('images', 'orig', inputName);
  const jpgOut = path.join(outputDir, inputName);
  const webpOut = path.join(outputDir, inputName.replace('.jpg', '.webp'));

  console.log(`Optimizing ${inputName}...`);

  await sharp(input)
}
