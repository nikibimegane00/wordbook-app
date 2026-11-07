// ========== 画面切り替え ==========                                                                              
function switchMode(mode) {                                                                           
   // 全部の画面をいったん隠す                                                                        
   document.getElementById("menuScreen").style.display = "none";                                      
   document.getElementById("choiceScreen").style.display = "none";                                    
   document.getElementById("sentenceMenuScreen").style.display = "none";                              
   document.getElementById("translateScreen").style.display = "none";                                 
   document.getElementById("arrangeScreen").style.display = "none";                                   
                                                                                                         
   if (mode === "menu") {                                                                             
      document.getElementById("menuScreen").style.display = "block";                                  
   } else if (mode === "choice") {                                                                    
      document.getElementById("choiceScreen").style.display = "block";                                
      resetQuiz();                                                                                    
   } else if (mode === "sentence") {                                                                  
      document.getElementById("sentenceMenuScreen").style.display = "block";                          
   } else if (mode === "translate") {                                                                 
      document.getElementById("translateScreen").style.display = "block";                             
      startTranslate();                                                                               
   } else if (mode === "arrange") {                                                                   
      document.getElementById("arrangeScreen").style.display = "block";                               
      startArrange();                                                                                 
   }                                                                                                  
}                                                                                                           


const words = [                                                                                                       
       { english: "apple", japanese: "りんご" },                                                                         
       { english: "dog", japanese: "いぬ" },                                                                             
       { english: "cat", japanese: "ねこ" },                                                                             
       { english: "book", japanese: "本" },                                                                              
       { english: "run", japanese: "走る" },                                                                             
       { english: "eat", japanese: "食べる" },                                                                           
       { english: "happy", japanese: "幸せな" },                                                                         
       { english: "big", japanese: "大きい" },                                                                           
       { english: "small", japanese: "小さい" },                                                                         
       { english: "blue", japanese: "青い" },                                                                            
       { english: "red", japanese: "赤い" },                                                                             
       { english: "fish", japanese: "さかな" },                                                                          
       { english: "bird", japanese: "とり" },                                                                            
       { english: "sun", japanese: "太陽" },                                                                             
       { english: "moon", japanese: "月" },
       { english: "abandon", japanese: "捨てる" },                                                                       
       { english: "ability", japanese: "能力" },                                                                         
       { english: "abroad", japanese: "海外に" },                                                                        
       { english: "absorb", japanese: "吸収する" },                                                                      
       { english: "accept", japanese: "受け入れる" },                                                                    
       { english: "accident", japanese: "事故" },                                                                        
       { english: "achieve", japanese: "達成する" },                                                                     
       { english: "admit", japanese: "認める" },                                                                         
       { english: "advance", japanese: "進む" },                                                                         
       { english: "advertise", japanese: "宣伝する" },                                                                   
       { english: "advise", japanese: "アドバイスする" },                                                                
       { english: "afford", japanese: "余裕がある" },                                                                    
       { english: "announce", japanese: "発表する" },                                                                    
       { english: "anxious", japanese: "不安な" },                                                                       
       { english: "appear", japanese: "現れる" },                                                                        
       { english: "appreciate", japanese: "感謝する" },                                                                  
       { english: "approve", japanese: "承認する" },                                                                     
       { english: "arrange", japanese: "整理する" },                                                                     
       { english: "attempt", japanese: "試みる" },                                                                       
       { english: "attend", japanese: "出席する" },                                                                      
       { english: "attract", japanese: "引きつける" },                                                                   
       { english: "balance", japanese: "バランス" },                                                                     
       { english: "bargain", japanese: "特売品" },                                                                       
       { english: "bother", japanese: "悩ませる" },                                                                      
       { english: "bound", japanese: "境界" },                                                                           
       { english: "brilliant", japanese: "輝かしい" },                                                                   
       { english: "calculate", japanese: "計算する" },                                                                   
       { english: "cancel", japanese: "キャンセルする" },                                                                
       { english: "capable", japanese: "有能な" },                                                                       
       { english: "celebrate", japanese: "祝う" },                                                                       
       { english: "challenge", japanese: "挑戦" },                                                                       
       { english: "comfort", japanese: "慰める" },                                                                       
       { english: "commit", japanese: "委ねる" },                                                                        
       { english: "communicate", japanese: "伝える" },                                                                   
       { english: "compare", japanese: "比較する" },                                                                     
       { english: "complain", japanese: "文句を言う" },                                                                  
       { english: "confuse", japanese: "混乱させる" },                                                                   
       { english: "connect", japanese: "つなぐ" },                                                                       
       { english: "consider", japanese: "よく考える" },                                                                  
       { english: "continue", japanese: "続ける" },                                                                      
       { english: "contribute", japanese: "貢献する" },                                                                  
       { english: "convince", japanese: "納得させる" },                                                                  
       { english: "curious", japanese: "好奇心が強い" },                                                                 
       { english: "damage", japanese: "損害" },                                                                          
       { english: "decide", japanese: "決心する" },                                                                      
       { english: "declare", japanese: "宣言する" },                                                                     
       { english: "decrease", japanese: "減る" },                                                                        
       { english: "defeat", japanese: "負かす" },                                                                        
       { english: "defend", japanese: "守る" },                                                                          
       { english: "deliver", japanese: "配達する" },                                                                             
   ];                    
   
   // ========== 文を書こう！の問題 ==========                                                           
const sentenceQuestions = [                                                                           
   { japanese: "私はりんごを食べます", english: "I eat an apple.", words: ["I", "eat", "an", "apple"] 
},                                                                                                      
   { japanese: "彼女は本を読んでいます", english: "She is reading a book.", words: ["She", "is",      
"reading", "a", "book"] },                                                                              
   { japanese: "私は公園で走ります", english: "I run in the park.", words: ["I", "run", "in", "the",  
"park"] }                                                                                               
];
                                                                                                                         
   // ========== ゲームの状態 ==========                                                                                 
let currentIndex = 0;      // いま何問目か                                                                            
let score = 0;             // 正解数                                                                                  
let isAnswered = false;    // もう答えたかどうか
const QUIZ_COUNT = 7;    // 1回の出題数 ← 追加！                                                                      
let quizWords = [];      // 今回出す7問 ← 追加！                                                                      
let wrongWords = [];     // 間違えた単語リスト ← 追加！（Step 3で使う）                                                                      
                                                                                                                         
   // ========== HTMLの部品を取得 ==========                                                                             
const questionEl = document.getElementById("question");                                                               
const choicesEl = document.getElementById("choices");                                                                 
const resultEl = document.getElementById("result");                                                                   
const nextBtn = document.getElementById("nextBtn");                                                                   
const progressEl = document.getElementById("progress"); 

// ========== ランダムに7問選ぶ関数 ==========                                                                        
function pickQuizWords() {                                                                                            
   // words をコピーしてシャッフル                                                                                   
   const shuffled = [...words];                                                                                      
   for (let i = shuffled.length - 1; i > 0; i--) {                                                                   
       const j = Math.floor(Math.random() * (i + 1));                                                                
       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];                                                      
   }                                                                                                                 
   // 先頭からQUIZ_COUNT個を取り出す                                                                                 
   quizWords = shuffled.slice(0, QUIZ_COUNT);                                                                        
} 

// ========== スタート！ ==========                                                                                   
pickQuizWords();  // ← 追加！                                                                                         
nextBtn.addEventListener("click", nextQuestion);                                                                      
showQuestion();

   // ========== 問題を表示する関数 ==========                                                                           
function showQuestion() {                                                                                             
       // 前回の答えをリセット                                                                                           
    isAnswered = false;                                                                                               
    resultEl.textContent = "";                                                                                        
    resultEl.className = "result";                                                                                    
    nextBtn.style.display = "none";                                                                                   
                                                                                                                         
       // いまの問題を取得                                                                                               
    const currentWord = quizWords[currentIndex];                                                                          
    questionEl.textContent = currentWord.english;                                                                     
                                                                                                                         
       // 進捗を表示                                                                                                     
    progressEl.textContent = `${currentIndex + 1} / ${quizWords.length}`;                                                 
                                                                                                                         
       // 4つの選択肢を作る                                                                                              
       // まず「正解」を入れる                                                                                           
    let choices = [currentWord.japanese];                                                                             
                                                                                                                         
       // 他の単語から「正解じゃないもの」を3つ選ぶ                                                                      
    const otherWords = words.filter(w => w.japanese !== currentWord.japanese);                                        
    for (let i = 0; i < 3; i++) {                                                                                     
           // ランダムに1つ選ぶ                                                                                          
        const randomIndex = Math.floor(Math.random() * otherWords.length);                                            
        choices.push(otherWords[randomIndex].japanese);                                                               
           // 選んだものは使ったので削除（重複防止）                                                                     
        otherWords.splice(randomIndex, 1);                                                                            
    }                                                                                                                 
                                                                                                                         
       // 4つの選択肢をシャッフル（並び替え）                                                                            
    for (let i = choices.length - 1; i > 0; i--) {                                                                    
        const j = Math.floor(Math.random() * (i + 1));                                                                
        [choices[i], choices[j]] = [choices[j], choices[i]];                                                          
    }                                                                                                                 
                                                                                                                         
       // 選択肢のボタンを作る                                                                                           
    choicesEl.innerHTML = "";                                                                                         
    for (let i = 0; i < choices.length; i++) {                                                                        
        const btn = document.createElement("button");                                                                 
        btn.className = "choice-btn";                                                                                 
        btn.textContent = choices[i];                                                                                 
        btn.dataset.index = i;                                                                                        
        btn.addEventListener("click", () => checkAnswer(btn, choices[i], currentWord.japanese));                      
        choicesEl.appendChild(btn);                                                                                   
    }                                                                                                                 
}                                                                                                                     
                                                                                                                         
   // ========== 答えをチェックする関数 ==========                                                                       
function checkAnswer(clickedBtn, selected, correct) {                                                                 
    if (isAnswered) return; // もう答えてたら何もしない                                                               
                                                                                                                         
    isAnswered = true;                                                                                                
                                                                                                                         
       // 全部のボタンをクリックできなくする                                                                             
    const allBtns = document.querySelectorAll(".choice-btn");                                                         
    allBtns.forEach(btn => btn.disabled = true);                                                                      
                                                                                                                         
       // 正解・不正解を判定                                                                                             
    if (selected === correct) {                                                                                       
           // 正解！                                                                                                     
        clickedBtn.classList.add("correct");                                                                          
        resultEl.textContent = " 正解⭕";                                                                           
        resultEl.className = "result correct";                                                                        
        score++;                                                                                                      
    } else {                                                                                                          
           // 不正解                                                                                                  
        clickedBtn.classList.add("wrong");                                                                            
        resultEl.textContent = "不正解❌ ";                                                                         
        resultEl.className = "result wrong"; 
        
        wrongWords.push(quizWords[currentIndex]);  // ← 間違えた単語を保存！
                                                                                                                         
           // 正解のボタンを緑色で表示                                                                                   
        allBtns.forEach(btn => {                                                                                      
            if (btn.textContent === correct) {                                                                        
                btn.classList.add("correct");                                                                         
            }                                                                                                         
        });                                                                                                           
    }                                                                                                                 
                                                                                                                         
       // 次の問題ボタンを表示                                                                                           
    nextBtn.style.display = "inline-block";                                                                           
}                                                                                                                     
                                                                                                                         
   // ========== 次の問題へ進む関数 ==========                                                                           
function nextQuestion() {                                                                                             
    currentIndex++;                                                                                                   
                                                                                                                         
                                                                                       
   // 全部終わったら結果発表！
if (currentIndex >= quizWords.length) {
   questionEl.textContent = "結果発表";
   choicesEl.innerHTML = "";
   resultEl.textContent = `${quizWords.length}問中 ${score}問 正解！`
   resultEl.className = "result correct";
   nextBtn.textContent = "もう一度";                                                                      
   nextBtn.style.display = "inline-block";                                                                       
// もう一度モードに変更                                                                                       
   nextBtn.removeEventListener("click", nextQuestion);
   nextBtn.addEventListener("click", resetQuiz);
// 🔽 間違えた単語があったら復習ボタンを表示                                                                  
if (wrongWords.length > 0) {                                                                                  
   reviewBtn.textContent = `不正解の単語${wrongWords.length}個を復習する`;                                  
   reviewBtn.style.display = "inline-block";                                                                 
}                                                                   
                                                                                                                         
const ringContainer = document.getElementById("choiceRingContainer");                                              
const ringProgress = document.getElementById("ringProgress")                                                                                                          
const ringText = document.getElementById("ringText")                                                            
                                                                                                                         
// 正解率を計算（0〜100%）                                                                                    
const targetPercent = Math.round((score / quizWords.length) * 100);                                               
const circumference = 2 * Math.PI * 70;  // 約439.8                                                           
                             

// まずリングを表示（最初は0%の状態）                                                                         
ringContainer.style.display = "block"; 
                                                                             
                                                                                                                         
// アニメーションをスタート！                                                                                 
let currentPercent = 0;                                                                                       
                                                                                                                         
function step() {                                                                                             
    currentPercent++;                                                                                         
                                                                                                                         
    // リングの塗る長さを計算                                                                                 
    const offset = circumference * (1 - currentPercent / 100);                                                
    ringProgress.style.strokeDashoffset = offset;                                                             
    ringText.textContent = `${currentPercent}%`;                                                              
                                                                                                                         
    if (currentPercent < targetPercent) {                                                                     
    // まだ目標に達してなかったら次のフレームへ！                                                         
    requestAnimationFrame(step);                                                                          
    }                                                                                                         
}                                                                                                             
                                                                                                                         
requestAnimationFrame(step);                                                          
                                                                                                   
   return;                                                                                                       
}                                                                               
                                                                                                                
                                                                                                                         
    showQuestion();                                                                                                   
}                                                                                                                     
           
function resetQuiz() {
    currentIndex = 0;
    score = 0;
    wrongWords = [];  // ← 間違えたリストもリセット
    pickQuizWords();  // ← 新しく7問選ぶ！
    document.getElementById("choiceRingContainer").style.display = "none";
    nextBtn.textContent = "次の問題 ▶";
    nextBtn.removeEventListener("click", resetQuiz);
    nextBtn.addEventListener("click", nextQuestion);
    showQuestion();
}                                                                                                                     
                                                                                                             
                                                                                                                         
   // ========== スタート！ ==========                                                                                   
nextBtn.addEventListener("click", nextQuestion);                                                                      
showQuestion();  

// ========== まちがえた単語を復習 ==========                                                                         
const reviewBtn = document.getElementById("reviewBtn");                                                               
                                                                                                                         
function startReview() {                                                                                              
    if (wrongWords.length === 0) return;                                                                              
                                                                                                                         
    // まちがえた単語を出題リストにセット                                                                             
    quizWords = [...wrongWords];                                                                                      
    currentIndex = 0;                                                                                                 
    score = 0;                                                                                                        
    wrongWords = [];  // 復習の間違いも記録できるようにリセット                                                       
    document.querySelector(".ring-container").style.display = "none";                                                 
    reviewBtn.style.display = "none";                                                                                 
    nextBtn.textContent = "次の問題 ▶";                                                                               
    nextBtn.removeEventListener("click", startReview);                                                                
    nextBtn.addEventListener("click", nextQuestion);                                                                  
    showQuestion();                                                                                                   
}                                                                                                                     
                                                                                                                         
// 復習ボタンが押されたら                                                                                             
reviewBtn.addEventListener("click", startReview); 

// ========== 🔤 全文英訳モード ==========                                                            
let translateIndex = 0;                                                                               
                                                                                                         
function startTranslate() {                                                                           
   translateIndex = 0;                                                                                
   showTranslateQuestion();                                                                           
}                                                                                                     
                                                                                                         
function showTranslateQuestion() {                                                                    
   const q = sentenceQuestions[translateIndex];                                                       
   document.getElementById("translateQuestion").textContent = q.japanese;                             
   document.getElementById("translateProgress").textContent = `${translateIndex + 1} /                
${sentenceQuestions.length}`;                                                                           
   document.getElementById("translateInput").value = "";                                              
   document.getElementById("translateResult").textContent = "";                                       
   document.getElementById("translateResult").className = "result";                                   
   document.getElementById("translateNextBtn").style.display = "none";                                
   document.getElementById("translateCheckBtn").style.display = "inline-block";                       
}                                                                                                     
                                                                                                         
function checkTranslate() {                                                                           
   const input = document.getElementById("translateInput").value.trim();                              
   const correct = sentenceQuestions[translateIndex].english;                                         
   const resultEl = document.getElementById("translateResult");                                       
                                                                                                         
   if (input.toLowerCase() === correct.toLowerCase()) {                                               
       resultEl.textContent = " 正解⭕";                                                            
       resultEl.className = "result correct";                                                         
   } else {                                                                                           
      resultEl.textContent = ` 不正解❌... 正解は「${correct}」`;                                    
      resultEl.className = "result wrong";                                                           
   }                                                                                                  
                                                                                                         
   document.getElementById("translateCheckBtn").style.display = "none";                               
   document.getElementById("translateNextBtn").style.display = "inline-block";                        
}                                                                                                     
                                                                                                         
function nextTranslateQuestion() {                                                                    
   translateIndex++;                                                                                  
   if (translateIndex >= sentenceQuestions.length) {                                                  
      document.getElementById("translateQuestion").textContent = "";                         
      document.getElementById("translateInput").style.display = "none";                              
                                                                                                         
      // リングを表示！                                                                              
      const ringContainer = document.getElementById("translateRingContainer");                       
      const ringProgress = document.getElementById("translateRingProgress");                         
      const ringText = document.getElementById("translateRingText");                                 
      const targetPercent = 100;                                                                     
      const circumference = 2 * Math.PI * 70;                                                        
                                                                                                         
      document.getElementById("translateResult").textContent = `${sentenceQuestions.length}問終了`;                                                                                              
      document.getElementById("translateResult").className = "result correct";                       
      ringContainer.style.display = "block";                                                         
                                                                                                      
      let currentPercent = 0;                                                                        
      function step() {                                                                              
          currentPercent++;                                                                          
          const offset = circumference * (1 - currentPercent / 100);                                 
          ringProgress.style.strokeDashoffset = offset;                                              
          ringText.textContent = `${currentPercent}%`;                                               
          if (currentPercent < targetPercent) {                                                      
              requestAnimationFrame(step);}                                                                                          
          }    
      }                                                                                          
      requestAnimationFrame(step);                                                                   
                                                                                                         
      document.getElementById("translateNextBtn").textContent = "もう一度";                      
      document.getElementById("translateNextBtn").removeEventListener("click", nextTranslateQuestion);                                                                                 
      document.getElementById("translateNextBtn").addEventListener("click", resetTranslate);         
      return;           
   }                                                                                       
   showTranslateQuestion();                                                                           
                                                                                                     
                                                                                                         
function resetTranslate() {                                                                           
   document.getElementById("translateInput").style.display = "inline-block";                          
   document.getElementById("translateNextBtn").textContent = "次の問題 ▶";                            
   document.getElementById("translateNextBtn").removeEventListener("click", resetTranslate);          
   document.getElementById("translateNextBtn").addEventListener("click", nextTranslateQuestion);      
   startTranslate();                                                                                  
}                                                                                                     
                                                                                                         
document.getElementById("translateCheckBtn").addEventListener("click", checkTranslate);               
document.getElementById("translateNextBtn").addEventListener("click", nextTranslateQuestion);         
                                                                                           
   // ========== 🔀 並び替えモード ==========                                                            
let arrangeIndex = 0;                                                                                 
let selectedWords = [];                                                                               
                                                                                                         
function startArrange() {                                                                             
   arrangeIndex = 0;                                                                                  
   selectedWords = []; 
   document.getElementById("arrangeQuestion").style.display = "";                                     
   document.getElementById("wordBank").style.display = "";                                            
   document.getElementById("answerArea").style.display = "";                                          
   document.querySelector("#arrangeScreen .back-btn").style.display = "";                                                                                
   showArrangeQuestion();                                                                             
}                                                                                                     
                                                                                                         
function showArrangeQuestion() {                                                                      
   const q = sentenceQuestions[arrangeIndex];                                                         
   document.getElementById("arrangeQuestion").textContent = q.japanese;                               
   document.getElementById("arrangeProgress").textContent = `${arrangeIndex + 1} /                    
${sentenceQuestions.length}`;                                                                           
   document.getElementById("arrangeResult").textContent = "";                                         
   document.getElementById("arrangeResult").className = "result";                                     
   document.getElementById("arrangeNextBtn").style.display = "none";                                  
   document.getElementById("arrangeCheckBtn").style.display = "inline-block";                         
                                                                                                         
   const shuffled = [...q.words];                                                                     
   for (let i = shuffled.length - 1; i > 0; i--) {                                                    
       const j = Math.floor(Math.random() * (i + 1));                                                 
       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];                                       
   }                                                                                                  
                                                                                                         
   const wordBank = document.getElementById("wordBank");                                              
   wordBank.innerHTML = "";                                                                           
   selectedWords = [];                                                                                
   for (let i = 0; i < shuffled.length; i++) {                                                        
       const wordBtn = document.createElement("button");                                              
       wordBtn.className = "word-btn";                                                                
       wordBtn.textContent = shuffled[i];                                                             
       wordBtn.dataset.word = shuffled[i];                                                            
       wordBtn.addEventListener("click", () => selectWord(wordBtn));                                  
       wordBank.appendChild(wordBtn);                                                                 
   }                                                                                                  
                                                                                                         
   document.getElementById("answerArea").innerHTML = "";                                              
}                                                                                                     
                                                                                                         
function selectWord(btn) {                                                                            
   const word = btn.textContent;                                                                      
   btn.style.display = "none";                                                                        
                                                                                                         
   const wordChip = document.createElement("button");                                                 
   wordChip.className = "word-chip";                                                                  
   wordChip.textContent = word;                                                                       
   wordChip.addEventListener("click", () => unselectWord(wordChip, btn));                             
                                                                                                         
   document.getElementById("answerArea").appendChild(wordChip);                                       
   selectedWords.push(word);                                                                          
}                                                                                                     
                                                                                                         
function unselectWord(chip, originalBtn) {                                                            
   chip.remove();                                                                                     
   originalBtn.style.display = "inline-block";                                                        
   const idx = selectedWords.indexOf(originalBtn.dataset.word);                                       
   if (idx !== -1) selectedWords.splice(idx, 1);                                                      
}                                                                                                     
                                                                                                         
function checkArrange() {                                                                             
   const correct = sentenceQuestions[arrangeIndex].words.join(" ");                                   
   const userAnswer = selectedWords.join(" ");                                                        
   const resultEl = document.getElementById("arrangeResult");                                         
                                                                                                         
   if (userAnswer.toLowerCase() === correct.toLowerCase()) {                                          
       resultEl.textContent = "⭕正解";                                                            
       resultEl.className = "result correct";                                                         
   } else {                                                                                           
       resultEl.textContent = `❌ 不正解... 正解は「${correct}」`;                                    
       resultEl.className = "result wrong";                                                           
   }                                                                                                  
                                                                                                         
   document.getElementById("arrangeCheckBtn").style.display = "none";                                 
   document.getElementById("arrangeNextBtn").style.display = "inline-block";                          
}                                                                                                     
                                                                                                                                                                                    
                                                                                                  
                                                                                                         
function nextArrangeQuestion() {                                                                      
   arrangeIndex++;                                                                                    
   if (arrangeIndex >= sentenceQuestions.length) {                                                    
      document.getElementById("arrangeQuestion").style.display = "none";           
      document.getElementById("wordBank").style.display = "none";                
      document.getElementById("answerArea").style.display = "none";        
      document.getElementById("arrangeCheckBtn").style.display = "none";       
      document.getElementById("arrangeResult").textContent = "";             
      document.querySelector("#arrangeScreen .back-btn").style.display = "none";                                       
                                                                                                         
       const ringContainer = document.getElementById("arrangeRingContainer");                         
       const ringProgress = document.getElementById("arrangeRingProgress");                           
       const ringText = document.getElementById("arrangeRingText");                                             
       const targetPercent = 100;                                                                     
       const circumference = 2 * Math.PI * 70;                                                        
                                                                                                         
       document.getElementById("arrangeResult").textContent = "";                   
       document.getElementById("arrangeResult").className = "result correct";                         
       ringContainer.style.display = "block";                                                         
                                                                                                         
       let currentPercent = 0;                                                                        
       function step() {                                                                              
           currentPercent++;                                                                          
           const offset = circumference * (1 - currentPercent / 100);                                 
           ringProgress.style.strokeDashoffset = offset;                                              
           ringText.textContent = `${currentPercent}%`;                                               
           if (currentPercent < targetPercent) {                                                      
               requestAnimationFrame(step);                                                           
           }                                                                                          
       }                                                                                              
       requestAnimationFrame(step);                                                                   
                                                                                                         
       document.getElementById("arrangeNextBtn").textContent = "もう一度";                        
       document.getElementById("arrangeNextBtn").removeEventListener("click", nextArrangeQuestion);   
       document.getElementById("arrangeNextBtn").addEventListener("click", resetArrangeFull);         
       return;                                                                                        
   }                                                                                     
   showArrangeQuestion();                                                                            
}                                                                                                     
                                                                                                         
function resetArrangeFull() {                                                                         
   document.getElementById("arrangeNextBtn").textContent = "次の問題 ▶";                              
   document.getElementById("arrangeNextBtn").removeEventListener("click", resetArrangeFull);          
   document.getElementById("arrangeNextBtn").addEventListener("click", nextArrangeQuestion);          
   startArrange();                                                                                    
}                                                                                                     
                                                                                                         
document.getElementById("arrangeCheckBtn").addEventListener("click", checkArrange);                                  
document.getElementById("arrangeNextBtn").addEventListener("click", nextArrangeQuestion);