import { addZero } from "./supScript.js"

export const musicPlayerInit = () => {
	// Блок "Музыка".
	const audio = document.querySelector('.audio')
	// Обложка аудио-трека.
	const audioImg = document.querySelector('.audio-img')
	// Название аудио-трека.
	const audioHeader = document.querySelector('.audio-header')
	// Аудио-плейер - тег <audio>.
	const audioPlayer = document.querySelector('.audio-player')
	// Блок управления плэйером.
	const audioNavigation = document.querySelector('.audio-navigation')
	// Кнопка "Play".
	const audioButtonPlay = document.querySelector('.audio-button__play')
	// Прогресс-бар воспроизводимого аудио-трека.
	const audioProgress = document.querySelector('.audio-progress')
	// Индикатор прогресса воспроизводимого аудио-трека.
	const audioProgressTiming = document.querySelector('.audio-progress__timing')
	// На каком моменте времени проигрывается аудио-трек.
	const audioTimePassed = document.querySelector('.audio-time__passed')
	// Длительность аудио-трека.
	const audioTimeTotal = document.querySelector('.audio-time__total')

	// Массив названий файлов с музыкой.
	const playlist = ['hello', 'flow', 'speed']

	// Индекс песни, которая играет в данный момент.
	let trackIndex = 0

	// Функция запускает проигрывание аудио-трека.
	const loadTrack = () => {
		// Находится ли аудиоплейер на паузе?
		const isPlayed = audioPlayer.paused
		const track = playlist[trackIndex]

		audioPlayer.src = `./audio/${track}.mp3`
		audioHeader.textContent = track.toUpperCase()
		audioImg.src = `./audio/${track}.jpg`

		if (isPlayed) {
			audioPlayer.pause()
		} else {
			audioPlayer.play()
		}

		/*
		Событие "durationchange" - Метаданные были загружены или изменены, что
		указывает на изменение в продолжительности медиа.
		Может быть отправлено, например, когда медиа загружено достаточно для
		того, чтобы продолжительность уже была известна.
		*/
		audioPlayer.addEventListener('durationchange', () => {
			// console.log('Track loaded!')
			updateTime()
		})
	}

	// Начальный уровень громкости.
	audioPlayer.volume = 0.05

	// Функция запускает воспроизведение предыдущего трека.
	const prevTrack = () => {
		if (trackIndex !== 0) {
			trackIndex--
		}

		else {
			trackIndex = playlist.length - 1
		}

		loadTrack()
	}

	// Функция запускает воспроизведение следующего трека.
	const nextTrack = () => {
		if (trackIndex === playlist.length - 1) {
			trackIndex = 0
		}

		else {
			trackIndex++
		}

		loadTrack()
	}

	// Обработчик клика внутри блока управления плэйером.
	audioNavigation.addEventListener('click', event => {
		const target = event.target

		// Если нажали на кнопку "Play":
		if (target.classList.contains('audio-button__play')) {
			audio.classList.toggle('play')
			audioButtonPlay.classList.toggle('fa-play')
			audioButtonPlay.classList.toggle('fa-pause')

			// Запуск или остановка музыки.
			if (audioPlayer.paused) {
				audioPlayer.play()
			}

			else {
				audioPlayer.pause()
			}

			const track = playlist[trackIndex]
			audioHeader.textContent = track.toUpperCase()
		}

		// Если нажали на кнопку "Prev":
		if (target.classList.contains('audio-button__prev')) {
			prevTrack()
		}

		// Если нажали на кнопку "Next":
		if (target.classList.contains('audio-button__next')) {
			nextTrack()
		}
	})

	/*
		Обработчик события 'ended' аудиоплейера
		(остановка при достижении конца проигрываемого трека).
	*/
	audioPlayer.addEventListener('ended', () => {
		nextTrack()
		audioPlayer.play()
	})

	// Функция обновляет отображаемое время трека аудиоплейера.
	const updateTime = () => {
		// Время, на котором проигрывается аудио.
		const currentTime = audioPlayer.currentTime
		// Продолжительность аудиотрека.
		const duration = audioPlayer.duration
		// Процент прошедшего времени воспроизведения трека.
		const progress = currentTime / duration * 100

		audioProgressTiming.style.width = `${progress}%`

		const minutePassed = Math.floor(currentTime / 60) || '0'
		const secondsPassed = Math.floor(currentTime % 60) || '0'

		const minuteTotal = Math.floor(duration / 60) || '0'
		const secondsTotal = Math.floor(duration % 60) || '0'

		audioTimePassed.textContent =
			`${addZero(minutePassed)}:${addZero(secondsPassed)}`
		audioTimeTotal.textContent =
			`${addZero(minuteTotal)}:${addZero(secondsTotal)}`
	}

	updateTime()

	// Обработчик события изменения времени аудиоплейера.
	audioPlayer.addEventListener('timeupdate', updateTime)

	// Обработчик клика по прогресс-бару воспроизводимого аудио-трека.
	audioProgress.addEventListener('click', event => {
		// Координаты, куда кликнули.
		const x = event.offsetX
		// Ширина всего прогресс-бара.
		const allWidth = audioProgress.clientWidth
		const progress = x / allWidth * audioPlayer.duration
		audioPlayer.currentTime = progress
	})

	musicPlayerInit.stop = () => {
		if (!audioPlayer.paused) {
			audioPlayer.pause()
			audio.classList.toggle('play')
			audioButtonPlay.classList.toggle('fa-play')
			audioButtonPlay.classList.toggle('fa-pause')
		}
	}
}