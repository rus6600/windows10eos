class Quiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = [
            {
                question: "When will Windows 10 support end?",
                options: [
                    "1 February 2025",
                    "14 October 2025",
                    "14 October 2026",
                ],
                correct: 2
            },
            {
                question: "What is the average time for mid-sized customers to migrate to Windows 11 Pro?",
                options: [
                    "3 months",
                    "9 months",
                    "12 months"
                ],
                correct: 2
            },
            {
                question: "Compared to Windows 10 devices, Windows 11 Pro devices reduce the number of security incidents by:",
                options: [
                    "8%",
                    "22%",
                    "58%"
                ],
                correct: 3
            },
            {
                question: "What is the potential risk of continuing to use Windows 10 after its end of support date?",
                options: [
                   "Loss of access to cloud services like OneDrive",
				   "Incompatibility with new software",
				   "No more security updates or patches"
                ],
                correct: 3
            },
            {
                question: "How can you identify the numbers of Windows 11 Pro-ineligible devices within your company?",
                options: [
                    "Use the PC Health check app and through Microsoft Intune",
                    "Ask all my employees to check their device through Windows Update",
                    "Call my hardware partner"                    
                ],
                correct: 1
            }
        ];

        // Only initialize if we're on a page with quiz elements
        if (document.querySelector('.quiz-screen')) {
            this.initializeQuiz();
        }
    }

    initializeQuiz() {
        // Add error checking for required elements
        const startButton = document.querySelector('.start-quiz');
        const restartButton = document.querySelector('.restart-quiz');

        if (startButton) {
            startButton.addEventListener('click', () => this.startQuiz());
        } else {
            console.warn('Start quiz button not found');
        }
        
        if (restartButton) {
            restartButton.addEventListener('click', () => this.restartQuiz());
        } else {
            console.warn('Restart quiz button not found');
        }
        
        // Initial state
        this.hideAllScreens();
        const introScreen = document.querySelector('.quiz-intro');
        if (introScreen) {
            introScreen.classList.add('active');
        }
    }

    hideAllScreens() {
        const screens = document.querySelectorAll('.quiz-screen');
        if (screens.length === 0) {
            console.warn('No quiz screens found');
            return;
        }
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.hideAllScreens();
        document.querySelector('.quiz-questions').classList.add('active');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const progressPercentage = ((this.currentQuestion + 1) / this.questions.length) * 100;
        const questionHTML = `
            <div class="question-container">
                <div class="question-header">
                    <h3>${this.currentQuestion + 1}/5</h3>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" 
                             style="width: ${progressPercentage}%" 
                             aria-valuenow="${progressPercentage}" 
                             aria-valuemin="0" 
                             aria-valuemax="100">
                        </div>
                    </div>
                </div>
                <p class="question">${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}">${option}</button>
                    `).join('')}
                </div>
                <div class="navigation-buttons">
                    ${this.currentQuestion > 0 ? 
                        `<button class="btn btn-primary back-btn">Back</button>` : 
                        `<div></div>`
                    }
                    <button class="btn btn-primary next-btn">Next</button>
                </div>
            </div>
        `;

        const questionsContainer = document.querySelector('.quiz-questions');
        questionsContainer.innerHTML = questionHTML;

        // Add click handlers to new buttons
        questionsContainer.querySelectorAll('.option-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove any previous selection
                questionsContainer.querySelectorAll('.option-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                // Add selected class to clicked button
                let target = e.target;
                // If clicked on the text inside the button, get the parent button
                if (!target.classList.contains('option-btn')) {
                    target = target.closest('.option-btn');
                }
                target.classList.add('selected');
            });
        });

        // Add navigation button handlers
        const nextBtn = questionsContainer.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const selectedOption = questionsContainer.querySelector('.option-btn.selected');
                if (selectedOption) {
                    this.handleAnswer(parseInt(selectedOption.dataset.index));
                }
            });
        }

        const backBtn = questionsContainer.querySelector('.back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.currentQuestion--;
                this.displayQuestion();
            });
        }
    }

    handleAnswer(selectedIndex) {
        const correct = this.questions[this.currentQuestion].correct === (selectedIndex+1);
        if (correct) this.score++;

        this.currentQuestion++;

        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
        } else {
            this.displayQuestion();
        }
    }

    showResults() {
        this.hideAllScreens();
        const resultsScreen = document.querySelector('.quiz-results');
        const resultsContent = resultsScreen.querySelector('.results-content');
        
		let title;
        let message;
        if (this.score === 0) {
			title = "A chance to level up";
            message = "Get in touch to learn more about Windows 10 EOS and explore the latest AI-driven PCs—designed to keep your business ahead and secure.";
        }
		if (this.score === 1) {
			title = "You’re off to a good start!";
            message = "Enhance your Windows 10 EOS knowledge and see how the latest AI-driven PCs can help future-proof your business. ";
        }
		if (this.score === 2) {
            title = "Nice progress—keep it up!";
			message = "Take the next step to deepen your understanding of Windows 10 EOS and explore how AI-driven PCs can help keep your business running smoothly and securely.  ";
        }
		if (this.score === 3) {
            title = "Great work, you’re nearly an EOS pro!";
			message = "Reach out to refine your Windows 10 EOS knowledge and explore the latest AI-driven PCs tailored to keep your business proactive and protected.  ";
        }
		if (this.score === 4) {
            title = "Almost perfect—just one off! ";
			message = "Learn more about how Windows 10 EOS impacts your business and explore the latest AI-driven Windows 11 Pro PCs powered by Intel® Core™ Ultra processors designed to deliver performance and peace of mind. ";
        }
		if (this.score === 5) {
            title = "Perfect score—you're an EOS expert! ";
			message = "Learn how we can help you upgrade to the latest AI-driven Windows 11 Pro PCs powered by Intel® Core™ Ultra processors and keep your business secure, efficient, and ready for the future. ";
        }

        resultsContent.innerHTML = `
            <p class="score">Score: ${this.score}/5</p>
			<h3>${title}</h3>
            <p class="message">${message}</p>
        `;

        resultsScreen.classList.add('active');
    }

    restartQuiz() {
        this.startQuiz();
    }
}

// Initialize quiz when document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
});
