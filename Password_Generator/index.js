// way of fetching coustom attribute
const inputSlider= document.querySelector("[data-lengthSlider]"); 
const lengthDisplay = document.querySelector("[data-lengthNmber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]"); 
const btnCopy = document.querySelector("[ data-copy]"); 
const messCopy = document.querySelector("[data-copyMsg]");
// way of fetching id attribute 
const uppercaseCheck = document.querySelector("#Uppercase"); 
const lowercaseCheck = document.querySelector("#Lowercase"); 
const numberCheck = document.querySelector("#Numbers"); 
const symbolCheck = document.querySelector("#Symbols"); 

const indicator = document.querySelector("[data-indicator]"); 
// way of fetching class attribute
const  geberateBtn = document.querySelector(".generator-button");

const  allcheckbox = document.querySelectorAll("input[type=checkbox]");  // it fetch all check box 

const symbols='`~!@#$%^&*_+-=\/.,;';

// intially
// password is empty
let password="";
// pass length is 10
let passwordLength=10;
// one checkbox is checked intially
let checkCount=0;


// Now  explore required function       
// handle slider
// it set password length
handleSlider();
//set strenght circle color to gray 
setIndicator("#ccc");   

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

// set indicator color
function setIndicator(color){
    // fectching css property using js . we can use it by  { style property ,set attribute, class attribute , cssnext and more}
    indicator.style.backgroundColor  = color;
    // shadow
}

// get random number in the range
function getRandomInteger(min,max){
     // rondom default range [0 ,1)
     return Math.floor(Math.random()*(max-min) ) + min;
}

function genereteRandomNumber(){
     return getRandomInteger(0,9);
}

function genereteRandomLowercase(){
    // String.fromCharCode() convert integer to char
    return String.fromCharCode(getRandomInteger(97,128));
}

function genereteRandomUppercase(){
    return String.fromCodePoint(getRandomInteger(65,91));
}


function genereteRandomSymbol(){
    const randNum = getRandomInteger(0,symbols.length);
    return  symbols.charAt(randNum);
}

// strength
function calcStrength(){
    let hasUpper =false;
    let hasLower =false;
    let hasNumber =false;
    let hasSymbol =false;

    if(uppercaseCheck.checked) hasUpper=true;  // .checked is used for check the checkbox is checked or not
    if(lowercaseCheck.checked) hasUpper=true;
    if(numberCheck.checked) hasNumber=true;
    if(symbolCheck.checked) hasSymbol=true;

    if(hasUpper && hasLower && hasNumber && hasSymbol && passwordLength >=8)
    {
        setIndicator('#0f0');
    }
    else if(hasUpper && hasLower && !(hasNumber && hasSymbol) && passwordLength <=6)
    {
        setIndicator('#f00');
    }

}


// copy the password
async function copyContent()
{
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        messCopy.innerText ="copied";
    }
    catch(e)
    {
        messCopy.innerText ="Failed";
    }
}

// for copy span  visible  message
messCopy.classList.add("active");

//set time for showing "copied" message; 
setTimeout(()=>{
    messCopy.classList.remove("active");
})

// password suffle function 
function shufflePassword(array)
{
     // algorithm for suffle - Fisher Yates Method
     for(let i= array.length-1 ; i>0 ;i--)
        {
            const j =Math.floor(Math.random()*(i+1));
            const temp = array[i];
            array[i] =array[j];
            array[j] =temp;
        }
        let str ="";
        array.forEach((el) =>(str += el));
        return str; 
}



// handle checkbox changes ..................
function handleCheckBoxChange()
{
    checkCount =0;
    allcheckbox.forEach((checkbox) =>{
        if(checkbox.checked) checkCount++; 
    })
    // special condition
    if(passwordLength < checkCount)
        {
            passwordLength = checkCount;
            handleSlider();
        }
}


allcheckbox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})





// changing slider value 
inputSlider.addEventListener('input',(e) =>{
    passwordLength =e.target.value;
    handleSlider();
})

btnCopy.addEventListener('click',() =>{
    if(passwordDisplay.value)
         copyContent();
})

geberateBtn.addEventListener('click',() =>{
    if(checkCount <= 0) return;

    if(passwordLength < checkCount)
        {
            passwordLength = checkCount;
            handleSlider();
        }
   // let's start journey to  generate new password
    console.log("starting the journey");
   // in case password is extit then we first erase the password
   password ="";

  // let puts the stuff mentioned by checkbox

//   if(uppercaseCheck.checked)
//     {
//         password += genereteRandomUppercase();
//     }
//   if(lowercaseCheck.checked)
//     {
//         password += genereteRandomLowercase();
//     }
//   if(symbolCheck.checked)
//     {
//         password += genereteRandomSymbol();
//     }
//   if(numberCheck.checked)
//     {
//         password += genereteRandomNumbers();
//     }


  let funArr = [];

  if(uppercaseCheck.checked)
        funArr.push(genereteRandomUppercase);
  if(lowercaseCheck.checked)
        funArr.push(genereteRandomLowercase);
  if(numberCheck.checked)
        funArr.push(genereteRandomNumber);
  if(symbolCheck.checked)
        funArr.push(genereteRandomSymbol);

   // compulsary addition 
    for(let i=0;i<funArr.length;i++){
        password += funArr[i]();
    }

    console.log("compulsary addition  done");

  // remaining addition 
    for(let i=0; i<passwordLength - funArr.length ;i++){
        let randIndx = getRandomInteger(0,funArr.length);
        password += funArr[randIndx]();
    }
    console.log("ramaining addition  done");
     // shuffle the password
     password = shufflePassword(Array.from(password));
     console.log("shuffling done");
     // show password in UI
    passwordDisplay.value = password;
    console.log(" UI addition  done");
    calcStrength();

})




