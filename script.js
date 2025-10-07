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

// --- بنك الأسئلة ---
const quizSections = [
    {
        title: "السؤال الأول: صح وخطأ (مع تصحيح الخطأ)",
        totalPoints: 20,
        display: 'group',
        questions: [
            { question: "لا يتأثر التيار المتناوب (AC) باتجاه الربط، لأنه يغير اتجاهه 50 مرة بالثانية.", type: 'tf', correctAnswer: false, correction: "يغير اتجاهه 100 مرة بالثانية." },
            { question: "الأقطاب المستھلكة في لحام القوس الكهربائي تكون عادةً على شكل أسلاك أو أقطاب اسطوانية يتراوح طولها بين 225 و 450 مم.", type: 'tf', correctAnswer: true, correction: null },
            { question: "عند استخدام القطبية المباشرة المعكوسة (DCRP)، تتركز 70% من الحرارة المتولدة على قطعة العمل نتيجة تصادم الإلكترونات.", type: 'tf', correctAnswer: false, correction: "تتركز ٧٠% من الحرارة المتولدة على القطب نفسه وتبقى ٣٠% على قطعة العمل" },
            { question: "الغازات الخاملة (Inert Gases) هي الغازات التي تتفاعل كيميائياً مع غيرھا من المواد وعددها ستة.", type: 'tf', correctAnswer: false, correction: "عددها خمسة." },
            { question: "يُعد غاز ثاني أوكسيد الكاربون غازاً خاملاً، إلا أن فعاليته محدودة مع الفولاذ.", type: 'tf', correctAnswer: false, correction: "يُعد غاز ثاني أوكسيد الكاربون غازاً فعالاً (أو غير خاملاً)، إلا أن فعاليته محدودة مع الفولاذ." },
            { question: "تتميز عملية لحام الغازات الخاملة (MIG/MAG) بكونها سريعة، ويعود ذلك لعدم الحاجة إلى تنظيف خط اللحام من خبث التكوّن.", type: 'tf', correctAnswer: true, correction: null }
        ]
    },
    {
        title: "السؤال الثاني: تعريفات",
        totalPoints: 20,
        display: 'single',
        questions: [
            { question: "اللحام (Welding)", type: 'text', correctAnswer: "اللحام (Welding) هو عمليّة ربط الأجزاء أو أكثر تحت تأثير الحرارة أو الضغط أو كليهما، وتتكون المجموعة الملحومة بعبارة ونوع وصلة لا يمكن تفكيكها دون إلحاق الضرر بالأجزاء المربوطة وتسمى Weldment." },
            { question: "القطب المستهلك (Consumable Electrode)", type: 'text', correctAnswer: "القطب المستهلك (Consumable Electrode) هو المصدر الأساس لمعدن الحشو (Filler) والمطلوب في لحام القوس الكهربائي." },
            { question: "القدرة الكهربائية (Power)", type: 'text', correctAnswer: "القدرة الكهربائية (Power) هي المعدل الزمني لتدفق الطاقة، ووحدة قياسھا حسب النظام الدولي للوحدات ھي واط (W)." },
            { question: "الغازات الخاملة (Inert Gases)", type: 'text', correctAnswer: "الغازات الخاملة (Inert Gases) هي الغازات التي تتفاعل كيميائياً مع غيرھا من المواد وھو عنصر موجود في الطبيعة وعدده خمسة." },
            { question: "دورة التشغيل (Duty Cycle)", type: 'text', correctAnswer: "دورة التشغيل (Duty Cycle) هي النسبة لعدد الدقائق المستمرة في عملية اللحام لكل ١٠ دقائق، بشرط أن تكون ماكنة اللحام في وضع آمن عند تجهيز التيار اللحام المطلوب." }
        ]
    },
    {
        title: "السؤال الثالث: أجب عن الفرعين",
        totalPoints: 20,
        display: 'single',
        questions: [
            { 
                question: "أولاً: عدد المناطق الثلاث التي تتكون عند انصهار معدن قطعة العمل.",
                type: 'text', 
                correctAnswer: "المنطقة المنصهرة (Fusion Zone)، منطقة التداخل (Weld Interface)، المنطقة المتأثرة بالحرارة (HAZ)."
            },
            {
                question: "ثانياً: اذكر فوائد مساعد الصهر (Flux) ووظيفته الأساسية في اللحام.",
                type: 'text',
                correctAnswer: "أولاً: فوائد مساعد الصهر (Flux)\n1. حماية منطقة اللحام وكرة اللحام والقوس الكهربائي من التأكسد.\n2. العمل على استقرار القوس الكهربائي.\n3. التقليل من الشرر أثناء اللحام.\n4. تحسين شكل اللحام ويُعطي شكلاً منظماً لكرة اللحام بعد التجمد.\n\nثانياً: الوظيفة الأساسية لمساعد الصهر (Flux)\nالوظيفة الأساسية هي مادة مقاومة لمنع الأكاسيد ومنع دخول أي مواد أخرى لبركة الصهر المنصهر. ويعمل على تحليل هذه الأكاسيد والمواد الغريبة بشكل يسهل إزالتها."
            }
        ]
    },
    {
        title: "السؤال الرابع: أكمل الفراغات التالية",
        totalPoints: 20,
        display: 'group',
        questions: [
            { question: "تصل درجة حرارة القوس الكهربائي عند طرف القطب إلى حوالي [BLANK] درجة مئوية.", type: 'fill', correctAnswer: "5500" },
            { question: "تصنع الأقطاب غير المستهلكة من مواد كالـ [BLANK] أو الكاربون المقاومة للانصهار.", type: 'fill', correctAnswer: "التنكستن" },
            { question: "في ربط القطبية المباشرة السالبة (DCEN)، يتجه سريان التيار (الإلكترونات) من القطب [BLANK] إلى القطب [BLANK].", type: 'fill', correctAnswer: "السالب,الموجب" },
            { question: "دورة التشغيل ھي النسبة لعدد الدقائق المستمرة في عملية اللحام لكل [BLANK] دقائق.", type: 'fill', correctAnswer: "١٠" },
            { question: "إن طريقة اللحام GMAW هي الطريقة التي تضمن عزل القوس عن الهواء باستخدام الغازات الخاملة بدلاً من [BLANK].", type: 'fill', correctAnswer: "مساحيق اللحام" },
            { question: "تنقسم الغازات المستعملة للحجب في اللحام بالقوس الكهربائي إلى نوعين هما [BLANK] ونوع [BLANK].", type: 'fill', correctAnswer: "غازات خاملة,غازات غير خاملة" }
        ]
    },
     {
        title: "السؤال الخامس: علل ما يلي",
        totalPoints: 20,
        display: 'single',
        questions: [
            { question: "تعتبر مكائن لحام التيار المستمر (DC) أفضل للحام كافة أنواع المعادن.", type: 'text', correctAnswer: "لأنها تعطي جودة أفضل للملحومة بسبب السيطرة على القوس الكهربائي." },
            { question: "مكائن التيار المتناوب (AC) لا تتأثر باتجاه الربط.", type: 'text', correctAnswer: "لأن التيار المتناوب يغير اتجاهه لكل 100 مرة بالثانية، أي أن تردد الكهرباء يساوي 50 Hz ثانية." },
            { question: "لا يمكن ضمان إنتاج خطوط لحام متواصلة وجيدة ومنظمة عند استخدام أسلاك اللحام المغطاة بطبقة من المساحيق في طريقة اللحام اليدوي بالقوس الكهربائي", type: 'text', correctAnswer: "لأن أطوال هذه الأسلاك محدودة" },
            { question: "تُعتبر عملية لحام الغازات الخاملة (MIG/MAG) سريعة مقارنة بعملية اللحام بالقوس الكهربائي اليدوي (MMAW).", type: 'text', correctAnswer: "نظراً للاستغناء عن الوقت اللازم لتنظيف خط اللحام من خبث التكوّن (بسبب عدم استعمال مساعد الصھر)." },
            { question: "استخدام الأركون والهيليوم هو الأكثر شيوعاً في عملية اللحام وعزل القوس الكهربائي.", type: 'text', correctAnswer: "لإمكانية الحصول على ھذه الغازات بطرائق اقتصادية." }
        ]
    }
];

let userAnswers = [], currentStep = 0, singleQuestionSubIndex = 0;
let isDrawing = false, autoGradedScore = 0;

// --- وظيفة التحذير عند مغادرة الصفحة ---
function handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = '';
    return '';
}

// --- ربط الأحداث ---
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', handleNextButton);
submitButton.addEventListener('click', finishQuiz);
showResultsBtn.addEventListener('click', showPasswordView);
restartButton.addEventListener('click', () => { window.removeEventListener('beforeunload', handleBeforeUnload); location.reload(); });
passwordConfirmBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') checkPassword(); });
calculateScoreBtn.addEventListener('click', calculateFinalScore);
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw, { passive: false });
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('clear-btn')) { ctx.clearRect(0, 0, canvas.width, canvas.height); }
        else { document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active')); e.target.classList.add('active'); setTool(e.target.dataset.tool); }
    });
});
document.querySelector('.tool-color-picker').addEventListener('change', (e) => ctx.strokeStyle = e.target.value);

window.addEventListener('beforeunload', handleBeforeUnload);

// --- وظائف الرسم ---
function initializeCanvas() { canvas.width = document.querySelector('.card-container').offsetWidth - 80; canvas.height = 300; ctx.lineWidth = 3; ctx.lineCap = 'round'; }
function getCoordinates(e) { if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY }; return { x: e.clientX, y: e.clientY }; }
function startDrawing(e) { e.preventDefault(); isDrawing = true; draw(e); }
function stopDrawing() { isDrawing = false; ctx.beginPath(); }
function draw(e) { if (!isDrawing) return; e.preventDefault(); const coords = getCoordinates(e); const rect = canvas.getBoundingClientRect(); const x = coords.x - rect.left; const y = coords.y - rect.top; ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); }
function setTool(tool) { ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over'; }

// --- وظائف الاختبار الرئيسية ---
function showPasswordView() { finishedInitialView.classList.add('hide'); passwordEntryView.classList.remove('hide'); passwordInput.focus(); }
function checkPassword() { if (passwordInput.value === correctPassword) { finishedScreen.classList.add('hide'); resultScreen.classList.remove('hide'); resultsControls.classList.remove('hide'); showResults(); } else { passwordError.textContent = 'كلمة المرور غير صحيحة.'; } }
function finishQuiz() { quizScreen.classList.add('hide'); finishedScreen.classList.remove('hide'); }
function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    userAnswers = [];
    currentStep = 0;
    showStep();
}

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
                const item = document.createElement('div'); item.classList.add('tf-item');
                item.innerHTML = `<p class="tf-question-text">${index + 1}. ${q.question}</p>
                    <div class="tf-controls" data-group-index="${index}">
                        <button class="btn tf-group-btn" data-answer="true">✓ صح</button>
                        <button class="btn tf-group-btn" data-answer="false">✗ خطأ</button>
                    </div>
                    <div class="correction-input-container">
                        <textarea class="correction-input" placeholder="إذا كانت الإجابة خاطئة، اذكر السبب هنا..."></textarea>
                    </div>`;
                tfGroupContainer.appendChild(item);
            });
            
            tfGroupContainer.querySelectorAll('.tf-group-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    const button = e.target;
                    const parentControls = button.parentElement;
                    const tfItem = parentControls.closest('.tf-item');
                    const correctionContainer = tfItem.querySelector('.correction-input-container');
                    parentControls.querySelectorAll('.tf-group-btn').forEach(b => b.classList.remove('selected'));
                    button.classList.add('selected');
                    if (button.dataset.answer === 'false') {
                        correctionContainer.classList.add('show');
                    } else {
                        correctionContainer.classList.remove('show');
                    }
                    checkStepCompletion();
                });
            });

        } else if (currentSection.questions[0].type === 'fill') {
            fillGroupContainer.classList.remove('hide');
            fillGroupContainer.innerHTML = '';
            currentSection.questions.forEach((q, index) => {
                const item = document.createElement('div');
                item.classList.add('question-group-item');
                const parts = q.question.split('[BLANK]');
                let content = `<p>${index + 1}. `;
                parts.forEach((part, i) => {
                    content += part;
                    if (i < parts.length - 1) {
                        content += `<input type="text" class="fill-group-input" data-group-index="${index}">`;
                    }
                });
                content += `</p>`;
                item.innerHTML = content;
                fillGroupContainer.appendChild(item);
            });
            fillGroupContainer.addEventListener('input', checkStepCompletion);
        }
    } else { // display === 'single'
        const question = currentSection.questions[singleQuestionSubIndex];
        singleQuestionTextElement.innerHTML = question.question.replace(/\n/g, '<br>');
        if (question.type === 'text') {
            textAnswerContainer.classList.remove('hide');
            textAnswerElement.addEventListener('input', checkStepCompletion);
        }
    }
    checkStepCompletion();
}

function resetState() {
    [tfGroupContainer, fillGroupContainer, textAnswerContainer, drawingContainer].forEach(c => c.classList.add('hide'));
    singleQuestionTextElement.innerText = ''; textAnswerElement.value = ''; wordCountValidation.classList.add('hide');
    nextButton.classList.remove('hide'); submitButton.classList.add('hide');
}

function checkStepCompletion() {
    const currentSection = quizSections[currentStep];
    let isComplete = false;

    if (currentSection.display === 'group') {
        if (currentSection.questions[0].type === 'tf') {
            const totalQuestions = currentSection.questions.length;
            const answeredQuestions = tfGroupContainer.querySelectorAll('.tf-controls .selected').length;
            isComplete = totalQuestions === answeredQuestions;
        } else if (currentSection.questions[0].type === 'fill') {
            const inputs = fillGroupContainer.querySelectorAll('.fill-group-input');
            isComplete = Array.from(inputs).every(input => input.value.trim() !== '');
        }
    } else {
        if (currentSection.questions[singleQuestionSubIndex].type === 'text') {
            isComplete = textAnswerElement.value.trim() !== '';
        }
    }

    nextButton.disabled = !isComplete;
    if (!isComplete) {
        wordCountValidation.textContent = 'يجب الإجابة على جميع الفقرات للمتابعة.';
        wordCountValidation.classList.remove('hide');
    } else {
        wordCountValidation.classList.add('hide');
    }
}

function handleNextButton() {
    const currentSection = quizSections[currentStep];
    const pointsPerQuestion = currentSection.totalPoints / currentSection.questions.length;
    
    if (currentSection.display === 'group') {
        currentSection.questions.forEach((q, index) => {
            let answerObject;
            if (q.type === 'tf') {
                const selectedBtn = tfGroupContainer.querySelector(`[data-group-index="${index}"] .selected`);
                const userAnswer = selectedBtn ? selectedBtn.dataset.answer === 'true' : null;
                let userCorrection = null;
                if (userAnswer === false) {
                    const tfItem = tfGroupContainer.querySelector(`[data-group-index="${index}"]`).closest('.tf-item');
                    userCorrection = tfItem.querySelector('.correction-input').value.trim() || null;
                }
                answerObject = { ...q, title: currentSection.title, userAnswer, userCorrection, pointsPerQuestion };
            } else if (q.type === 'fill') {
                const inputs = fillGroupContainer.querySelectorAll(`[data-group-index="${index}"]`);
                const answers = Array.from(inputs).map(input => input.value.trim());
                answerObject = { ...q, title: currentSection.title, userAnswer: answers.join(' و '), pointsPerQuestion };
            }
            userAnswers.push(answerObject);
        });
    } else { 
        const question = currentSection.questions[singleQuestionSubIndex];
        let userAnswer;
        if (question.type === 'text') userAnswer = textAnswerElement.value;
        userAnswers.push({ ...question, title: currentSection.title, userAnswer, pointsPerQuestion });
    }

    if (currentSection.display === 'single' && singleQuestionSubIndex < currentSection.questions.length - 1) { singleQuestionSubIndex++; }
    else { currentStep++; singleQuestionSubIndex = 0; }
    
    if (currentStep < quizSections.length) { showStep(); }
    else { quizScreen.classList.add('hide'); submitButton.classList.remove('hide'); finishQuiz(); }
}

function updateProgressBar() { const progress = (currentStep / quizSections.length) * 100; progressBarFull.style.width = `${progress}%`; }

function showResults() {
    autoGradedScore = 0;
    tfResultsSection.classList.add('hide');
    
    const teacherReviewAnswers = userAnswers;

    if (teacherReviewAnswers.length > 0) {
        teacherReviewSection.classList.remove('hide');
        const answersBySection = teacherReviewAnswers.reduce((acc, item) => {
            acc[item.title] = acc[item.title] || [];
            acc[item.title].push(item);
            return acc;
        }, {});

        teacherReviewSection.innerHTML = `<h3>الأسئلة للمراجعة اليدوية</h3>`;
        for (const sectionTitle in answersBySection) {
            teacherReviewSection.innerHTML += `<h4>${sectionTitle}</h4>`;
            answersBySection[sectionTitle].forEach(item => {
                const div = document.createElement('div');
                div.classList.add('review-item');
                let content = `<p class="review-question">${item.question.replace(/\n/g, '<br>').replace(/\[BLANK\]/g, '...')}</p>`;

                if (item.type === 'tf') {
                    const studentAnswerText = item.userAnswer === null ? 'لم تتم الإجابة' : (item.userAnswer ? 'صح' : 'خطأ');
                    content += `<p><strong>إجابة الطالب:</strong> ${studentAnswerText}</p>`;
                    if (item.userAnswer === false && item.userCorrection) {
                        content += `<p style="color: #0d6efd; font-weight: 500;"><strong>السبب الذي ذكره الطالب:</strong> ${item.userCorrection}</p>`;
                    }
                    content += `<p class="correct-answer"><strong>الإجابة النموذجية:</strong> ${item.correctAnswer ? 'صح' : 'خطأ'}. ${item.correction || ''}</p>`;
                } else { 
                    content += `<p><strong>إجابة الطالب:</strong> ${item.userAnswer.replace(/\n/g, '<br>')}</p>`;
                    if (item.correctAnswer) content += `<p class="correct-answer"><strong>الإجابة الصحيحة:</strong> ${item.correctAnswer.replace(/\n/g, '<br>')}</p>`;
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

function calculateFinalScore() {
    let teacherGradedScore = 0;
    const ratingMap = { 1: 0, 2: 0.25, 3: 0.5, 4: 0.75, 5: 1 };
    document.querySelectorAll('.star-rating').forEach(container => {
        const rating = parseInt(container.dataset.rating) || 0;
        const pointsPerQuestion = parseFloat(container.dataset.pointsPerQuestion);
        const percentage = ratingMap[rating] || 0;
        teacherGradedScore += percentage * pointsPerQuestion;
    });
    
    const totalScore = teacherGradedScore;
    finalScoreContainer.classList.remove('hide');
    finalScoreDisplay.textContent = `${totalScore.toFixed(1)} / 100`;
    calculateScoreBtn.disabled = true;
    window.scrollTo(0, 0);
}