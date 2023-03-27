
let myleads=[]
let oldleads=[]
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const delBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")
const leadsFromLS = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLS)
{
    myleads= leadsFromLS
    render(myleads)
}

function render(leads){
    
    let listener=""
    for(let i=0;i<leads.length;i++)
    {
        listener+=`<li>
        <a href=${leads[i]} target='_blank'>${leads[i]}</a>
        </li>`
    }
    ulEl.innerHTML=listener
}

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myleads))
        render(myleads)
    })
})

delBtn.addEventListener("dblclick",function(){
    console.log("Double clicked")
    localStorage.clear()
    myleads=[]
    render(myleads)

})


const inputBtn=document.getElementById("input-btn").addEventListener('click',function(){
    myleads.push(inputEl.value)
    inputEl.value=""
    var leads=JSON.stringify(myleads)
    localStorage.setItem("myLeads",leads)
    render(myleads)

    console.log(localStorage.getItem("myLeads"))
})

