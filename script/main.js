document.addEventListener('DOMContentLoaded', function () {
	const btnOpenModal = document.querySelector('#btnOpenModal'),
		modalBlock = document.querySelector('#modalBlock'),
		closeModal = document.querySelector('#closeModal'),
		questionTitle = document.querySelector('#question'),
		formAnswers = document.querySelector('#formAnswers');

	let answerImg = './image/burger.png',
		answerItem1 = 'Стандарт';
		

	btnOpenModal.addEventListener('click', () => {
		modalBlock.classList.add('d-block');
		playTest();
	});

	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block');
	});


	const playTest = () => {
		const renderQuestions = () => {
			questionTitle.textContent = 'Какого цвета бургер вы хотите?';

			formAnswers.innerHTML = `
				<div class="answers-item d-flex flex-column">
		            <input type="radio" id="answerItem1" name="answer" class="d-none">
		            <label for="answerItem1" class="d-flex flex-column justify-content-between">
			            <img class="answerImg" src="${answerImg}" alt="burger">
			            <span>${answerItem1}</span>
		            </label>
	            </div>
			`;
		};
		renderQuestions();
	};

});