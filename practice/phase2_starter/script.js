// =============================================
// Phase 2: 항목 추가 + 삭제
// =============================================

const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const remainingCount = document.getElementById("remaining-count");

// 남은 항목 수 업데이트 함수
function updateCount() {
  // 힌트: todoList.children.length 를 활용하세요
  // 여기에 코드를 작성하세요 ↓
}

// 할 일 추가 함수
function addTodo() {
  const text = todoInput.value.trim();

  // 빈 값이면 아무것도 하지 않기
  if (text === "") return;

  // 미션: 아래를 채워서 li 항목을 만들고 목록에 추가해보세요

  // ① li 요소 만들기
  // const li = ...

  // ② span 요소 만들기 + 텍스트 넣기
  // const span = ...

  // ③ 삭제 버튼 만들기
  // const deleteBtn = ...
  // deleteBtn.textContent = '삭제'
  // deleteBtn.className = 'btn-delete'

  // ④ 삭제 버튼 클릭 시 li 삭제 + 카운트 업데이트
  // deleteBtn.addEventListener('click', function() {
  //     ...
  // });

  // ⑤ li에 span, deleteBtn 붙이기
  // li.appendChild(...)
  // li.appendChild(...)

  // ⑥ todoList에 li 추가하기
  // todoList.appendChild(...)

  // ⑦ 입력창 비우기
  todoInput.value = "";

  // ⑧ 카운트 업데이트
  updateCount();
}

// 추가 버튼 클릭 이벤트
addBtn.addEventListener("click", addTodo);
