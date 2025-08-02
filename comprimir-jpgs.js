const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = './convertidas'; // Carpeta con imágenes .jpg
const outputDir = './comprimidas'; // Carpeta destino

const MAX_SIZE_KB = 190;

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Función para comprimir una imagen progresivamente
async function compressImage(inputPath, outputPath) {
    let quality = 90;
    let buffer;

    do {
        buffer = await sharp(inputPath)
            .jpeg({ quality })
            .toBuffer();

        if (buffer.length / 1024 <= MAX_SIZE_KB || quality <= 20) {
            break;
        }

        quality -= 5;
    } while (true);

    await sharp(buffer).toFile(outputPath);
    console.log(`✅ ${path.basename(inputPath)} comprimida (${Math.round(buffer.length / 1024)} KB) con calidad ${quality}`);
}

// Iterar todas las imágenes .jpg en la carpeta
fs.readdir(inputDir, (err, files) => {
    if (err) return console.error('Error leyendo la carpeta:', err);

    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.jpg') {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file);
            compressImage(inputPath, outputPath).catch(console.error);
        }
    });
});
