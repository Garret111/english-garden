const challengeWords = [
  {en:'consequence',zh:'結果；後果',level:'B1',example:'Every choice has a consequence.',gap:'consequence',choices:['consequence','confidence','convenience']},
  {en:'convenient',zh:'方便的',level:'B1',example:'Online lessons are convenient when you travel.',gap:'convenient',choices:['confident','convenient','continuous']},
  {en:'effective',zh:'有效的',level:'B1',example:'Short daily practice is an effective way to learn.',gap:'effective',choices:['essential','effective','expensive']},
  {en:'encourage',zh:'鼓勵',level:'B1',example:'Good teachers encourage students to ask questions.',gap:'encourage',choices:['introduce','encourage','exchange']},
  {en:'essential',zh:'必要的；極重要的',level:'B1',example:'Sleep is essential for your health.',gap:'essential',choices:['eventual','essential','economic']},
  {en:'familiar',zh:'熟悉的',level:'B1',example:'This song sounds familiar to me.',gap:'familiar',choices:['fascinating','familiar','financial']},
  {en:'impact',zh:'影響；衝擊',level:'B1',example:'The new rule had a big impact on our plans.',gap:'impact',choices:['impression','impact','improvement']},
  {en:'influence',zh:'影響；左右',level:'B1',example:'Friends can influence the way we think.',gap:'influence',choices:['indicate','influence','include']},
  {en:'survive',zh:'生存；存活',level:'B2',example:'Some plants can survive with very little water.',gap:'survive',choices:['supply','survive','support']},
  {en:'symptom',zh:'症狀',level:'B2',example:'A cough can be a symptom of a cold.',gap:'symptom',choices:['symbol','symptom','system']},
  {en:'technical',zh:'技術性的',level:'B2',example:'The guide explains technical terms in simple language.',gap:'technical',choices:['traditional','technical','typical']},
  {en:'therefore',zh:'因此；所以',level:'B2',example:'It was raining. Therefore, we stayed at home.',gap:'therefore',choices:['throughout','therefore','otherwise']},
  {en:'throughout',zh:'遍及；貫穿',level:'B2',example:'The festival attracts visitors from throughout the country.',gap:'throughout',choices:['throughout','although','thoughtful']},
  {en:'valuable',zh:'寶貴的；有價值的',level:'B2',example:'Practice gives you valuable experience.',gap:'valuable',choices:['various','valuable','visible']},
  {en:'various',zh:'各種不同的',level:'B2',example:'The website offers various ways to practise.',gap:'various',choices:['valuable','various','visual']},
  {en:'theory',zh:'理論',level:'B2',example:'We tested the theory with a simple experiment.',gap:'theory',choices:['theory','theme','threat']}
];
const cefrReference='CEFR 級別依 Oxford 3000 分級詞表標示。';
const badgeNames={first:'初次出發',streak:'三連勝',words:'單字園丁',daily:'任務全收集'};
const $=s=>document.querySelector(s);
let data=JSON.parse(localStorage.getItem('eg-progress')||'{}');
let combo=0;
function dayKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
function todayTasks(){if(!data.daily||data.daily.date!==dayKey())data.daily={date:dayKey(),quiz:false,sentence:false,listen:false,bonus:false};return data.daily}
function save(){localStorage.setItem('eg-progress',JSON.stringify(data));renderProgress();renderGame()}
function renderProgress(){
  const learned=data.learned||[],days=data.days||[],now=new Date(),monday=new Date(now);monday.setDate(now.getDate()-((now.getDay()+6)%7));monday.setHours(0,0,0,0);
  const thisWeek=days.filter(d=>new Date(`${d}T12:00:00`)>=monday).length;
  $('#word-count').textContent=learned.length;$('#progress-text').innerHTML=`${thisWeek} <small>/ 5 天</small>`;$('#progress-fill').style.width=`${Math.min(thisWeek/5*100,100)}%`;
  let streak=0;for(let i=0;i<30;i++){const d=new Date();d.setDate(d.getDate()-i);if(days.includes(dayKey(d)))streak++;else if(i>0)break}
  $('#streak-number').textContent=`${streak} 天`;
}
function renderGame(){
  const xp=data.xp||0,level=Math.floor(xp/100)+1,inside=xp%100,tasks=todayTasks(),done=['quiz','sentence','listen'].filter(k=>tasks[k]).length,badges=data.badges||[];
  $('#level-number').textContent=level;$('#xp-label').textContent=`${xp} XP`;
  $('#xp-next').textContent=inside?`再獲得 ${100-inside} XP 升級`:'再獲得 100 XP 升級';$('#xp-fill').style.width=`${inside}%`;
  $('#mission-count').textContent=`${done} / 3`;$('#badge-count').textContent=`${badges.length} 枚`;
  document.querySelectorAll('[data-mission]').forEach(el=>{const complete=tasks[el.dataset.mission];el.classList.toggle('mission-done',complete);el.textContent=`${complete?'✓':'○'} ${({quiz:'單字闖關',sentence:'例句解謎',listen:'聽力探索'})[el.dataset.mission]}`});
  $('#badge-list').innerHTML=Object.entries(badgeNames).map(([id,name])=>`<span class="badge ${badges.includes(id)?'unlocked':''}" title="${name}">${({first:'🌱',streak:'⚡',words:'📚',daily:'🏆'})[id]}</span>`).join('');
}
const today=new Date();$('#today-label').textContent=`${today.getMonth()+1} 月 ${today.getDate()} 日`;renderProgress();renderGame();
function addXP(amount){data.xp=(data.xp||0)+amount}
function awardBadge(id){data.badges=[...new Set([...(data.badges||[]),id])]}
function markDay(){data.days=[...new Set([...(data.days||[]),dayKey()])]}
function completeMission(key,xp){const tasks=todayTasks();if(!tasks[key]){tasks[key]=true;addXP(xp);markDay();awardBadge('first');if((data.learned||[]).length>=5)awardBadge('words');if(['quiz','sentence','listen'].every(k=>tasks[k])&&!tasks.bonus){tasks.bonus=true;addXP(30);awardBadge('daily');setTimeout(()=>alert('今日任務全數完成！額外獲得 30 XP，並解鎖「任務全收集」徽章！'),100)}}save()}
const modal=$('#modal'),content=$('#modal-content');
function open(){modal.classList.add('show');modal.setAttribute('aria-hidden','false')}
function close(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true')}
$('#close-modal').addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{const type=b.dataset.open;if(type==='quiz')startQuiz();if(type==='sentence')startSentence();if(type==='listen')showListen()}));
function startQuiz(){let list=[...challengeWords].sort(()=>Math.random()-.5).slice(0,5),index=0,score=0;render();open();function render(){if(index>=list.length){completeMission('quiz',20);content.innerHTML=`<div class="modal-kicker">LEVEL CLEAR</div><h2>進階單字關卡完成！</h2><div class="result-score">${score} <small style="font:16px 'Noto Sans TC';color:#8a9289">/ ${list.length}</small></div><p class="result-sub">${score>=4?'出色的表現，繼續探索下一關！':'每次嘗試都是經驗值，繼續累積就會進步。'}</p><button class="next-btn" id="done">領取獎勵 · 回首頁</button>`;$('#done').onclick=close;return}const w=list[index];content.innerHTML=`<div class="modal-kicker">WORD QUEST · ${index+1}/${list.length}</div><h2>進階單字挑戰</h2><p class="question-meta"><span class="cefr-level">CEFR ${w.level}</span>答對獲得 10 XP${combo>0?`　🔥 目前連勝 ${combo}`:''}</p><p class="prompt-cn">選出最符合這個意思的英文：</p><div class="prompt-word">${w.zh}</div><div class="answer-list">${w.choices.map(x=>`<button class="answer-choice">${x}</button>`).join('')}</div><div class="feedback" id="feedback"></div><button class="next-btn" id="next" hidden>下一題 →</button>`;document.querySelectorAll('.answer-choice').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.answer-choice').forEach(x=>x.disabled=true);const ok=btn.textContent===w.en;if(ok){score++;combo++;addXP(10);if(combo%3===0){addXP(5);awardBadge('streak')}data.learned=[...new Set([...(data.learned||[]),w.en])];if(data.learned.length>=5)awardBadge('words');save();btn.classList.add('correct');$('#feedback').textContent=combo%3===0?'連勝加成！ +15 XP　'+w.example:'答對了！ +10 XP　'+w.example}else{combo=0;btn.classList.add('wrong');document.querySelectorAll('.answer-choice').forEach(x=>{if(x.textContent===w.en)x.classList.add('correct')});$('#feedback').textContent=`正確答案是 ${w.en}。${w.example}`}$('#next').hidden=false});$('#next').onclick=()=>{index++;render()}}}
function startSentence(){let list=[...challengeWords].sort(()=>Math.random()-.5).slice(0,3),index=0,score=0;render();open();function render(){if(index>=list.length){completeMission('sentence',15);content.innerHTML=`<div class="modal-kicker">PUZZLE SOLVED</div><h2>進階例句關卡完成！</h2><div class="result-score">${score} <small style="font:16px 'Noto Sans TC';color:#8a9289">/ ${list.length}</small></div><p class="result-sub">你把中高階單字放回情境句，獲得 15 XP。</p><button class="next-btn" id="done">領取獎勵 · 回首頁</button>`;$('#done').onclick=close;return}let w=list[index],before=w.example.split(w.gap)[0],after=w.example.split(w.gap)[1];content.innerHTML=`<div class="modal-kicker">SENTENCE PUZZLE · ${index+1}/${list.length}</div><h2>進階例句填空</h2><p class="question-meta"><span class="cefr-level">CEFR ${w.level}</span>答對一題獲得 10 XP</p><p class="prompt-cn">${w.zh}</p><p class="prompt-word" style="font:20px/1.7 'DM Sans',sans-serif;color:#455a48">${before}<span class="blank">______</span>${after}</p><div class="answer-list">${w.choices.map(x=>`<button class="answer-choice">${x}</button>`).join('')}</div><div class="feedback" id="feedback"></div><button class="next-btn" id="next" hidden>下一題 →</button>`;document.querySelectorAll('.answer-choice').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.answer-choice').forEach(x=>x.disabled=true);let ok=btn.textContent===w.gap;if(ok){score++;addXP(10);data.learned=[...new Set([...(data.learned||[]),w.en])];if(data.learned.length>=5)awardBadge('words');save();btn.classList.add('correct');$('#feedback').textContent='正確！ +10 XP　'+w.example}else{btn.classList.add('wrong');document.querySelectorAll('.answer-choice').forEach(x=>{if(x.textContent===w.gap)x.classList.add('correct')});$('#feedback').textContent=`答案是 ${w.gap}。${w.example}`}$('#next').hidden=false});$('#next').onclick=()=>{index++;render()}}}
function showListen(){content.innerHTML=`<div class="modal-kicker">LISTENING EXPEDITION</div><h2>進階聽力探索</h2><p class="question-meta">${cefrReference} 播放單字完成每日任務。</p>${challengeWords.map(w=>`<div class="listen-row"><div><span class="listen-word">${w.en}</span><span class="cefr-level">CEFR ${w.level}</span><span class="listen-meaning">${w.zh}</span></div><button class="speak-btn" data-word="${w.en}" aria-label="播放 ${w.en} 發音">▶</button></div>`).join('')}<p class="feedback">瀏覽器語音合成播放英文發音。完成任務獲得 10 XP。</p>`;open();document.querySelectorAll('.speak-btn').forEach(b=>b.onclick=()=>{if('speechSynthesis'in window){speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(b.dataset.word);utter.lang='en-US';utter.rate=.82;speechSynthesis.speak(utter)}completeMission('listen',10)})}

