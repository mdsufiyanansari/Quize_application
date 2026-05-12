// ================= QUESTIONS =================
const questions = [
{ q: "What is HTML?", a: ["Programming", "Markup", "Database", "OS"], correct: 1 },
{ q: "CSS stands for?", a: ["Color", "Cascading Style Sheet", "Code", "None"], correct: 1 },
{ q: "JS stands for?", a: ["Java", "JavaScript", "JSON", "None"], correct: 1 },
{ q: "Which tag for link?", a: ["<a>", "<link>", "<href>", "<url>"], correct: 0 },
{ q: "Which is JS framework?", a: ["React", "Django", "Flask", "Laravel"], correct: 0 },
{ q: "Which is backend?", a: ["Node.js", "HTML", "CSS", "Bootstrap"], correct: 0 },
{ q: "Database?", a: ["MySQL", "HTML", "CSS", "JS"], correct: 0 },
{ q: "Image tag?", a: ["<img>", "<pic>", "<src>", "<image>"], correct: 0 },
{ q: "Color property?", a: ["font", "color", "text", "bg"], correct: 1 },
{ q: "Loop?", a: ["for", "loop", "repeat", "run"], correct: 0 },
{ q: "Array?", a: ["[]", "{}", "()", "<>"], correct: 0 },
{ q: "String?", a: ["'text'", "123", "true", "null"], correct: 0 },
{ q: "Variable?", a: ["var", "let", "const", "All"], correct: 3 },
{ q: "Boolean?", a: ["true", "123", "text", "array"], correct: 0 },
{ q: "Event?", a: ["onclick", "onload", "onhover", "All"], correct: 3 },
{ q: "Frontend?", a: ["HTML", "Node", "Java", "Python"], correct: 0 },
{ q: "Backend?", a: ["Node", "CSS", "HTML", "Bootstrap"], correct: 0 },
{ q: "Function?", a: ["function()", "def()", "fun()", "None"], correct: 0 },
{ q: "Operator?", a: ["+", "add", "sum", "calc"], correct: 0 },
{ q: "DOM?", a: ["Document Object Model", "None", "All", "Data"], correct: 0 },
{ q: "Browser?", a: ["Chrome", "Node", "React", "Linux"], correct: 0 },
{ q: "Git?", a: ["Version control", "Language", "Tool", "None"], correct: 0 },
{ q: "API?", a: ["Interface", "App", "None", "All"], correct: 0 },
{ q: "JSON?", a: ["Format", "Lang", "OS", "Tool"], correct: 0 },
{ q: "Cloud?", a: ["AWS", "HTML", "CSS", "JS"], correct: 0 },
{ q: "Framework?", a: ["Angular", "HTML", "CSS", "JS"], correct: 0 },
{ q: "Library?", a: ["React", "HTML", "CSS", "None"], correct: 0 },
{ q: "Server?", a: ["Apache", "HTML", "CSS", "JS"], correct: 0 },
{ q: "IDE?", a: ["VS Code", "HTML", "CSS", "JS"], correct: 0 },
{ q: "OS?", a: ["Windows", "HTML", "CSS", "JS"], correct: 0 }
];

// ================= VARIABLES =================
let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let time = 15;
let timer;

// ================= ELEMENTS =================
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const paletteEl = document.getElementById("palette");

// ================= CREATE PALETTE =================
function createPalette() {
    paletteEl.innerHTML = "";

    questions.forEach((_, i) => {
        let btn = document.createElement("button");
        btn.innerText = i + 1;

        btn.onclick = () => {
            currentQuestion = i;
            loadQuestion();
        };

        paletteEl.appendChild(btn);
    });
}

// ================= UPDATE PALETTE =================
function updatePalette() {
    let btns = paletteEl.children;

    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "";

        if (answers[i] === "skip") {
            btns[i].classList.add("skipped"); // 🟡
        } 
        else if (answers[i] !== null) {
            btns[i].classList.add("answered"); // 🟢
        }

        if (i === currentQuestion) {
            btns[i].classList.add("current");
        }
    }
}

// ================= LOAD QUESTION =================
function loadQuestion() {
    clearInterval(timer);
    time = 15;

    // Reset timer circle
    document.querySelector(".timer-circle")
        .style.background = "conic-gradient(#22c55e 100%, #334155 0%)";

    startTimer();

    let q = questions[currentQuestion];
    questionEl.innerText = `Q${currentQuestion + 1}: ${q.q}`;
    answersEl.innerHTML = "";

    q.a.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;

        // Selected highlight
        if (answers[currentQuestion] === i) {
            btn.classList.add("selected");
        }

        btn.onclick = () => {
            answers[currentQuestion] = i;

            document.querySelectorAll(".answers button")
                .forEach(b => b.classList.remove("selected"));

            btn.classList.add("selected");

            updatePalette();
        };

        answersEl.appendChild(btn);
    });

    updatePalette();
}

// ================= TIMER =================
function startTimer() {
    timer = setInterval(() => {
        time--;
        timerEl.innerText = time;

        // Circular animation
        document.querySelector(".timer-circle")
            .style.background =
            `conic-gradient(#22c55e ${time * 6.66}%, #334155 0%)`;

        if (time === 0) skipQuestion();
    }, 1000);
}

// ================= NAVIGATION =================
document.getElementById("nextBtn").onclick = () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
};

document.getElementById("prevBtn").onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
};

// ================= SKIP =================
function skipQuestion() {
    answers[currentQuestion] = "skip";

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}
document.getElementById("skipBtn").onclick = skipQuestion;

// ================= SUBMIT =================
document.getElementById("submitBtn").onclick = showResult;

// ================= RESULT =================
function showResult() {
    clearInterval(timer);

    document.querySelector(".main").style.display = "none";
    document.getElementById("result-box").classList.remove("hidden");

    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    let reviewHTML = "";

    questions.forEach((q, i) => {
        let user = answers[i];
        let ans = q.a[q.correct];

        if (user === q.correct) {
            correct++;
            reviewHTML += `<p class="correct">Q${i+1}: ✔ Correct</p>`;
        } 
        else if (user === "skip" || user == null) {
            skipped++;
            reviewHTML += `<p class="skippedAns">Q${i+1}: ⏭ Skipped | Ans: ${ans}</p>`;
        } 
        else {
            wrong++;
            reviewHTML += `<p class="wrong">Q${i+1}: ❌ Wrong | Ans: ${ans}</p>`;
        }
    });

    document.getElementById("correctCount").innerText = correct;
    document.getElementById("wrongCount").innerText = wrong;
    document.getElementById("skipCount").innerText = skipped;

    document.getElementById("score").innerText =
        `Score: ${correct}/${questions.length}`;

    document.getElementById("review").innerHTML = reviewHTML;

    new Chart(document.getElementById("resultChart"), {
        type: "pie",
        data: {
            labels: ["Correct", "Wrong", "Skipped"],
            datasets: [{
                data: [correct, wrong, skipped],
                backgroundColor: ["#22c55e", "#ef4444", "#eab308"]
            }]
        }
    });
}
// chart instance store
let chartInstance = null;

function showResult() {
    clearInterval(timer);

    document.querySelector(".main").style.display = "none";
    document.getElementById("result-box").classList.remove("hidden");

    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    let reviewHTML = "";

    questions.forEach((q, i) => {
        let user = answers[i];
        let ans = q.a[q.correct];

        if (user === q.correct) {
            correct++;
            reviewHTML += `<p class="correct">Q${i+1}: ✔ Correct</p>`;
        } 
        else if (user === "skip" || user == null) {
            skipped++;
            reviewHTML += `<p class="skippedAns">Q${i+1}: ⏭ Skipped | Ans: ${ans}</p>`;
        } 
        else {
            wrong++;
            reviewHTML += `<p class="wrong">Q${i+1}: ❌ Wrong | Ans: ${ans}</p>`;
        }
    });

    document.getElementById("correctCount").innerText = correct;
    document.getElementById("wrongCount").innerText = wrong;
    document.getElementById("skipCount").innerText = skipped;

    document.getElementById("score").innerText =
        `Score: ${correct}/${questions.length}`;

    document.getElementById("review").innerHTML = reviewHTML;

    // 🔥 FIXED CHART
    const ctx = document.getElementById("resultChart");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Correct", "Wrong", "Skipped"],
            datasets: [{
                data: [correct, wrong, skipped],
                backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: "65%",
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

// ================= RESTART =================
function restartQuiz() {
    currentQuestion = 0;
    answers.fill(null);

    document.querySelector(".main").style.display = "flex";
    document.getElementById("result-box").classList.add("hidden");

    loadQuestion();
}

// ================= INIT =================
createPalette();
loadQuestion();