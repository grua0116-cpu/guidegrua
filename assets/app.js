const TYPE_MAP = {
  IFAP:"도서관",
  IFAB:"스카이뷰 라운지",
  IFLP:"창작 스튜디오",
  IFLB:"박물관",
  IEAP:"랩",
  IEAB:"통제실",
  IELP:"학생회관",
  IELB:"시계탑",
  OFAP:"중앙 광장",
  OFAB:"다리",
  OFLP:"교내 방송국",
  OFLB:"역사관",
  OEAP:"고해실",
  OEAB:"도서관2",
  OELP:"본관",
  OELB:"추모관"
};

const BUILDINGS=[...new Set(Object.values(TYPE_MAP))];
const TOTAL=16;

const nick=document.getElementById("nick");
const type=document.getElementById("type");
const confirmBtn=document.getElementById("confirm");
const msg=document.getElementById("msg");
const grid=document.getElementById("buildings");
const fill=document.getElementById("fill");
const count=document.getElementById("count");
const final=document.getElementById("final");

const {doc,setDoc,getDoc,collection,onSnapshot,serverTimestamp}=window.fns;
const db=window.db;

let currentType=null;

BUILDINGS.forEach(name=>{
  const b=document.createElement("button");
  b.textContent=name;
  b.onclick=()=>selectBuilding(name);
  grid.appendChild(b);
});

confirmBtn.onclick=()=>{
  const t=type.value.trim().toUpperCase();
  if(!TYPE_MAP[t]){msg.textContent="타입 코드 오류";return;}
  currentType=t;
  msg.textContent=`타입 ${t} 확인됨`;
};

async function selectBuilding(name){
  if(!currentType){msg.textContent="타입 먼저 입력";return;}
  if(TYPE_MAP[currentType]!==name){
    msg.textContent="이 건물은 해당 타입이 아님";
    return;
  }
  const ref=doc(db,"registrations",currentType);
  const snap=await getDoc(ref);
  if(snap.exists()){
    msg.textContent="이미 등록된 자리";
    return;
  }
  await setDoc(ref,{
    type:currentType,
    nick:nick.value||"",
    building:name,
    time:serverTimestamp()
  });
  msg.textContent="등록 완료!";
}

onSnapshot(collection(db,"registrations"),snap=>{
  const n=snap.size;
  fill.style.width=(n/TOTAL*100)+"%";
  count.textContent=`${n} / ${TOTAL}`;
  if(n>=TOTAL) final.classList.remove("hidden");
});
