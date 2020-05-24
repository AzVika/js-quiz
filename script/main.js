document.addEventListener('DOMContentLoaded', function () {
	const btnOpenModal = document.querySelector('#btnOpenModal'),
		modalBlock = document.querySelector('#modalBlock'),
		modalWrap = document.querySelector('.modal'),
		closeModal = document.querySelector('#closeModal'),
		questionTitle = document.querySelector('#question'),
		formAnswers = document.querySelector('#formAnswers'),
		burgerBtn = document.getElementById('burger'),
		nextButton = document.getElementById('next'),
		prevButton = document.getElementById('prev');

	let clientWidth;

	nextButton.classList.add('d-none');


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
		let numberQuestion = 0;

		const renderAnswers = (index) => {
			questions[index].answers.forEach((answer) => {
				const answerItem = document.createElement('div');

				answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

				answerItem.innerHTML = `
					<div class="answers-item d-flex flex-column">
			            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
			            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
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
			questionTitle.textContent = questions[indexQuestion].question;
			renderAnswers(indexQuestion);
		}

		renderQuestions(numberQuestion);
	
		nextButton.onclick = () => {
			if(numberQuestion < questions.length - 1) {
				numberQuestion++;
				renderQuestions(numberQuestion);
			}
			CheckBtnPrevt(numberQuestion);
			CheckBtnNext(numberQuestion);
		
		}

		prevButton.onclick = () => {
			if(numberQuestion > 0) {
				numberQuestion--;
				renderQuestions(numberQuestion);
			}
			CheckBtnPrevt(numberQuestion);
			CheckBtnNext(numberQuestion);
		}

	};


	CheckBtnPrevt = (number) => {
		if(number === 0) {
			prevButton.classList.add('d-none');
		} else if (prevButton.classList.contains('d-none')) {
			prevButton.classList.remove('d-none');
		}
	}


	CheckBtnNext = (number) => {
		if(number === questions.length - 1) {
			nextButton.classList.add('d-none');
		} else if (nextButton.classList.contains('d-none')) {
			nextButton.classList.remove('d-none');
		}
	} 


	window.addEventListener('resize', resizeWindow);

	burgerBtn.addEventListener('click', () => {
		burgerBtn.classList.add('active');
		modalBlock.classList.add('d-block');
		playTest();
	});

	btnOpenModal.addEventListener('click', () => {
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