import quiz from "../data/quizzes/quiz-basic.json";

const slug = quiz.slug;

let index = 0;
const answers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next");
const progressEl = document.getElementById("progress");

function render() {
    const q = quiz.questions[index];

    questionEl.textContent = q.text;
    progressEl.textContent = `Question ${index + 1} of ${quiz.questions.length}`;

    optionsEl.innerHTML = "";
    q.options.forEach((opt, i) => {
        optionsEl.innerHTML += `
      <label class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
        <input type="radio" name="answer" value="${i}" class="accent-indigo-600">
        <span>${opt}</span>
      </label>
    `;
    });

    nextBtn.textContent =
        index === quiz.questions.length - 1 ? "Finish" : "Next";

    nextBtn.disabled = true;
}

optionsEl.addEventListener("change", (e) => {
    answers[index] = Number(e.target.value);
    nextBtn.disabled = false;
});

nextBtn.addEventListener("click", () => {
    if (index < quiz.questions.length - 1) {
        index++;
        render();
    } else {
        localStorage.setItem(
            `quiz:answers:${slug}`,
            JSON.stringify(answers)
        );
        window.location.href = "/result";
    }
});

render();
