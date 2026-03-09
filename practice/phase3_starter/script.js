// =============================================
// Phase 3: 이벤트 객체 활용
// =============================================

const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const remainingCount = document.getElementById("remaining-count");

// 남은 항목 수 업데이트
function updateCount() {
  // Phase 2에서 만든 코드를 가져오세요
  // 미션 ③: 완료된 항목(.done)은 제외하고 카운트하기
  // 힌트: todoList.querySelectorAll('.todo-item:not(.done)').length
}

// 할 일 추가 함수 (Phase 2 코드를 가져오세요)
function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.className = "todo-item";

  // 미션 ②: 체크박스 만들고 클릭 이벤트 추가하기
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function (e) {
    // e.target.checked 가 true이면 done 클래스 추가
    // false이면 done 클래스 제거
    // 여기에 코드를 작성하세요 ↓
  });

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.className = "btn-delete";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateCount();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = "";
  updateCount();
}

// 추가 버튼 클릭
addBtn.addEventListener("click", addTodo);

// 미션 ①: Enter 키 이벤트 추가하기
todoInput.addEventListener("keydown", function (e) {
  // e.key 값을 콘솔로 확인해보세요
  console.log("눌린 키:", e.key);

  // Enter 키일 때 addTodo() 호출하기
  // 여기에 코드를 작성하세요 ↓
});
