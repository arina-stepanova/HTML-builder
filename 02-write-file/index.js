const fs = require('fs'); // импорт модуля fs
const readline = require('readline'); // импорт модуля readline
const path = require('path'); // импорт модуля path

const filePath = path.join(__dirname, 'text.txt'); // переменная filePath, содержащая путь к файлу text.txt в текущей директории
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}); // интерфейс readline, который будет использоваться для чтения ввода пользователя из консоли

const writeToFile = (data) => {
  fs.appendFile(filePath, `${data}\n`, (err) => {
    if (err) throw err;
    console.log(`Data "${data}" has been written to file!`);
  });
}; // функция writeToFile, которая будет записывать введенные данные в файл с помощью метода appendFile модуля fs

console.log('Hello! Please input some text to write to file, or type "exit" to quit.');
// сообщение с просьбой ввести текст или выйти из программы

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Goodbye!');
    rl.close();
  } else {
    writeToFile(input);
    console.log('Please input some more text, or type "exit" to quit.');
  }
}); // обработчики событий для события 'line' интерфейса readline

rl.on('close', () => {
  console.log('Goodbye!');
}); // обработчики событий для события 'close' интерфейса readline

// При вводе пользователем строки, если введенное значение равно 'exit', то программа завершается.
// Иначе, введенный текст записывается в файл с помощью функции writeToFile, и выводится сообщение с просьбой ввести еще текст или выйти из программы.
