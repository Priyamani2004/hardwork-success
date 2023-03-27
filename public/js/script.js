
const contentEditableDiv = document.querySelector('#writetext');
let wholeElement=document.getElementById("text_contentdiv");

  function textcreate(element){
    console.log(contentEditableDiv.childNodes)
    let getid=Number(element.className);
    console.log(getid)
    let collectAlldiv=document.querySelectorAll('#writetext');
    let textcontentlength=collectAlldiv.length;
    //visible element function//
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








