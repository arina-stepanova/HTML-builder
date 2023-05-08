const fs = require('fs');
const path = require('path');

// создание константы с путем к папке styles и папке project-dist
const stylesFolderPath = path.join(__dirname, 'styles');
const projectDistFolderPath = path.join(__dirname, 'project-dist');

const styles = []; // создание массива styles и чтение содержимого папки styles

fs.readdir(stylesFolderPath, {withFileTypes: true}, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach((file) => {
        // проверяем, является ли объект файлом и имеет ли файл нужное расширение
        if (file.isFile() && path.extname(file.name) === '.css') {
            // читаем файл стилей
            fs.readFile(path.join(stylesFolderPath, file.name), 'utf8', (err, data) => {
                if (err) {
                    console.error(`Ошибка чтения файла ${file.name}: ${err}`);
                    return;
                }

                styles.push(data); // добавляем содержимое файла в массив стилей

                // если это последний файл в папке, записываем массив стилей в файл bundle.css
                if (styles.length === files.filter((f) => f.isFile() && path.extname(f.name) === '.css').length) {
                    const bundleCSS = styles.join('\n');

                    fs.writeFile(path.join(projectDistFolderPath, 'bundle.css'), bundleCSS, (err) => {
                        if (err) {
                            console.error(`Ошибка чтения файла: ${err}`);
                            return;
                        }
                        console.log('Файлы были объединены!');
                    });
                }
            });
        }
    });
});
