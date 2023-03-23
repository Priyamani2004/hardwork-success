
const contentEditableDiv = document.querySelector('#writetext');
let rect = contentEditableDiv.getBoundingClientRect();
let wholeElement=document.getElementById("text_contentdiv");


// contentEditableDiv.addEventListener("keydown", function(event) {
//   if (event.keyCode === 13) {
//     // Add a space after pressing enter
//     document.execCommand("insertHTML", false, "&nbsp;");
    
//     // Prevent the default enter behavior (line break)
//     event.preventDefault();
//   }
// });

  function textcreate(element){
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
        if (rect.top > 700) {
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

