import { addZero } from "./supScript.js"

export const videoPlayerInit = () => {// Тег <video>.
	const videoPlayer = document.querySelector('.video-player')
	// Кнопка "Play".
	const videoButtonPlay = document.querySelector('.video-button__play')
	// Кнопка "Stop".
	const videoButtonStop = document.querySelector('.video-button__stop')
	// Ползунок прокрутки видео.
	const videoProgress = document.querySelector('.video-progress')
	// На каком моменте времени проигрывается видео.
	const videoTimePassed = document.querySelector('.video-time__passed')
	// Длительность видео.
	const videoTimeTotal = document.querySelector('.video-time__total')
	// Ползунок регулятора громкости звука.
	const videoVolume = document.querySelector('.video-volume')
	// Кнопка уменьшения громкости.
	const volumeDown = document.getElementById('video-volume-down')
	// Кнопка увеличения громкости.
	const volumeUp = document.getElementById('video-volume-up')
	// Кнопка "Развернуть видео на весь экран".
	const videoFullscreen = document.querySelector('.video-fullscreen')

	// Начальный уровень громкости.
	videoPlayer.volume = '0.005'
	// Начальное положение ползунка регулятора громкости звука.
	videoVolume.value = videoPlayer.volume * 100

	// Функция изменяет вид значка "Play/Pause".
	const toggleIcon = () => {
		if (videoPlayer.paused) {
			videoButtonPlay.classList.remove('fa-pause')
			videoButtonPlay.classList.add('fa-play')
		} else {
			videoButtonPlay.classList.add('fa-pause')
			videoButtonPlay.classList.remove('fa-play')
		}
	}

	// Функция запускает или ставит на паузу видео.
	const togglePlay = () => {
		// Если видеоплейер на паузе:
		if (videoPlayer.paused) {
			// Запуск нативного метода видеоплейера - "play".
			videoPlayer.play()
		}
		// Если видеоплейер в режиме проигрывания видео:
		else {
			// Поставить видео на паузу.
			videoPlayer.pause()
		}

		toggleIcon()
	}

	// Функция останавливает воспроизведение видео.
	const stopPlay = () => {
		// Поставить видео на паузу.
		videoPlayer.pause()
		// Вернуть видео к началу.
		videoPlayer.currentTime = 0
	}

	// Обработчик клика по видеоплейеру.
	videoPlayer.addEventListener('click', togglePlay)
	videoButtonPlay.addEventListener('click', togglePlay)

	// Обработчик события "play" видеоплейера.
	videoPlayer.addEventListener('play', toggleIcon)
	// Обработчик события "pause" видеоплейера.
	videoPlayer.addEventListener('pause', toggleIcon)

	// Обработчик клика по кнопке "Stop".
	videoButtonStop.addEventListener('click', stopPlay)

	// Обработчик события изменения времени видеоплейера.
	videoPlayer.addEventListener('timeupdate', () => {
		// Время, на котором проигрывается видео.
		const currentTime = videoPlayer.currentTime
		// Продолжительность видеоролика.
		const duration = videoPlayer.duration

		videoProgress.value = currentTime / duration * 100

		let minutePassed = Math.floor(currentTime / 60)
		let secondsPassed = Math.floor(currentTime % 60)

		let minuteTotal = Math.floor(duration / 60)
		let secondsTotal = Math.floor(duration % 60)

		videoTimePassed.textContent =
			`${addZero(minutePassed)}:${addZero(secondsPassed)}`
		videoTimeTotal.textContent =
			`${addZero(minuteTotal)}:${addZero(secondsTotal)}`
	})

	// Обработчик ввода значения ползунка прокрутки видео.
	videoProgress.addEventListener('input', () => {
		// Продолжительность видеоролика.
		const duration = videoPlayer.duration
		// Текущее значение ползунка прокрутки видео.
		const value = videoProgress.value

		videoPlayer.currentTime = value * duration / 100
	})

	// Обработчик клика по кнопке "Развернуть видео на весь экран".
	videoFullscreen.addEventListener('click', () => {
		videoPlayer.requestFullscreen()
	})

	// Обработчик ввода значения ползунка регулятора громкости звука.
	videoVolume.addEventListener('input', () => {
		videoPlayer.volume = videoVolume.value / 100
	})

	// Обработчик клика по кнопке уменьшения громкости.
	volumeDown.addEventListener('click', () => {
		// Текущий уровень звука.
		const volume = videoPlayer.volume
		// Новый уровень звука.
		const newVolume = volume - 0.05

		videoPlayer.volume = newVolume > 0 ? newVolume : 0

		videoVolume.value = videoPlayer.volume * 100
	})

	// Обработчик клика по кнопке увеличения громкости.
	volumeUp.addEventListener('click', () => {
		// Текущий уровень звука.
		const volume = videoPlayer.volume
		// Новый уровень звука.
		const newVolume = volume + 0.05

		videoPlayer.volume = newVolume < 1 ? newVolume : 1

		videoVolume.value = videoPlayer.volume * 100
	})

	videoPlayerInit.stop = () => {
		if (!videoPlayer.paused) {
			stopPlay()
		}
	}
}