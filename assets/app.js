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

const MAP_POINTS = [
  { name: "도서관", x: 27, y: 23 },
  { name: "스카이뷰 라운지", x: 41, y: 20 },
  { name: "창작 스튜디오", x: 55, y: 24 },
  { name: "박물관", x: 69, y: 25 },
  { name: "랩", x: 22, y: 41 },
  { name: "통제실", x: 34, y: 44 },
  { name: "학생회관", x: 48, y: 43 },
  { name: "시계탑", x: 61, y: 43 },
  { name: "중앙 광장", x: 45, y: 59 },
  { name: "다리", x: 59, y: 60 },
  { name: "교내 방송국", x: 73, y: 46 },
  { name: "역사관", x: 78, y: 63 },
  { name: "고해실", x: 26, y: 66 },
  { name: "도서관2", x: 37, y: 70 },
  { name: "본관", x: 53, y: 76 },
  { name: "추모관", x: 68, y: 79 }
};

const introPage = document.getElementById("introPage");
const mainPage = document.getElementById("mainPage");
const startBtn = document.getElementById("startBtn");

const typeCodeInput = document.getElementById("typeCode");
const typeConfirmBtn = document.getElementById("typeConfirmBtn");
const typeInfo = document.getElementById("typeInfo");
const confirmedType = document.getElementById("confirmedType");
const messageBox = document.getElementById("messageBox");
const mapPoints = document.getElementById("mapPoints");
const resultCard = document.getElementById("resultCard");
const resultTypeText = document.getElementById("resultTypeText");
const resultBuildingText = document.getElementById("resultBuildingText");

let currentType = null;
let completed = false;

function setMessage(text, type = "info") {
  messageBox.textContent = text;
  messageBox.className = `message-box ${type}`;
}

function normalizeTypeCode(value) {
  return value.trim().toUpperCase();
}

function resetPointStates() {
  document.querySelectorAll(".map-point").forEach((el) => {
    el.classList.remove("active-correct", "active-wrong");
  });
}

function showResultCard(typeCode, buildingName) {
  resultTypeText.textContent = `${typeCode} 포지션 확인 완료`;
  resultBuildingText.textContent = `배정 장소 : ${buildingName}`;
  resultCard.classList.remove("hidden");
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideResultCard() {
  resultCard.classList.add("hidden");
}

function validateType() {
  const typeCode = normalizeTypeCode(typeCodeInput.value);

  if (!typeCode) {
    setMessage("타입 코드를 입력해 주세요.", "error");
    return false;
  }

  if (!TYPE_MAP[typeCode]) {
    setMessage("존재하지 않는 타입입니다. 코드를 다시 확인해 주세요.", "error");
    return false;
  }

  currentType = typeCode;
  completed = false;
  confirmedType.textContent = currentType;
  typeInfo.classList.remove("hidden");
  hideResultCard();
  resetPointStates();
  setMessage(`타입 ${currentType} 확인 완료. 지도에서 연결된 건물을 선택해 주세요.`, "success");
  return true;
}

function handlePointClick(buildingName, buttonEl) {
  if (!currentType) {
    setMessage("먼저 타입 코드를 입력해 주세요.", "error");
    return;
  }

  if (completed) return;

  const expectedBuilding = TYPE_MAP[currentType];
  resetPointStates();

  if (buildingName !== expectedBuilding) {
    buttonEl.classList.add("active-wrong");
    hideResultCard();
    setMessage("이곳은 당신의 자리가 아닙니다. 다시 찾아 주세요.", "error");
    return;
  }

  buttonEl.classList.add("active-correct");
  completed = true;
  setMessage("등록이 완료되었습니다.", "success");
  showResultCard(currentType, expectedBuilding);
}

function renderMapPoints() {
  if (!mapPoints) return;

  mapPoints.innerHTML = "";

  MAP_POINTS.forEach((point) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "map-point";
    btn.style.left = `${point.x}%`;
    btn.style.top = `${point.y}%`;
    btn.setAttribute("aria-label", point.name);

    const label = document.createElement("span");
    label.className = "point-label";
    label.textContent = point.name;

    btn.appendChild(label);
    btn.addEventListener("click", () => handlePointClick(point.name, btn));
    mapPoints.appendChild(btn);
  });
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    introPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
  });
}

if (typeConfirmBtn) {
  typeConfirmBtn.addEventListener("click", validateType);
}

if (typeCodeInput) {
  typeCodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      validateType();
    }
  });
}

renderMapPoints();
