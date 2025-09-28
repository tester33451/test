// --- تعريف عناصر الصفحة ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const finishedScreen = document.getElementById('finished-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const showResultsBtn = document.getElementById('show-results-btn');
const restartButton = document.getElementById('restart-btn');
const progressBarFull = document.getElementById('progress-bar-full');
const questionTitleElement = document.getElementById('question-title');
const singleQuestionTextElement = document.getElementById('single-question-text');
const textAnswerContainer = document.getElementById('text-answer-container');
const textAnswerElement = document.getElementById('text-answer');
const wordCountValidation = document.getElementById('word-count-validation');
const drawingContainer = document.getElementById('drawing-container');
const tfGroupContainer = document.getElementById('tf-group-container');
const fillGroupContainer = document.getElementById('fill-group-container');
const tfResultsSection = document.getElementById('tf-results-section');
const teacherReviewSection = document.getElementById('teacher-review-section');
const finishedInitialView = document.getElementById('finished-initial-view');
const passwordEntryView = document.getElementById('password-entry-view');
const passwordInput = document.getElementById('password-input');
const passwordConfirmBtn = document.getElementById('password-confirm-btn');
const passwordError = document.getElementById('password-error');
const correctPassword = '123456780';
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const calculateScoreBtn = document.getElementById('calculate-score-btn');
const finalScoreContainer = document.getElementById('final-score-container');
const finalScoreDisplay = document.getElementById('final-score-display');
const resultsControls = document.getElementById('results-controls');

// --- بنك الأسئلة بالترتيب الجديد (مع إضافة التعليلات) ---
const quizSections = [
    {
        title: "السؤال الأول: ضع علامة (صح) أو (خطأ)",
        totalPoints: 20,
        display: 'group',
        questions: [
            { question: "الحرارة الناتجة عن القوس الكهربائي كافية لصهر المعادن الحديدية فقط.", type: 'tf', correctAnswer: false, correction: "كافية لصهر معظم المعادن." },
            { question: "في رمز قطب اللحام E7018، يشير الرقم '1' إلى أن القطب صالح لجميع أوضاع اللحام.", type: 'tf', correctAnswer: true, correction: null },
            { question: "منطقة اللحام المتأثرة بالحرارة (HAZ) هي جزء من المعدن الأساسي الذي انصهر تماماً.", type: 'tf', correctAnswer: false, correction: "لم تصل لدرجة الانصهار ولكن تغيرت بنيتها." },
            { question: "تُعتبر مكائن (AC) أقل تكلفة لأنها تُستخدم في لحام جميع أنواع المعادن.", type: 'tf', correctAnswer: false, correction: "تستخدم في لحام المعادن الحديدية فقط." },
            { question: "من الوظائف الثانوية لمساعد الصهر (Flux) أنه يساعد على استقرار القوس الكهربائي.", type: 'tf', correctAnswer: true, correction: null },
            { question: "التيار المتردد (AC) بتردد 50 هرتز يغير اتجاهه 50 مرة في الثانية.", type: 'tf', correctAnswer: false, correction: "يغير اتجاهه 100 مرة في الثانية." }
        ]
    },
    {
        title: "السؤال الثاني: عرّف ما يلي",
        totalPoints: 20,
        display: 'single',
        questions: [
            { question: "القوس الكهربائي", type: 'text', correctAnswer: "عبارة عن تفريغ التيار الكهربائي عبر فجوة يولد حرارة عالية جداً تصل إلى 5500 درجة مئوية أو أكثر، كافية لصهر معظم المعادن." },
            { question: "اللحام", type: 'text', correctAnswer: "عملية ربط قطعتين أو أكثر بتسليط الحرارة أو الضغط أو كليهما، وتكون الوصلة دائمة." },
            { question: "مساعد الصهر", type: 'text', correctAnswer: "مادة تقوم بمنع الأكسدة ودخول الملوثات لبركة منصهر اللحام، وتساعد على إزالة الأكاسيد." },
            { question: "حجاب القوس الكهربائي (Shielding)", type: 'text', correctAnswer: "هو حماية منطقة وبركة اللحام وعزلها عن الهواء الجوي، لمنع تفاعل المعدن المنصهر مع غازات مثل الأكسجين والنيتروجين." },
            { question: "منطقة انصهار المعدن (Fusion Zone)", type: 'text', correctAnswer: "هي المنطقة التي تكونت من خليط منصهر من مادة الحشو ومادة قطعة العمل، والتي تتجمد لتكوّن الوصلة النهائية." }
        ]
    },
    {
        title: "السؤال الثالث: الرسم",
        totalPoints: 20,
        display: 'single',
        questions: [
            { question: "وضح بالرسم مخطط عملية اللحام بالقوس الكهربائي.", type: 'drawing' }
        ]
    },
    {
        title: "السؤال الرابع: أكمل الفراغات التالية",
        totalPoints: 20,
        display: 'group',
        questions: [
            { question: "تبلغ درجة حرارة القوس الكهربائي حوالي [BLANK] درجة مئوية.", type: 'fill', correctAnswer: "5500" },
            { question: "تُصنع الأقطاب غير المستهلكة من معدن [BLANK] أو الكرافيت.", type: 'fill', correctAnswer: "التنجستن" },
            { question: "في رمز E7018، يمثل الرقمان (70) الحد الأدنى لـ [BLANK] لمعدن اللحام.", type: 'fill', correctAnswer: "مقاومة الشد" },
            { question: "الطبقة الصلبة فوق سطح اللحام بعد تبريد مساعد الصهر تسمى [BLANK].", type: 'fill', correctAnswer: "الخبث" },
            { question: "المنطقة من المعدن الأصلي التي لم تنصهر ولكن تغيرت بنيتها تُعرف بـ [BLANK].", type: 'fill', correctAnswer: "منطقة اللحام المتأثرة بالحرارة" },
            { question: "التردد المعمول به للتيار المتردد (AC) في العراق هو [BLANK] هرتز.", type: 'fill', correctAnswer: "50" }
        ]
    },
     {
        title: "السؤال الخامس: علل ما يلي",
        totalPoints: 20,
        display: 'single',
        questions: [
            { question: "استهلاك الأقطاب وتعويضها يعد من عيوب اللحام بالأقطاب المستهلكة.", type: 'text', correctAnswer: "بسبب الوقت الضائع أثناء عملية تعويض الأقطاب." },
            { question: "مكائن (DC) تستخدم لكافة أنواع المعادن.", type: 'text', correctAnswer: "لأنها تعطي جودة أفضل للملحومات بسبب السيطرة بشكل أفضل على القوس الكهربائي." },
            { question: "تكون مكائن (AC) أقل كلفة.", type: 'text', correctAnswer: "لكونها تستخدم لغرض لحام المعادن الحديدية فقط." },
            { question: "تُعتبر الطاقة الكهربائية هي المصدر الأكثر شيوعاً للحرارة في عمليات اللحام.", type: 'text', correctAnswer: "لسهولة استخدامها وتوافرها، وقدرتها على توليد حرارة عالية جداً، بالإضافة إلى بساطة معداتها وقلة كلفتها النسبية." },
            { question: "ضرورة استخدام حجاب القوس الكهربائي (Shielding) أثناء اللحام.", type: 'text', correctAnswer: "لعزل منطقة اللحام وبركة المعدن المنصهر عن الهواء الجوي المحيط، وذلك لمنع تفاعل المعدن مع غازات مثل الأكسجين والنيتروجين التي قد تسبب ضعفاً وعيوباً في وصلة اللحام." }
        ]
    }
];

let userAnswers = [], currentStep = 0, singleQuestionSubIndex = 0;
let isDrawing = false, autoGradedScore = 0;

// --- ربط الأحداث ---
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', handleNextButton);
submitButton.addEventListener('click', finishQuiz);
showResultsBtn.addEventListener('click', showPasswordView);
restartButton.addEventListener('click', () => location.reload());
passwordConfirmBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') checkPassword(); });
calculateScoreBtn.addEventListener('click', calculateFinalScore);
canvas.addEventListener('mousedown', (e) => { isDrawing = true; draw(e); });
canvas.addEventListener('mouseup', () => { isDrawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('clear-btn')) ctx.clearRect(0, 0, canvas.width, canvas.height);
        else {
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            setTool(e.target.dataset.tool);
        }
    });
});
document.querySelector('.tool-color-picker').addEventListener('change', (e) => ctx.strokeStyle = e.target.value);
textAnswerElement.addEventListener('input', validateTextInput);

// --- وظائف الرسم ---
function initializeCanvas() { canvas.width = document.querySelector('.card-container').offsetWidth - 80; canvas.height = 300; ctx.lineWidth = 3; ctx.lineCap = 'round'; }
function draw(e) { if (!isDrawing) return; const rect = canvas.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); }
function setTool(tool) { ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over'; }

// --- وظائف الاختبار الرئيسية ---
function showPasswordView() { finishedInitialView.classList.add('hide'); passwordEntryView.classList.remove('hide'); passwordInput.focus(); }
function checkPassword() { if (passwordInput.value === correctPassword) { finishedScreen.classList.add('hide'); resultScreen.classList.remove('hide'); resultsControls.classList.remove('hide'); showResults(); } else { passwordError.textContent = 'كلمة المرور غير صحيحة.'; } }
function finishQuiz() { quizScreen.classList.add('hide'); finishedScreen.classList.remove('hide'); }
function startQuiz() { startScreen.classList.add('hide'); quizScreen.classList.remove('hide'); userAnswers = []; currentStep = 0; showStep(); }

function showStep() {
    resetState();
    const currentSection = quizSections[currentStep];
    questionTitleElement.innerText = currentSection.title;
    updateProgressBar();

    if (currentSection.display === 'group') {
        if (currentSection.questions[0].type === 'tf') {
            tfGroupContainer.classList.remove('hide');
            tfGroupContainer.innerHTML = '';
            currentSection.questions.forEach((q, index) => {
                const item = document.createElement('div');
                item.classList.add('tf-item');
                item.innerHTML = `
                    <p class="tf-question-text">${index + 1}. ${q.question}</p>
                    <div class="tf-controls" data-group-index="${index}">
                        <button class="btn tf-group-btn" data-answer="true">✓ صح</button>
                        <button class="btn tf-group-btn" data-answer="false">✗ خطأ</button>
                    </div>`;
                tfGroupContainer.appendChild(item);
            });
            tfGroupContainer.querySelectorAll('.tf-group-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    const parent = e.target.parentElement;
                    parent.querySelectorAll('.tf-group-btn').forEach(b => b.classList.remove('selected'));
                    e.target.classList.add('selected');
                });
            });
        } else if (currentSection.questions[0].type === 'fill') {
            fillGroupContainer.classList.remove('hide');
            fillGroupContainer.innerHTML = '';
            currentSection.questions.forEach((q, index) => {
                const item = document.createElement('div');
                item.classList.add('question-group-item');
                const parts = q.question.split('[BLANK]');
                item.innerHTML = `<p>${index + 1}. ${parts[0]} <input type="text" class="fill-group-input" data-group-index="${index}"> ${parts[1] || ''}</p>`;
                fillGroupContainer.appendChild(item);
            });
        }
        nextButton.disabled = false;
    } else { // display === 'single'
        const question = currentSection.questions[singleQuestionSubIndex];
        singleQuestionTextElement.innerText = question.question;
        if (question.type === 'text') {
            textAnswerContainer.classList.remove('hide');
            validateTextInput();
        } else if (question.type === 'drawing') {
            drawingContainer.classList.remove('hide');
            initializeCanvas();
            nextButton.disabled = false;
        }
    }
}

function resetState() {
    [tfGroupContainer, fillGroupContainer, textAnswerContainer, drawingContainer].forEach(c => c.classList.add('hide'));
    singleQuestionTextElement.innerText = '';
    textAnswerElement.value = '';
    wordCountValidation.classList.add('hide');
    nextButton.classList.remove('hide');
    submitButton.classList.add('hide');
}

function validateTextInput() {
    const wordCount = textAnswerElement.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount >= 5) {
        nextButton.disabled = false;
        wordCountValidation.classList.add('hide');
    } else {
        nextButton.disabled = true;
        wordCountValidation.classList.remove('hide');
    }
}

function handleNextButton() {
    const currentSection = quizSections[currentStep];
    const pointsPerQuestion = currentSection.totalPoints / currentSection.questions.length;
    
    if (currentSection.display === 'group') {
        currentSection.questions.forEach((q, index) => {
            let userAnswer;
            if (q.type === 'tf') {
                const selectedBtn = tfGroupContainer.querySelector(`[data-group-index="${index}"] .selected`);
                userAnswer = selectedBtn ? selectedBtn.dataset.answer === 'true' : null;
            } else if (q.type === 'fill') {
                const input = fillGroupContainer.querySelector(`[data-group-index="${index}"]`);
                userAnswer = input.value.trim() || "لم تتم الإجابة";
            }
            userAnswers.push({ ...q, title: currentSection.title, userAnswer, pointsPerQuestion });
        });
    } else { // display === 'single'
        const question = currentSection.questions[singleQuestionSubIndex];
        let userAnswer;
        if (question.type === 'text') userAnswer = textAnswerElement.value || "لم تتم الإجابة";
        else if (question.type === 'drawing') userAnswer = canvas.toDataURL();
        userAnswers.push({ ...question, title: currentSection.title, userAnswer, pointsPerQuestion });
    }

    if (currentSection.display === 'single' && singleQuestionSubIndex < currentSection.questions.length - 1) {
        singleQuestionSubIndex++;
    } else {
        currentStep++;
        singleQuestionSubIndex = 0;
    }
    
    if (currentStep < quizSections.length) {
        showStep();
    } else {
        quizScreen.classList.add('hide');
        submitButton.classList.remove('hide');
        finishQuiz();
    }
}

function updateProgressBar() { const progress = (currentStep / quizSections.length) * 100; progressBarFull.style.width = `${progress}%`; }

function showResults() {
    autoGradedScore = 0;
    processAutoGradedSection('tf', tfResultsSection);
    
    const teacherReviewAnswers = userAnswers.filter(a => a.type !== 'tf');
    if (teacherReviewAnswers.length > 0) {
        teacherReviewSection.classList.remove('hide');
        const answersBySection = teacherReviewAnswers.reduce((acc, item) => {
            acc[item.title] = acc[item.title] || [];
            acc[item.title].push(item);
            return acc;
        }, {});
        teacherReviewSection.innerHTML = '';
        for (const sectionTitle in answersBySection) {
            teacherReviewSection.innerHTML += `<h3>${sectionTitle}</h3>`;
            answersBySection[sectionTitle].forEach(item => {
                const div = document.createElement('div');
                div.classList.add('review-item');
                let content = `<p class="review-question">${item.question.replace('[BLANK]', '...')}</p>`;
                if (item.type === 'drawing') content += `<p><strong>إجابة الطالب (رسم):</strong></p><img src="${item.userAnswer}" class="review-drawing-img" alt="رسم الطالب">`;
                else {
                    content += `<p><strong>إجابة الطالب:</strong> ${item.userAnswer}</p>`;
                    if (item.correctAnswer) content += `<p class="correct-answer"><strong>الإجابة الصحيحة:</strong> ${item.correctAnswer}</p>`;
                }
                content += `<div class="rating-container"><p><strong>تقييم المصحح:</strong></p><div class="star-rating" data-points-per-question="${item.pointsPerQuestion}"><span class="star" data-value="5">&#9733;</span><span class="star" data-value="4">&#9733;</span><span class="star" data-value="3">&#9733;</span><span class="star" data-value="2">&#9733;</span><span class="star" data-value="1">&#9733;</span></div></div>`;
                div.innerHTML = content;
                teacherReviewSection.appendChild(div);
            });
        }
        document.querySelectorAll('.star').forEach(star => star.addEventListener('click', (e) => {
            const ratingValue = e.target.dataset.value;
            e.target.parentElement.dataset.rating = ratingValue;
            e.target.parentElement.querySelectorAll('.star').forEach(s => s.classList.toggle('selected', s.dataset.value <= ratingValue));
        }));
    } else {
        teacherReviewSection.classList.add('hide');
    }
}

function processAutoGradedSection(type, sectionElement) {
    const answers = userAnswers.filter(a => a.type === type);
    if (answers.length > 0) {
        sectionElement.classList.remove('hide');
        sectionElement.innerHTML = `<h3>${answers[0].title}</h3>`;
        let correctCount = 0;
        answers.forEach(item => {
            const isCorrect = item.userAnswer === item.correctAnswer;
            if (isCorrect) correctCount++;
            const div = document.createElement('div');
            div.classList.add('review-item');
            let content = `<p class="review-question">${item.question}</p>`;
            if (isCorrect) content += `<p>إجابة الطالب: ${item.userAnswer ? 'صح' : 'خطأ'} (صحيحة)</p>`;
            else {
                content += `<p>إجابة الطالب: ${item.userAnswer === null ? 'لم تتم الإجابة' : (item.userAnswer ? 'صح' : 'خطأ')} (خاطئة)</p>`;
                content += `<p class="correct-answer">الإجابة الصحيحة: ${item.correctAnswer ? 'صح' : 'خطأ'}</p>`;
                if (item.correction) content += `<p class="correction-text">التصحيح: ${item.correction}</p>`;
            }
            div.innerHTML = content;
            sectionElement.appendChild(div);
        });
        autoGradedScore += correctCount * answers[0].pointsPerQuestion;
    } else {
        sectionElement.classList.add('hide');
    }
}

function calculateFinalScore() {
    let teacherGradedScore = 0;
    const ratingMap = { 1: 0, 2: 0.25, 3: 0.5, 4: 0.75, 5: 1 };
    document.querySelectorAll('.star-rating').forEach(container => {
        const rating = parseInt(container.dataset.rating) || 0;
        const pointsPerQuestion = parseFloat(container.dataset.pointsPerQuestion);
        const percentage = ratingMap[rating] || 0;
        teacherGradedScore += percentage * pointsPerQuestion;
    });
    const totalScore = autoGradedScore + teacherGradedScore;
    finalScoreContainer.classList.remove('hide');
    finalScoreDisplay.textContent = `${totalScore.toFixed(1)} / 100`;
    calculateScoreBtn.disabled = true;
    window.scrollTo(0, 0);
}
