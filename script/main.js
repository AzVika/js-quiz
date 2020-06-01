document.addEventListener('DOMContentLoaded', function () {
	const btnOpenModal = document.querySelector('#btnOpenModal'),
		modalBlock = document.querySelector('#modalBlock'),
		modalWrap = document.querySelector('.modal'),
		closeModal = document.querySelector('#closeModal'),
		modalTitle = document.querySelector('.modal-title'),
		questionTitle = document.querySelector('#question'),
		formAnswers = document.querySelector('#formAnswers'),
		burgerBtn = document.getElementById('burger'),
		nextButton = document.getElementById('next'),
		prevButton = document.getElementById('prev'),
		modalDialog = document.querySelector('.modal-dialog'),
		sendButton = document.getElementById('send');

	let clientWidth;

	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: "AIzaSyAQkLA2FJ-Q51gFvtO1UsPRFnIz5QdD8YE",
		authDomain: "js-quiz-3f261.firebaseapp.com",
		databaseURL: "https://js-quiz-3f261.firebaseio.com",
		projectId: "js-quiz-3f261",
		storageBucket: "js-quiz-3f261.appspot.com",
		messagingSenderId: "910808131799",
		appId: "1:910808131799:web:e15a2c4a5458f80236e892",
		measurementId: "G-JSKB9CSDEY"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();

	
	// функция получения данных извне
	const getData = () => {
		formAnswers.textContent = 'Load';

		nextButton.classList.add('d-none');
		prevButton.classList.add('d-none');

		setTimeout( () => {
			firebase.database().ref().child('questions').once('value')
				.then(snap => playTest(snap.val()));
		}, 500);
		
	}

	
	// появления и исчезновения меню справа в зависимости от ширины экрана пользователя
	const resizeWindow = () => {
		clientWidth = document.documentElement.clientWidth;

		if (clientWidth < 750) {
			burgerBtn.style.display = 'flex';
		} else {
			burgerBtn.style.display = 'none';
		}
	};

	resizeWindow();


	// функция запуска тестирования
	const playTest = (questions) => {

		const finalAnswers = [];
		const obj = {};
		let numberQuestion = 0;

		modalTitle.textContent = 'Ответь на вопрос';

		const renderAnswers = (index) => {
			questions[index].answers.forEach((answer) => {
				const answerItem = document.createElement('div');

				answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

				answerItem.innerHTML = `
					<div class="answers-item d-flex flex-column">
			            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
			            <label for="${answer.title}" class="d-flex flex-column justify-content-around">
				            <img class="answerImg" src="${answer.url}" alt="burger">
				            <span>${answer.title}</span>
			            </label>
		            </div>
				`;
				formAnswers.appendChild(answerItem);
			});
		};
		
		const renderQuestions = (indexQuestion) => {
			formAnswers.innerHTML = '';

			switch(true) {
				case numberQuestion >= 0 && numberQuestion <= questions.length - 1:
					questionTitle.textContent = questions[indexQuestion].question;
					renderAnswers(indexQuestion);
					nextButton.classList.remove('d-none');
					prevButton.classList.remove('d-none');
					sendButton.classList.add('d-none');
					break;

				case numberQuestion === 0:
					prevButton.classList.add('d-none');
					break;

				case numberQuestion === questions.length:
					questionTitle.textContent = '';
					modalTitle.textContent = '';
					nextButton.classList.add('d-none');
					prevButton.classList.add('d-none');
					sendButton.classList.remove('d-none');

					formAnswers.innerHTML = `
					<div class="form-group">
						<label for="numberPhone">Введите свой телефон:</label>
						<input type="phone" class="form-control" id="numberPhone" />
					</div>
					`;

					const numberPhone = document.getElementById('numberPhone');
					numberPhone.addEventListener('input', (event) => {
						event.target.value = event.target.value.replace(/^0-9+-/, '');
					});

					break;

				case numberQuestion === questions.length + 1:
					formAnswers.innerHTML = `
					<p>Спасибо за пройденный тест!</p> 
					<p>С вами скоро свяжется наш менеджер.</p>
					`;
					sendButton.classList.add('d-none');

					for(let key in obj) {
						let newObj = {};
						newObj[key] = obj[key];
						finalAnswers.push(newObj);
						console.log(1111);
					}

					setTimeout(() => {
						modalBlock.classList.remove('d-block');
						burgerBtn.classList.remove('active');
					}, 5000);
					break;
			}

		}

		renderQuestions(numberQuestion);

		const checkAnswer = () => {

			const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

			inputs.forEach((input, index) => {
				if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
					obj[`${index}_${questions[numberQuestion].question}`] = input.value;
				}

				if(numberQuestion === questions.length) {
					obj['Номер телефона'] = input.value;
				}
			});

		}
	
		nextButton.onclick = () => {
			checkAnswer();
			numberQuestion++;
			renderQuestions(numberQuestion);
		}

		prevButton.onclick = () => {
			numberQuestion--;
			renderQuestions(numberQuestion);
		}

		sendButton.onclick = () => {
			checkAnswer();
			numberQuestion++;
			renderQuestions(numberQuestion);
			console.log(finalAnswers);
		}
	};


	// анимация для плавного появления модального окна
	let count = -100;
	modalDialog.style.top = count + '%';

	const animateModal = () => {
		modalDialog.style.top = count + '%';
		count += 3;

		if(count < 0) {
			requestAnimationFrame(animateModal);
		} else {
			count = -100;
		}
	};


	window.addEventListener('resize', resizeWindow);

	burgerBtn.addEventListener('click', () => {
		requestAnimationFrame(animateModal);
		burgerBtn.classList.add('active');
		modalBlock.classList.add('d-block');
		getData();
	});

	btnOpenModal.addEventListener('click', () => {
		requestAnimationFrame(animateModal);
		modalBlock.classList.add('d-block');
		getData();
	});

	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block');
		burgerBtn.classList.remove('active');
	});

	modalWrap.addEventListener('click', (event) => {
		if (!event.target.closest('.modal-dialog')) {
			modalBlock.classList.remove('d-block');
			burgerBtn.classList.remove('active');
		}
		
	});

});