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
        title: "السؤال الأول: ضع علامة (صح) أو (خطأ) وصحح الخطأ إن وجد",
        totalPoints: 20,
        display: 'group',
        questions: [
            { question: "في رمز قطب اللحام E7018، يمثل الرقمان '70' الحد الأدنى لمقاومة الشد لمعدن اللحام.", type: 'tf', correctAnswer: true, correction: null },
            { question: "تمتاز تقنية اللحام بالحجاب الذاتي (Self-Shielding) بإنتاج دخان قليل مما يسهل رؤية بركة اللحام.", type: 'tf', correctAnswer: false, correction: "تنتج دخاناً مفرطاً وكثيفاً مما يعيق الرؤية." },
            { question: "منطقة اللحام المتأثرة بالحرارة (HAZ) هي منطقة من المعدن الأصلي لم تصل لدرجة الانصهار لكن خواصها الميكانيكية تغيرت.", type: 'tf', correctAnswer: true, correction: null },
            { question: "يُعتبر اللحام الرطب (Wet Welding) أكثر أماناً للعامل من اللحام الجاف (Dry Welding).", type: 'tf', correctAnswer: false, correction: "يُعتبر اللحام الجاف أكثر أماناً لأنه يتم في بيئة معزولة عن الماء." },
            { question: "عند استخدام سلك لحام بقطر 1.2 ملم، فإن مدى التيار المناسب للحام الأفقي هو بين 150 و 200 أمبير.", type: 'tf', correctAnswer: true, correction: null },
            { question: "يُستخدم التيار المتردد (AC) في اللحام تحت الماء لزيادة عامل الأمان.", type: 'tf', correctAnswer: false, correction: "يُستخدم التيار المستمر (DC) بفرق جهد منخفض لا يتجاوز 42 فولت لزيادة الأمان." }
        ]
    },
    {
        title: "السؤال الثاني: عرّف ما يلي",
        totalPoints: 20,
        display: 'single',
        questions: [
            { question: "مساعد الصهر (Flux)", type: 'text', correctAnswer: "هو مادة تقوم بمنع الأكسدة ودخول الملوثات إلى بركة منصهر اللحام، حيث يعمل على تحليل الأكاسيد وتكوين طبقة خبث واقية يسهل إزالتها بعد التجميد." },
            { question: "تقنية اللحام بالحجاب المزدوج (Dual Shielding)", type: 'text', correctAnswer: "هي تقنية لحام تستخدم سلكاً مجوفاً يحتوي على مساعد صهر، بالإضافة إلى استخدام مصدر غاز خارجي للحماية، وتُستخدم بشكل أساسي في لحام الفولاذ الكربوني ذي السمك العالي." },
            { question: "دورة التشغيل (Duty Cycle)", type: 'text', correctAnswer: "هي النسبة المئوية للوقت الذي تستطيع فيه ماكينة اللحام العمل باستمرار خلال دورة مدتها 10 دقائق عند تيار لحام معين، دون أن ترتفع درجة حرارتها عن الحد المسموح." },
            { question: "اللحام الجاف (Dry Welding)", type: 'text', correctAnswer: "هو أحد أنواع اللحام تحت الماء، حيث يتم عزل منطقة اللحام بالكامل عن الماء المحيط بها عن طريق إنشاء غرفة أو حجرة محكمة الإغلاق حولها، مما يسمح بإجراء عملية اللحام في بيئة جافة." },
            { question: "تقنية الدفع (Push Technique)", type: 'text', correctAnswer: "هي إحدى طرق توجيه قطب اللحام حيث يتم دفع القطب إلى الأمام باتجاه اللحام، وتُستخدم للحصول على ملحومات ذات جودة جيدة واختراق غير عميق وتكوين خط لحام عريض." }
        ]
    },
    {
        title: "السؤال الثالث: سؤال المقارنة التحليلية",
        totalPoints: 20,
        display: 'single',
        questions: [
            { 
                question: `قارن بالتفصيل بين طريقتي اللحام تحت الماء (اللحام الرطب واللحام الجاف) من حيث النقاط الأربع التالية، موضحاً سبب كل اختلاف:
                1. جودة اللحام والخواص الميكانيكية للوصلة.
                2. التكلفة والتعقيد.
                3. المرونة وسرعة إنجاز العمل.
                4. الأمان بالنسبة للعامل.`, 
                type: 'text', 
                correctAnswer: `الجودة: الجاف جودته عالية (مثل السطح) لعدم وجود تبريد سريع. الرطب جودته أقل بسبب التبريد السريع بالماء الذي يسبب صلادة وشروخ.
                التكلفة: الجاف مكلف جداً ومعقد (يتطلب بناء حجرة). الرطب تكلفته منخفضة ولا يتطلب معدات معقدة.
                المرونة: الرطب أكثر مرونة وسرعة (وصول سهل للمناطق الصعبة). الجاف بطيء وأقل مرونة بسبب بناء وتجهيز الحجرة.
                الأمان: الجاف أكثر أماناً (بيئة جافة معزولة). الرطب يحمل مخاطر أعلى (صدمة كهربائية، ضعف رؤية).`
            }
        ]
    },
    {
        title: "السؤال الرابع: أكمل الفراغات التالية",
        totalPoints: 20,
        display: 'group',
        questions: [
            { question: "في تقنية الحجاب المزدوج (Dual Shielding)، يكون خليط الغاز الواقي عادة من غاز ثاني أكسيد الكربون ونسبة 10% أو 20% من [BLANK].", type: 'fill', correctAnswer: "الأوكسيد أو الأركون" },
            { question: "من أبرز مساوئ اللحام الرطب هو خطر حدوث [BLANK] للملحومات الفولاذية.", type: 'fill', correctAnswer: "الانكماش السريع والصلادة العالية" },
            { question: "يُطلى سلك اللحام عادةً بطبقة من [BLANK] لتسهيل عملية التفريغ الكهربائي ومنع الصدأ.", type: 'fill', correctAnswer: "النحاس" },
            { question: "تُصنع الأقطاب غير المستهلكة من معدن [BLANK] أو الكرافيت لمقاومتها العالية لدرجة الانصهار.", type: 'fill', correctAnswer: "التنجستن" },
            { question: "التيار الكهربائي المستخدم في عملية اللحام بالقوس الكهربائي هو إما تيار مباشر (DC) أو تيار [BLANK].", type: 'fill', correctAnswer: "متردد (AC)" },
            { question: "لضمان المحافظة على الغلاف الخارجي للإلكترود من التلف عند اللحام تحت الماء، يُطلى بمادة عازلة كالـ[BLANK].", type: 'fill', correctAnswer: "بارافين" }
        ]
    },
     {
        title: "السؤال الخامس: علل ما يلي",
        totalPoints: 20,
        display: 'single',
        questions: [
            { question: "تُعتبر منطقة اللحام المتأثرة بالحرارة (HAZ) نقطة ضعف محتملة في الوصلة الملحومة.", type: 'text', correctAnswer: "لأنها منطقة تعرضت لحرارة عالية غيرت بنيتها المجهرية وخواصها الميكانيكية، مما يجعلها مختلفة عن المعدن الأصلي ومنطقة اللحام وقد تكون أضعف منهما." },
            { question: "تعطي مكائن لحام التيار المباشر (DC) جودة لحام أفضل من مكائن التيار المتردد (AC).", type: 'text', correctAnswer: "لأنها توفر قوساً كهربائياً أكثر استقراراً، مما يمنح سيطرة أفضل على عملية اللحام ويؤدي إلى الحصول على ملحومات ذات جودة أعلى." },
            { question: "لا يُستخدم التيار المتردد (AC) أو التيار المستمر بفرق جهد عالٍ في اللحام تحت الماء.", type: 'text', correctAnswer: "لأن الماء موصل جيد للتيار، واستخدام جهد عالٍ يشكل خطراً مميتاً على اللحام (الغواص) بسبب احتمالية حدوث صدمة كهربائية." },
            { question: "يُفضل استخدام الحجاب المزدوج (Dual Shielding) في لحام الوصلات ذات السمك العالي.", type: 'text', correctAnswer: "لأنه يجمع بين حماية مساعد الصهر والغاز الخارجي، مما يوفر حماية فائقة ضرورية للتطبيقات السميكة لضمان عدم وجود عيوب." },
            { question: "ضرورة طلاء سلك اللحام المستخدم في الأقطاب المجوفة بطبقة رقيقة من النحاس.", type: 'text', correctAnswer: "لتسهيل عملية التفريغ الكهربائي (توصيل التيار) بين القطب والسلك، ولمنع السلك من الصدأ." }
        ]
    }
];

let userAnswers = [], currentStep = 0, singleQuestionSubIndex = 0;
let isDrawing = false, autoGradedScore = 0;

// --- وظيفة التحذير عند مغادرة الصفحة ---
function handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = ''; // مطلوب للمتصفحات الحديثة
    return ''; // للمتصفحات القديمة
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

// --- ✨ ربط حدث التحذير عند المغادرة بشكل عام للموقع ---
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
                const item = document.createElement('div'); item.classList.add('question-group-item');
                const parts = q.question.split('[BLANK]');
                item.innerHTML = `<p>${index + 1}. ${parts[0]} <input type="text" class="fill-group-input" data-group-index="${index}"> ${parts[1] || ''}</p>`;
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
        } else if (question.type === 'drawing') {
            drawingContainer.classList.remove('hide');
            initializeCanvas();
            nextButton.disabled = false;
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
        } else if (currentSection.questions[singleQuestionSubIndex].type === 'drawing') {
            isComplete = true;
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
                const input = fillGroupContainer.querySelector(`[data-group-index="${index}"]`);
                answerObject = { ...q, title: currentSection.title, userAnswer: input.value.trim(), pointsPerQuestion };
            }
            userAnswers.push(answerObject);
        });
    } else { 
        const question = currentSection.questions[singleQuestionSubIndex];
        let userAnswer;
        if (question.type === 'text') userAnswer = textAnswerElement.value;
        else if (question.type === 'drawing') userAnswer = canvas.toDataURL();
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
                } else if (item.type === 'drawing') {
                    content += `<p><strong>إجابة الطالب (رسم):</strong></p><img src="${item.userAnswer}" class="review-drawing-img" alt="رسم الطالب">`;
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