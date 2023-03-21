
const contentEditableDiv = document.querySelector('#writetext');
let rect = contentEditableDiv.getBoundingClientRect();
let wholeElement=document.getElementById("text_contentdiv");
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
        if (rect.top > 700 && rect.top < 900) {
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

    // contentEditableDiv.addEventListener('keydown', (event) => {
    //   console.log(event.keyCode)
    //   if (event.keyCode === 13) {
    //     console.log("mani")
    //     const selection = window.getSelection();
    //     if (selection.rangeCount > 0) {
    //       const range = selection.getRangeAt(0);
    //       const rect = range.getBoundingClientRect();
    //       console.log('Current position: ', rect.top+1);
    //     // Do something with the next position
    //   }
    // }
    // });
    
    contentEditableDiv.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // prevent line break from being inserted
        const selection = window.getSelection();
        // const range = selection.getRangeAt(0);
        // const position = range.startOffset;
        console.log(selection);
        // add a new character to the div
        // div.innerHTML = div.innerHTML.slice(0, position) + "X" + div.innerHTML.slice(position);
        // // set the // const editor = document.getElementById("writetext");
// let count=0;
// editor.addEventListener("keyup", function() {
//   const height = editor.clientHeight;
//   console.log(height)
// });


// editor.addEventListener("keyup", function(event) {
//   if (isAtEndOfPage(this)) {
//     const newPage = document.createElement("div");
//     newPage.contentEditable = true;
//     newPage.setAttribute("id","writetext")
//     this.parentNode.appendChild(newPage);
//     newPage.focus();
//   }
// });

// // Helper function to check if we're at the end of the page
// function isAtEndOfPage(element) {
//     console.log(element);
//   const scrollTop = element.scrollTop;
//   console.log(scrollTop);
//   const scrollHeight = element.scrollHeight;
//   console.log(scrollHeight);
//   const clientHeight = element.clientHeight;
//   console.log(clientHeight);
//   return scrollTop + clientHeight === scrollHeight;
// }
// const mydiv = document.getElementById("writetext");
// mydiv.addEventListener("keyup", function() {
//   const selection = window.getSelection();
//   const position = selection.anchorOffset;
//   console.log("Current position: " + position);
// });


// contentEditableDiv.addEventListener('input', function() {
//   const textLength = contentEditableDiv.innerText.length;
//   console.log('The text length is: ' + textLength);
// });
//let elem = document.querySelector("div");
// console.log(rect.top);    // output: 20
// console.log(rect.left);   // output: 50
// console.log(rect.width);  // output: 200
// console.log(rect.height); // output: 100cursor position to the next character
        // range.setStart(div.childNodes[0], position + 1);
        // range.setEnd(div.childNodes[0], position + 1);
        // selection.removeAllRanges();
        // selection.addRange(range);
      }
    });
    

