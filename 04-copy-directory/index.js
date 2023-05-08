const fsPromises = require('fs/promises');
const path = require('path');

async function copyDir() {
    const sourceFolder = path.join(__dirname, 'files');
    const destinationFolder = path.join(__dirname, 'files-copy');

    await fsPromises.mkdir(destinationFolder, { recursive: true }); // создаем папку files-copy, если она не существует
    const files = await fsPromises.readdir(sourceFolder, { withFileTypes: true }); // читаем содержимое папки files

    for (const file of files) { // копируем файлы из папки files в папку files-copy
        const sourcePath = path.join(sourceFolder, file.name);
        const destinationPath = path.join(destinationFolder, file.name);

        if (file.isFile()) {
            try { // try {} catch {} является конструкцией обработки ошибок в JavaScript. Блок try содержит код, который может вызвать ошибку. Если во время выполнения кода происходит ошибка, то выполнение переходит к блоку catch, где ошибка обрабатывается.
                await fsPromises.copyFile(sourcePath, destinationPath);
                console.log(`Файл ${file.name} скопирован в ${destinationFolder}`);
            } catch (err) {
                console.error(`Ошибка копирования файла ${file.name}: ${err}`);
            }
        };
    };
}



copyDir();
