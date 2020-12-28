export const radioPlayerInit = () => {
	// Блок радио.
	const radio = document.querySelector('.radio')
	// Стартовая заглушка-изображение для изображения выбранного радио.
	const radioCoverImg = document.querySelector('.radio-cover__img')
	// Блок для названия выбранной радиостанции.
	const radioHeaderBig = document.querySelector('.radio-header__big')
	// Блок выбора радиостанций.
	const radioNavigation = document.querySelector('.radio-navigation')
	// Блок радиостанции в переключателе радиостанций.
	const radioItem = document.querySelectorAll('.radio-item')
	// Кнопка остановки/возобновления проигрывания радио.
	const radioStop = document.querySelector('.radio-stop')

	// Ползунок регулятора громкости звука.
	const audioVolume = document.querySelector('.radio-audio-volume')
	// Кнопка уменьшения громкости.
	const volumeDown = document.getElementById('radio-volume-down')
	// Кнопка увеличения громкости.
	const volumeUp = document.getElementById('radio-volume-up')

	const audio = new Audio()
	// Начальный уровень громкости.
	audio.volume = 0.03
	// Начальное положение ползунка регулятора громкости звука.
	audioVolume.value = audio.volume * 100
	audio.type = 'audio/aac'

	/*
		Изначально сделать кнопку остановки/возобновления
		проигрывания радио неактивной.
	*/
	radioStop.disabled = true

	/*
		Функция изменяет иконку кнопки
		остановки/возобновления проигрывания радио и
		останавливает/запускает анимацию вращения изображения радиостанции.
	*/
	const changeIconPlay = () => {
		if (audio.paused) {
			radio.classList.remove('play')
			radioStop.classList.add('fa-play')
			radioStop.classList.remove('fa-stop')
		} else {
			radio.classList.add('play')
			radioStop.classList.remove('fa-play')
			radioStop.classList.add('fa-stop')
		}
	}

	/*
		Функция выделяет переданную станцию
		и снимает выделение со всех радиостанций в списке.
	*/
	const selectItem = elem => {
		// Снять выделение со всех радиостанций в списке.
		radioItem.forEach(item => item.classList.remove('select'))
		// Выделить выбранную радиостанцию в списке.
		elem.classList.add('select')
	}

	// Обработчик изменения состояния радио-инпутов блока выбора радиостанций.
	radioNavigation.addEventListener('input', event => {
		const target = event.target
		const parent = target.closest('.radio-item')
		selectItem(parent)

		// Заголовок радиостанции.
		const title = parent.querySelector('.radio-name').textContent
		radioHeaderBig.textContent = title

		// Изображение радиостанции.
		const img = parent.querySelector('.radio-img').src
		radioCoverImg.src = img

		radioStop.disabled = false

		// Путь к радиостанции.
		audio.src = target.dataset.radioStantion
		audio.play()

		// Анимация (вращение изображения радиостанции).
		radio.classList.add('play')
		changeIconPlay()
	})

	radioStop.addEventListener('click', () => {
		if (audio.paused) {
			audio.play()
		} else {
			audio.pause()
		}

		changeIconPlay()
	})

	// Обработчик ввода значения ползунка регулятора громкости звука.
	audioVolume.addEventListener('input', () => {
		audio.volume = audioVolume.value / 100
	})

	// Обработчик клика по кнопке уменьшения громкости.
	volumeDown.addEventListener('click', () => {
		// Текущий уровень звука.
		const volume = audio.volume
		// Новый уровень звука.
		const newVolume = volume - 0.05

		audio.volume = newVolume > 0 ? newVolume : 0

		audioVolume.value = audio.volume * 100
	})

	// Обработчик клика по кнопке увеличения громкости.
	volumeUp.addEventListener('click', () => {
		// Текущий уровень звука.
		const volume = audio.volume
		// Новый уровень звука.
		const newVolume = volume + 0.05

		audio.volume = newVolume < 1 ? newVolume : 1

		audioVolume.value = audio.volume * 100
	})

	radioPlayerInit.stop = () => {
		audio.pause()
		changeIconPlay()
	}
}