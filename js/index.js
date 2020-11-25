window.addEventListener('load', () => {

      let isMaj = false;
      let isCapslocked = false;
      let isAltgr = false;

      const switchMode = document.querySelector('#switch');
      const cssFile = document.querySelector('link[href=\'css/keyboard-light.css\']');
      switchMode.addEventListener('click', ()=> {
      switchMode.checked ? cssFile.setAttribute('href','css/keyboard-dark.css') : cssFile.setAttribute('href','css/keyboard-light.css');
      })


      // const toggleKeyboard = document.querySelector('.toggleBtn');
      // const keyboard = document.querySelector('.keyboard');
      // toggleKeyboard.addEventListener('click', () => {
      // keyboard.classList.toggle('active');
      // });

      const capsLockLed = document.querySelector('#led');
      const buttons = document.querySelectorAll('button');
      const textOutput = document.querySelector('textarea');


       function caretPos() {
            let textData = JSON.stringify(textOutput.value);
            let data = textData.replaceAll('\\n',String.fromCharCode(10));
            let caret = textOutput.selectionStart;
            let chn1= data.slice(1,caret+1);
            let chn2 = data.slice(caret+1,-1);
            return {chn1,chn2,caret};
      }

      buttons.forEach(button => {
      button.addEventListener('click', ()=> {
          const {chn1,chn2,caret} = caretPos();
            switch (button.id) {
                  case 'BACKSPACE':
                        textOutput.value = chn1.substring(0,caret - 1 ) + chn2;
                        break;
                  case 'del':
                        textOutput.value = chn1 + chn2.substring(1,chn2.length);
                        break;
                  case 'space':
                        textOutput.value = chn1 + ' ' + chn2;
                        break;
                  case 'enter':
                        textOutput.value = chn1 + '\n' + chn2;
                        break;
                  case 'capsLock':
                        isCapslocked = !isCapslocked;
                        isMaj = !isMaj
                        capsLocked();
                        capsLockLed.classList.toggle('led-active');
                        break;
                  case 'TAB':
                        textOutput.value = chn1 + '   ' + chn2;
                        break;
                  case 'up':
                        moveCursor.vertical(caret,'up')
                        break;
                  case 'down':
                        moveCursor.vertical(caret,'down')
                        break;
                  case 'left':
                        moveCursor.lateral(-1)
                        break;
                  case 'right':
                        moveCursor.lateral(1);
                        break; 
                  case 'uppercase':
                        majActive();
                        break;
                  case 'altgr':
                        altgrActive(button);
                        break;
                  case 'start':
                        moveCursor.line(caret,button.id,chn1)
                        break;
                  case 'end':
                        moveCursor.line(caret,button.id,chn2)
                        break;
                  case 'pageUp':
                        moveCursor.page(button.id)
                        break;
                  case 'pageDown':
                        moveCursor.page(button.id)
                        break;                     
                  default:
                        writeInTextArea(button,chn1,chn2);
                        break;
            }
            textOutput.focus();
            //addTextAreaIndex();
      })
      });


      function majActive() {
            if(isMaj){
                  isMaj = false
                  remove.capsLock();
            }
            else {
                  isMaj = true;
                  const capsBtn = Array.from(buttons).filter(button => button.id === 'uppercase');
                  for(let i=0; i<capsBtn.length; i++){
                        capsBtn[i].classList.add('uppercase-active')
                  }
                  capsLocked();
            }     
      }

      function altgrActive(button) {
            if(isAltgr) {
                  isAltgr = false;
                  remove.altGr();
                  return;
            }
            capsLockLed.classList.remove('led-active');
            remove.capsLock();
            isAltgr = true;
            button.classList.add('altGr-active');
            buttons.forEach(button => {
                  if(button.classList.contains('number')) button.classList.add('altgrActive');
            })
      }


      function writeInTextArea(button,chn1,chn2) {
            let input;

            if(button.children.length >= 2){   
                  if(isMaj) {
                        input = button.children[1].innerText;
                  }
                  else if(!isMaj) {
                        input = button.children[0].innerText;
                  }
                  else if(isAltgr){
                        input = button.children[3].innerText;
                  }
            }
            else {
                  input = button.innerText;
            }
            textOutput.value = chn1 + input + chn2;
            if(!isCapslocked) remove.capsLock();
            remove.altGr();
            isMaj = false;
            isAltgr = false;
      }
           
      

      
      
      const moveCursor = {
            lateral(direction) {
                  let caretPos = textOutput.selectionStart;
                  if(direction === -1 && caretPos === 0 ) return;
                  textOutput.setSelectionRange(caretPos + direction, caretPos + direction);
            },
            vertical(caret,direction) {
                  if(direction === 'up') {
                        let str= textOutput.value.slice(0,caret);
                        const dataArray = str.split('\n');
                        if(!str.includes('\n')) return;
                        textOutput.setSelectionRange(caret - (dataArray[dataArray.length - 1].length + 1), caret - (dataArray[dataArray.length - 1].length + 1) );
                  }
                  else if(direction === 'down') {
                        let str = textOutput.value.slice(caret+1);
                        const dataArray = str.split('\n');
                        //console.log(dataArray);
                        textOutput.setSelectionRange(caret + (dataArray[0].length + 1), caret + (dataArray[0].length + 1));
                  }          
            },
            page(button) {
                  if(button === 'pageUp') {
                        textOutput.setSelectionRange(0,0)
                  }
                  else if(button === 'pageDown') {
                        textOutput.setSelectionRange(textOutput.value.length,textOutput.value.length)
                  }
            },
            line(caret,button,str) {
                  if(button === 'start') {
                        const data = str.split('\n');
                        textOutput.setSelectionRange(caret - data[data.length - 1].length,caret - data[data.length - 1].length)
                  }
                  else if(button === 'end') {
                        const data = str.split('\n');
                        textOutput.setSelectionRange(caret + data[0].length,caret + data[0].length);
                  }
            }
      }


      function capsLocked() {
            remove.altGr();
            buttons.forEach(button => {
                  if(button.classList.contains('letter')) button.classList.toggle('upperCase');
                  if(button.classList.contains('majDependent')) button.classList.toggle('majActive');
            })
      }
      const remove = {
            capsLock() {
                  buttons.forEach(button => {
                        button.classList.remove('upperCase');
                        button.classList.remove('majActive');
                        button.classList.remove('uppercase-active');
                  })
            },
            altGr() {
                  buttons.forEach(button => {
                        button.classList.remove('altGr-active');
                        button.classList.remove('altgrActive');
                  })
            }
      }
      

      // AJOUTE UNE LIGNE INDEX A CHAQUE SAUT DE LIGNE
      const indexDiv = document.querySelector('#index');
      function addTextAreaIndex() {
            const data = textOutput.value.split('\n');
            // console.log(data);
            for(let i=1;i<data.length+1;i++){
                  if(indexDiv.children.length < data.length) {
                        const indiceNb = document.createElement('p');
                        indiceNb.innerText = i;
                        indexDiv.appendChild(indiceNb);
                  }

            }
            // const indiceNb = document.createElement('p');
            // indiceNb.innerText = data.length;
            // indexDiv.appendChild(indiceNb);
      }
      //addTextAreaIndex();

      textOutput.addEventListener('scroll',()=> {
            indexDiv.scrollTop = textOutput.scrollTop;
      })

 
});