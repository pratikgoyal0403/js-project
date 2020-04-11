const paragraph = document.querySelector('.paragraph');
const inputFeild = document.querySelector('.input-feild');
const timer = document.querySelector('.timer');
let totalWords, paragraphText, wordCounter = 0;
const correctWords = []
//countdown timer of 60seconds
let time = 60;
//saving values in variables
const render = (data)=>{
    const index = Math.ceil(Math.random() * (data.length - 1));
    totalWords = data[index].words;
    paragraphText = data[index].para
    paragraph.innerText = paragraphText;
}

//fetch random para
const fetchPara = async()=>{
  const response = await fetch('paragraphs.json');
  const data = await response.json();
  await render(data);
 
    
}
fetchPara()
//activate timer
const receiveChars = ()=>{
        const timerInterval = setInterval(() => {
            if(time >= 0){
                timer.innerText = time;
                time--;
            }else{
                clearInterval(timerInterval);
                inputFeild.style.display= 'none';
            }
        }, 1000);

}
//check word by word on clicking space
const checkWord = (event)=>{ 
    const wordsArr = paragraphText.split(' ');

    if(event.keyCode === 32){
        const input = inputFeild.value.trim();
        if(wordCounter < wordsArr.length){
            if(wordsArr[wordCounter] === input){
                correctWords.push(wordsArr[wordCounter]);
            }
        }
        wordCounter++;
        console.log(correctWords);
        inputFeild.value = '';
    }
}
//display results


//eventListners
inputFeild.addEventListener('input', receiveChars);
inputFeild.addEventListener('keydown', checkWord);