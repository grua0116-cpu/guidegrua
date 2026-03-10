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
  { name: "도서관", x: 67.2, y: 27.2 },
  { name: "스카이뷰 라운지", x: 31.6, y: 15.4 },
  { name: "창작 스튜디오", x: 60.4, y: 25.1 },
  { name: "박물관", x: 60.5, y: 34.6 },
  { name: "랩", x: 76.9, y: 37.7 },
  { name: "통제실", x: 24.5, y: 36.4 },
  { name: "학생회관", x: 58.2, y: 44.4 },
  { name: "시계탑", x: 49.4, y: 23.5 },
  { name: "중앙 광장", x: 52.4, y: 32.0 },
  { name: "다리", x: 38.7, y: 37.9 },
  { name: "교내 방송국", x: 32.9, y: 54.4 },
  { name: "역사관", x: 28.0, y: 45.0 },
  { name: "고해실", x: 36.9, y: 46.7 },
  { name: "도서관2", x: 77.3, y: 28.4 },
  { name: "본관", x: 36.2, y: 25.1 },
  { name: "추모관", x: 41.9, y: 44.4 }
];

const typeCodeInput = document.getElementById("typeCode");
const typeConfirmBtn = document.getElementById("typeConfirmBtn");
const typeInfo = document.getElementById("typeInfo");
const confirmedType = document.getElementById("confirmedType");
const messageBox = document.getElementById("messageBox");
const mapPoints = document.getElementById("mapPoints");

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
  resetPointStates();
  setMessage(`타입 ${currentType} 확인 완료. 지도에서 연결된 건물을 선택해 주세요.`, "success");
  return true;
}

function goToResultPage(typeCode, buildingName) {
  const params = new URLSearchParams({
    type: typeCode,
    building: buildingName
  });
  window.location.href = `./result.html?${params.toString()}`;
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
    setMessage("이곳은 당신의 자리가 아닙니다. 다시 찾아 주세요.", "error");
    return;
  }

  buttonEl.classList.add("active-correct");
  completed = true;
  setMessage("등록이 완료되었습니다. 곰돌이 페이지로 이동합니다.", "success");

  setTimeout(() => {
    goToResultPage(currentType, expectedBuilding);
  }, 400);
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
