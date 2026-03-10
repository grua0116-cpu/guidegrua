const resultTypeText = document.getElementById("resultTypeText");
const resultBuildingText = document.getElementById("resultBuildingText");

const params = new URLSearchParams(window.location.search);
const type = params.get("type") || "";
const building = params.get("building") || "";

if (resultTypeText) {
  resultTypeText.textContent = type ? `${type} 포지션 확인 완료` : "포지션 확인 완료";
}

if (resultBuildingText) {
  resultBuildingText.textContent = building ? `배정 장소 : ${building}` : "";
}
