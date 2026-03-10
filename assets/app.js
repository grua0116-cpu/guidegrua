const TYPE_MAP = {
  IFAP: "도서관",
  IFAB: "스카이뷰 라운지",
  IFLP: "창작 스튜디오",
  IFLB: "박물관",
  IEAP: "랩",
  IEAB: "통제실",
  IELP: "학생회관",
  IELB: "시계탑",
  OFAP: "중앙 광장",
  OFAB: "다리",
  OFLP: "교내 방송국",
  OFLB: "역사관",
  OEAP: "고해실",
  OEAB: "도서관2",
  OELP: "본관",
  OELB: "추모관"
};

const typeCodeInput = document.getElementById("typeCode");
const placeNameInput = document.getElementById("placeName");
const submitBtn = document.getElementById("submitBtn");
const messageBox = document.getElementById("messageBox");

function setMessage(text, type = "info") {
  messageBox.textContent = text;
  messageBox.className = `message-box ${type}`;
}

function normalizeTypeCode(value) {
  return value.trim().toUpperCase();
}

function normalizePlaceName(value) {
  return value.trim().replace(/\s+/g, " ");
}

function goToResultPage(typeCode, buildingName) {
  const params = new URLSearchParams({
    type: typeCode,
    building: buildingName
  });
  window.location.href = `./result.html?${params.toString()}`;
}

function handleSubmit() {
  const typeCode = normalizeTypeCode(typeCodeInput.value);
  const placeName = normalizePlaceName(placeNameInput.value);

  if (!typeCode) {
    setMessage("타입 코드를 입력해 주세요.", "error");
    return;
  }

  if (!TYPE_MAP[typeCode]) {
    setMessage("존재하지 않는 타입입니다. 코드를 다시 확인해 주세요.", "error");
    return;
  }

  if (!placeName) {
    setMessage("장소명을 입력해 주세요.", "error");
    return;
  }

  const expectedPlace = TYPE_MAP[typeCode];

  if (placeName !== expectedPlace) {
    setMessage("타입과 장소가 일치하지 않습니다. 다시 확인해 주세요.", "error");
    return;
  }

  setMessage("등록이 완료되었습니다. 곰돌이 페이지로 이동합니다.", "success");

  setTimeout(() => {
    goToResultPage(typeCode, expectedPlace);
  }, 400);
}

if (submitBtn) {
  submitBtn.addEventListener("click", handleSubmit);
}

if (placeNameInput) {
  placeNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });
}

if (typeCodeInput) {
  typeCodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });
}
