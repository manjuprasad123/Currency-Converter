const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const fromCurr=document.querySelector(".from");
const toCurr=document.querySelector(".to");

const msg=document.querySelector(".msg");

for(let select of dropdowns){
  for(currCode in countryList){
    let newOption=document.createElement("option");
    newOption.value=currCode;
    newOption.innerText=currCode;
    if(select.name==="from" && currCode==="USD"){
      newOption.selected=true;
    } 
    if(select.name==="to" && currCode==="INR"){
      newOption.selected=true;
    }
    select.append(newOption);
  }

  select.addEventListener("change",(e)=>{
    updateflag(e.target);
  })
}

const updateflag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
}

btn.addEventListener("click",async(e)=>{
  e.preventDefault();
  let amount=document.querySelector(".amount input");
  let amtval=amount.value;
  if(amtval==="" || amtval<1){
    amount.value="1";
    amtval="1";
  }

  let to=toCurr.value.toLowerCase();
  let from=fromCurr.value.toLowerCase();

  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
  let response=await fetch(URL);
  let data=await response.json();

  let rate=data[from][to];

  console.log(rate);

  let finalresult=Number(amtval)*rate;

  msg.innerText=`${amtval} ${fromCurr.value} = ${finalresult} ${toCurr.value}`;
})