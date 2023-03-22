const inputSlider=document.querySelector("[data-lengthSlider]")
const lengthDisplay=document.querySelector("[data-lengthNumber]")
const passwordDisplay=document.querySelector("[data-passwordDisplay]")
const copyBtn=document.querySelector("[data-copy]")
const copyMsg=document.querySelector("[data-copyMsg]")
const uppercaseCheck=document.querySelector("#uppercase")
const lowercaseCheck=document.querySelector("#lowercase")
const numbersCheck=document.querySelector("#numbers")
const symbolsCheck=document.querySelector("#symbols")
const indicator=document.querySelector("[data-indicator]")
const generateBtn=document.querySelector(".generateButton")
const allCheckBox=document.querySelectorAll("input[type=checkbox]")

let password ="";
let passwordLength=10;
let checkCount=0;
let symbols='!@#$%^&*()_+<>';
//st strength circle color to grey
handleSlider();
setIndicator("#ccc")
//set passwordLength
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
     const min=inputSlider.min;
     const max=inputSlider.max;
     inputSlider.style.backgroundSize =((passwordLength-min)*100/(max-min)) + "% 100%";
}
function setIndicator(color){
    indicator.style.backgroundColor=color;
     indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function getRndInteger(min,max){
       return Math.floor(Math.random()*(max -min))+min
}
// random number between 0-9
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateRandomLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}
// random alphabet between A-Z
function generateRandomUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
//shuffle the password 
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

//calculate strength of password- strong ,weak
function calculateStrength(){
    let uppercase=false;
    let lowercase=false;
    let numbers=false;
    let symbols=false;
    if(uppercaseCheck.checked)
     uppercase=true;
    if(lowercaseCheck.checked)
     lowercase=true;
    if(numbersCheck.checked)
    numbers=true;
    if(symbolsCheck.checked)
      symbols=true;
   if(uppercase && lowercase && symbols && numbers && passwordLength >= 8){
       setIndicator("#0f0");
   }
   else if((uppercase || lowercase) && (symbols || numbers ) && passwordLength >= 6 ){
       setIndicator("#ff0"); 
   }
   else {
      setIndicator("red");
   }
}
    
   //event listener forcopy msg
copyBtn.addEventListener("click",()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})
   // copy password
   async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
       copyMsg.innerText="copied";
      } catch (e) {
          copyMsg.innerText="failed";
      }
   
   // visible copied msg for 2 sec
     copyMsg.classList.add("active");
     setTimeout(()=>{
        copyMsg.classList.remove("active")
     },2000)
   
}

//event listener for slider
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
}) 

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkCount++;
        }
    })
    //special case
    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChange);
}
)

//event listener for generate password
generateBtn.addEventListener('click',()=>{
           if(checkCount <= 0){
            return
           }
        if( passwordLength < checkCount ){
             passwordLength=checkCount;
             handleSlider();
        }
    // remove old password
    password='';
   
    //let start journey for finding new password
    let funcArr=[];
    if(uppercaseCheck.checked){
        funcArr.push(generateRandomUppercase)
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateRandomLowercase)
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol)
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber)
    }
    //compulsory addition
  
  for(let i=0 ;i<funcArr.length;i++){
    password+=funcArr[i] () }
  
    //remaining addition
    for(let i=0;i<passwordLength -funcArr.length;i++){
        let randIndex=getRndInteger(0 , funcArr.length)
        password +=funcArr[randIndex]();
    }
        //shuffle the password
        password=shufflePassword(Array.from(password));
      
        // cal strength
         passwordDisplay.value=password;
        calculateStrength();
      
    
})