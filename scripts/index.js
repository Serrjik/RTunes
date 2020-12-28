import { videoPlayerInit } from "./videoPlayer.js";
import { radioPlayerInit } from "./radioPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";

// Кнопки 'Видео', 'Музыка', 'Радио'.
const playerBtn = document.querySelectorAll('.player-btn')
// Блоки для Видео, Музыки, Радио.
const playerBlock = document.querySelectorAll('.player-block')
// Надпись "Медиа портал ЯTunes".
const temp = document.querySelector('.temp')

/*
	Функция делает неактивный вид кнопок табов, скрывает табы,
	скрывает надпись "Медиа портал ЯTunes".
*/
const deactivationPlayer = () => {
	temp.style.display = 'none'
	playerBtn.forEach(item => item.classList.remove('active'))
	playerBlock.forEach(item => item.classList.remove('active'))

	musicPlayerInit.stop()
	videoPlayerInit.stop()
	radioPlayerInit.stop()
}

// Переключение табов.
playerBtn.forEach((btn, i) => {
	btn.addEventListener('click', () => {
		deactivationPlayer()
		btn.classList.add('active')
		playerBlock[i].classList.add('active')
	})
})

videoPlayerInit()
radioPlayerInit()
musicPlayerInit()

/* ---- Как примерно работает подгрузка файлов на Node.js? ---- */

// // Модуль fs для работы с файловой системой.
// const fs = require('fs')

// const audioPath = './audio/'

// fs.readdir(audioPath, (err, files) => {
// 	files.forEach(file => {
// 		console.log('file: ', `./audio/${file}`);
// 	})
// })

// Запуск файла с модулем в консоли:
// node scripts/index.js