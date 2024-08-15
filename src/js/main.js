function day_of_week(day) {
  let weekday = ["일", "월", "화", "수", "목", "금", "토"];
  let d = document.querySelector("#work_date").valueAsDate;
  let n = d.getUTCDay();
  document.querySelector(day).style.display = "block";
  document.querySelector(day).innerHTML = "(" + weekday[n] + ")";
}

let work_day = document.querySelector("#work_date");
work_day.addEventListener("change", (evnt) => {
  day_of_week("#day");
});

$("#work_period").daterangepicker(
  {
    locale: {
      format: "YYYY-MM-DD",
      separator: " ~ ",
      applyLabel: "확인",
      cancelLabel: "취소",
      fromLabel: "From",
      toLabel: "To",
      customRangeLabel: "Custom",
      weekLabel: "W",
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
      monthNames: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
    },
    startDate: new Date(),
    endDate: new Date(),
    drops: "auto",
  },
  function (start, end, label) {
    console.log(
      "New date range selected: " +
        start.format("YYYY-MM-DD") +
        " to " +
        end.format("YYYY-MM-DD") +
        " (predefined range: " +
        label +
        ")"
    );
  }
);

//모달
let focusedElementBeforeModal;
let modal = document.querySelector(".f_layer_pop"); //모달창
let modalOverlay = document.querySelector(".f_modal_overay"); //모달 배경레이어
let modalToggle = document.querySelector(".f_modal_toggle"); //열기 버튼
let modalClose_1 = document.querySelector(".btn-modal-close-1"); // 닫기 버튼
let modalClose_2 = document.querySelector(".btn-modal-close-2"); // 닫기 버튼
modalToggle.addEventListener("click", openModal);

function openModal() {
  //display:none에서 block처리가 되면 기본적으로 내부에서 focus될 요소로 자동 이동
  focusedElementBeforeModal = document.activeElement; // focus된게 아니라 'active'된 el.
  // 현재 포커스된 요소를 반환 여기서는
  // '열기'버튼을 클릭하자마자 함수 실행이기에
  // '열기'버튼을 가리킨다.
  modal.addEventListener("keydown", trapTabKey); // key를 누르고 있을때
  modalOverlay.addEventListener("click", closeModal);
  modalClose_1.addEventListener("click", closeModal);
  modalClose_2.addEventListener("click", closeModal);

  let focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'; //포커스가 갈 수 있는 엘레먼트
  let focusableElements = modal.querySelectorAll(focusableElementsString); //querySelectorAll은 nodelist로 반환함
  //getElementsByClassName, getElementsByTagName 등은 htmlCollection으로 반환하고
  //querySelectorAll은 nodeList로 반환하다.
  //둘의 차이점은 HTMLCollection의 항목은 name, id 속성으로도 접근이 가능하지만, NodeList의 항목은 인덱스 번호로만 접근이 가능하다.
  focusableElements = Array.prototype.slice.call(focusableElements); //노드 목록을 어레이로 변환, 변환하지 않아도 firstTabStop, lastTabStop 값 가져올 수 있음
  let firstTabStop = focusableElements[0];
  let lastTabStop = focusableElements[focusableElements.length - 1];

  modalOverlay.style.display = "block";
  modal.style.display = "block";

  firstTabStop.focus();

  function trapTabKey(e) {
    // Check for TAB key press
    if (e.keyCode === 9) {
      //탭키

      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

        // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE  esc키
    if (e.keyCode === 27) {
      closeModal();
    }
  }
}

function closeModal() {
  modal.style.display = "none";
  modalOverlay.style.display = "none";

  focusedElementBeforeModal.focus();
}
