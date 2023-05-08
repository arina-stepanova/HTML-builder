const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt'); // путь к файлу
const readStream = fs.createReadStream(filePath); // создаем поток чтения
readStream.pipe(process.stdout); // направляем поток чтения в стандартный поток вывода
