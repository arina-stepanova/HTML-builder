const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder'); // объявляем путь к директории secret-folder с помощью метода path.join

fs.readdir(folderPath, (err, files) => { // метод fs.readdir, который принимает путь к директории и функцию обратного вызова, которая получает список файлов
  if (err) {
    console.error(err);
    return;
  }

  for (const file of files) { // цикл for для прохода по списку файлов и для каждого файла вызываем метод fs.stat, , который возвращает информацию о файле, такую как размер, даты создания и изменения, и другое
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (!stats.isDirectory()) { // если файл не является директорией, мы используем метод path.parse, чтобы получить информацию об имени и расширении файла, и метод console.log, чтобы вывести информацию в консоль
        const {name, ext} = path.parse(file);
        const sizeInKB = stats.size / 1024;
        console.log(`${name}${ext} - ${sizeInKB.toFixed(3)}kb`);
      }
    });
  }
});
