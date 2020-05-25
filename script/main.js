document.addEventListener('DOMContentLoaded', function () {
	const btnOpenModal = document.querySelector('#btnOpenModal'),
		modalBlock = document.querySelector('#modalBlock'),
		modalWrap = document.querySelector('.modal'),
		closeModal = document.querySelector('#closeModal'),
		questionTitle = document.querySelector('#question'),
		formAnswers = document.querySelector('#formAnswers'),
		burgerBtn = document.getElementById('burger'),
		nextButton = document.getElementById('next'),
		prevButton = document.getElementById('prev'),
		modalDialog = document.querySelector('.modal-dialog'),
		sendButton = document.getElementById('send');

	let clientWidth;


	const questions = [
	    {
	        question: "Какого цвета бургер?",
	        answers: [
	            {
	                title: 'Стандарт',
	                url: './image/burger.png'
	            },
	            {
	                title: 'Черный',
	                url: './image/burgerBlack.png'
	            }
	        ],
	        type: 'radio'
	    },
	    {
	        question: "Из какого мяса котлета?",
	        answers: [
	            {
	                title: 'Курица',
	                url: './image/chickenMeat.png'
	            },
	            {
	                title: 'Говядина',
	                url: './image/beefMeat.png'
	            },
	            {
	                title: 'Свинина',
	                url: './image/porkMeat.png'
	            }
	        ],
	        type: 'radio'
	    },
	    {
	        question: "Дополнительные ингредиенты?",
	        answers: [
	            {
	                title: 'Помидор',
	                url: './image/tomato.png'
	            },
	            {
	                title: 'Огурец',
	                url: './image/cucumber.png'
	            },
	            {
	                title: 'Салат',
	                url: './image/salad.png'
	            },
	            {
	                title: 'Лук',
	                url: './image/onion.png'
	            }
	        ],
	        type: 'checkbox'
	    },
	    {
	        question: "Добавить соус?",
	        answers: [
	            {
	                title: 'Чесночный',
	                url: './image/sauce1.png'
	            },
	            {
	                title: 'Томатный',
	                url: './image/sauce2.png'
	            },
	            {
	                title: 'Горчичный',
	                url: './image/sauce3.png'
	            }
	        ],
	        type: 'radio'
	    }
	];

	const resizeWindow = () => {
		clientWidth = document.documentElement.clientWidth;

		if (clientWidth < 750) {
			burgerBtn.style.display = 'flex';
		} else {
			burgerBtn.style.display = 'none';
		}
	};

	resizeWindow();


	const playTest = () => {
		const finalAnswers = [];
		let numberQuestion = 0;

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
					nextButton.classList.add('d-none');
					prevButton.classList.add('d-none');
					sendButton.classList.remove('d-none');

					formAnswers.innerHTML = `
					<div class="form-group">
						<label for="numberPhone">Введите свой телефон:</label>
						<input type="phone" class="form-control" id="numberPhone" />
					</div>
					`;
					break;

				case numberQuestion === questions.length + 1:
					formAnswers.textContent = 'Спасибо за пройденный тест! С вами скоро свяжется наш менеджер.';
					sendButton.classList.add('d-none');
					setTimeout(() => {
						modalBlock.classList.remove('d-block');
						burgerBtn.classList.remove('active');
					}, 5000);
					break;
			}

		}

		renderQuestions(numberQuestion);

		const checkAnswer = () => {
			const obj = {};

			const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

			inputs.forEach((input, index) => {
				if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
					obj[`${index}_${questions[numberQuestion].question}`] = input.value;
				}

				if(numberQuestion === questions.length) {
					obj['Номер телефона'] = input.value;
				}
			});

			finalAnswers.push(obj);

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
		playTest();
	});

	btnOpenModal.addEventListener('click', () => {
		requestAnimationFrame(animateModal);
		modalBlock.classList.add('d-block');
		playTest();
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