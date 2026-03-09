const appTitle = document.querySelector(".app-header h1");
const appSubtitle = document.querySelector(".app-header p");

const remainingCount = document.getElementById("remaining-count");
const remainingCount2 = document.getElementById("remaining-count-2");

const totalCount = document.getElementById("total-count");
const doneCount = document.getElementById("done-count");

const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");

const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");

const scrollBtn = document.getElementById("scroll-top");

const blossomContainer = document.querySelector(".blossom-container");
const effectContainer = document.querySelector(".effect-container");
const filterBtns = document.querySelectorAll(".filter-btn");

/* Phase 1 미션 */

appTitle.textContent = "나만의 Todo 앱";
appSubtitle.textContent = "봄 햇살 아래서 오늘 할 일도 하나씩 🌸";

remainingCount.textContent = "3";

console.log(todoList);

/* localStorage 저장 */

function saveTodos() {
  const todos = [];

  const items = todoList.querySelectorAll("li");

  items.forEach(function (item) {
    const text = item.querySelector("span").textContent;

    const checked = item.querySelector('input[type="checkbox"]').checked;

    todos.push({
      text: text,
      done: checked,
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

/* 남은 할 일 계산 */

function updateCount() {
  const allItems = todoList.querySelectorAll("li");

  const doneItems = todoList.querySelectorAll("li.done");

  const remaining = allItems.length - doneItems.length;

  remainingCount.textContent = remaining;
  remainingCount2.textContent = remaining;

  totalCount.textContent = allItems.length;
  doneCount.textContent = doneItems.length;
}

/* Todo 요소 생성 */

function createTodoItem(text, isDone = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  checkbox.type = "checkbox";
  checkbox.checked = isDone;

  span.textContent = text;
  deleteBtn.textContent = "삭제";

  if (isDone) {
    li.classList.add("done");
  }

  /* 체크 이벤트 */

  checkbox.addEventListener("change", function (e) {
    li.classList.toggle("done", e.target.checked);

    updateCount();
    saveTodos();

    if (e.target.checked) {
      const rect = checkbox.getBoundingClientRect();

      createFlowerEffect(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      createConfetti(rect.left, rect.top);
    }
  });

  /* 삭제 이벤트 */

  deleteBtn.addEventListener("click", function () {
    li.remove();

    updateCount();
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

/* Todo 추가 */

function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") return;

  const li = createTodoItem(text);

  todoList.appendChild(li);

  todoInput.value = "";

  updateCount();
  saveTodos();
}

/* 저장된 Todo 불러오기 */

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");

  if (!savedTodos) return;

  const todos = JSON.parse(savedTodos);

  todos.forEach(function (todo) {
    const li = createTodoItem(todo.text, todo.done);

    todoList.appendChild(li);
  });

  updateCount();
}

/* 전체 삭제 */

clearBtn.addEventListener("click", function () {
  todoList.innerHTML = "";

  updateCount();
  saveTodos();
});

/* 버튼 이벤트 */

addBtn.addEventListener("click", addTodo);

/* Enter 입력 */

todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

/* 스크롤 상단 버튼 */

window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

/* 상단 이동 */

scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* 벚꽃 생성 */

function createBlossom() {
  const blossom = document.createElement("div");

  blossom.classList.add("blossom");
  blossom.textContent = "🌸";

  blossom.style.left = Math.random() * window.innerWidth + "px";

  blossom.style.animationDuration = 6 + Math.random() * 5 + "s";

  blossomContainer.appendChild(blossom);

  setTimeout(function () {
    blossom.remove();
  }, 11000);
}

/* 체크 완료 꽃 이펙트 생성 */
function createFlowerEffect(x, y) {
  const flowers = ["🌸", "🌷", "💮"];

  for (let i = 0; i < 8; i++) {
    const flower = document.createElement("div");
    flower.classList.add("effect-flower");
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;

    const moveX = `${Math.random() * 60 - 30}px`;
    const moveY = `${Math.random() * -60 - 10}px`;
    const rotate = `${Math.random() * 360}deg`;
    flower.style.setProperty("--r", rotate);

    flower.style.setProperty("--x", moveX);
    flower.style.setProperty("--y", moveY);

    effectContainer.appendChild(flower);

    setTimeout(function () {
      flower.remove();
    }, 1500);
  }
}

function filterTodos(type) {
  const items = todoList.querySelectorAll("li");

  items.forEach((item) => {
    if (type === "all") {
      item.style.display = "flex";
    }

    if (type === "active") {
      item.style.display = item.classList.contains("done") ? "none" : "flex";
    }

    if (type === "done") {
      item.style.display = item.classList.contains("done") ? "flex" : "none";
    }
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");

    btn.classList.add("active");

    filterTodos(btn.dataset.filter);
  });
});

const darkToggle = document.getElementById("dark-toggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function createConfetti(x, y) {
  const items = ["🎉", "✨", "💖"];

  for (let i = 0; i < 10; i++) {
    const confetti = document.createElement("div");

    confetti.classList.add("confetti");
    confetti.textContent = items[Math.floor(Math.random() * items.length)];

    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;

    const moveX = `${Math.random() * 100 - 50}px`;
    const moveY = `${Math.random() * -100}px`;

    confetti.style.setProperty("--x", moveX);
    confetti.style.setProperty("--y", moveY);

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 1000);
  }
}

/* 일정 간격으로 벚꽃 생성 */

setInterval(createBlossom, 700);

/* 초기 실행 */

loadTodos();
updateCount();
