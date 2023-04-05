
const contentEditableDiv = document.querySelector('#writetext');
let wholeElement=document.getElementById("text_contentdiv");

  function textcreate(element){
    console.log(contentEditableDiv.childNodes)
    let getid=Number(element.className);
    console.log(getid)
    let collectAlldiv=document.querySelectorAll('#writetext');
    let textcontentlength=collectAlldiv.length;
    const visibleElements = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          visibleElements.push(entry.target);
        }
      });
    });
    
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      observer.observe(element);
    });
    console.log(visibleElements);
    
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        console.log('Current position: ', rect.top);
        if (rect.top > 900) {
          if (getid === textcontentlength) {
            const newPage = document.createElement("div");
            newPage.contentEditable = true;
            newPage.setAttribute("id", "writetext");
            newPage.setAttribute("class", `${getid+1}`);
            wholeElement.appendChild(newPage);
            newPage.addEventListener("input", function() {
              textcreate(newPage);
            });
          }
        }
        
      }
    }


//store contentdiv pages innerhtml//
let data=[];
let parentelement=document.getElementById("text_contentdiv");
function storgepages(){
  let textpages=document.querySelectorAll("#writetext");
  textpages.forEach((pages)=>{
    data.push(pages.innerHTML+' Nextpage');
  })
  console.log(data)
  let emailid=localStorage.getItem('email')
  let datas={
    pagevalue:data,
    email:emailid
  }
  fetch('textvalues',{
    method:'POST',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datas)
})
.then((response)=>{
 return response.json()
})
.then((values)=>{
  window.location.href='index';
  createnewpage(data)
})
}
let documentscontainer=document.getElementById('documentscontainer');
function createnewpage(data){
  console.log(data[0])
  let creatediv=document.createElement('div');
  creatediv.setAttribute('contenteditable','true')
  creatediv.setAttribute('class','document_box');
  documentscontainer.appendChild(creatediv);
  creatediv.innerHTML=data[0].innerhtml;
}

// function myfunction(){
//   let detail={
//     name:'mani',
//     id:'1'
//   }
//   fetch('getdbnodes',{
//     method:'POST',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(detail)
// })
// .then((response)=>{
//   return response.json()
//  })
//  .then((values)=>{
//    console.log(values)
//    showinnertext(values)
//  })
// };

// // function showinnertext(values){
// //    let innerHTMLdiv=document.querySelectorAll('#text_page');
// //    console.log(innerHTMLdiv.length);
// //    for(let i=0; i<innerHTMLdiv.length; i++){
// //     let elements=values[i].document.split(' Nextpage');
// //     console.log(elements);
// //     console.log(elements[0]);
// //     innerHTMLdiv[i].innerHTML=values[i].document;
// //     console.log(typeof(values[i].document))
// //    }
// // }

// window.onload=function(){
//   myfunction()
// }
