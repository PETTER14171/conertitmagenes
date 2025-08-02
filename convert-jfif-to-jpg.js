const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = './imagenes'; // carpeta donde están tus .jfif
const outputDir = './convertidas'; // carpeta para guardar .jpg

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
    if (err) return console.error('Error leyendo la carpeta:', err);

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.jfif') {
            const inputPath = path.join(inputDir, file);
            const outputFile = path.basename(file, '.jfif') + '.jpg';
            const outputPath = path.join(outputDir, outputFile);

            sharp(inputPath)
                .jpeg()
                .toFile(outputPath)
                .then(() => {
                    console.log(`Convertido: ${file} -> ${outputFile}`);
                })
                .catch(err => {
                    console.error(`Error al convertir ${file}:`, err);
                });
        }
    });
});
