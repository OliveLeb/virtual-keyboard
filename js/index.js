window.addEventListener('load', () => {

      let isMaj = false;
      let isCapslocked = false;

      const switchMode = document.querySelector('#switch');
      const cssFile = document.querySelector('link[href=\'css/keyboard-light.css\']');
      switchMode.addEventListener('click', ()=> {
      switchMode.checked ? cssFile.setAttribute('href','css/keyboard-dark.css') : cssFile.setAttribute('href','css/keyboard-light.css');
      })


      const toggleKeyboard = document.querySelector('.toggleBtn');
      const keyboard = document.querySelector('.keyboard');
      toggleKeyboard.addEventListener('click', () => {
      keyboard.classList.toggle('active');
      });

      const capsLockLed = document.querySelector('#led');
      const buttons = document.querySelectorAll('button');
      const textOutput = document.querySelector('textarea');


       function caretPos() {
            let textData = JSON.stringify(textOutput.value);
            let data = textData.replaceAll('\\n',String.fromCharCode(13));
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
                        textOutput.value += ' ';
                        break;
                  case 'enter':
                        textOutput.value = chn1 + '\n' + chn2;
                        addTextAreaIndex();
                        break;
                  case 'capsLock':
                        isCapslocked = !isCapslocked;
                        capsLocked();
                        capsLockLed.classList.toggle('led-active');
                        break;
                  case 'TAB':
                        textOutput.value += '    ';
                        break;
                  case 'up':
                        console.log(JSON.stringify(textOutput.value));
                        break;
                  case 'down':
                        console.log(JSON.stringify(textOutput.value));
                        break;
                  case 'left':
                        moveCursorArrow(-1)
                        break;
                  case 'right':
                        moveCursorArrow(1)
                        break; 
                  case 'uppercase':
                        majActive();
                        break;
                  case 'showLine':
                        showLine(chn1,chn2,caret);
                        break;
                  case 'menu':
                        console.log('click')
                        break;                      
                  default:
                        writeInTextArea(button,chn1,chn2);
                        break;
            }
            textOutput.focus();
      })
      });


      function showLine(chn1,chn2,caret){
            // console.log(chn1)
            // console.log(chn2)
            // console.log(caret)
            // console.log(JSON.stringify(textOutput.value))
            // console.log(textOutput.value)
            // console.log(JSON.stringify(String.fromCharCode(13,10)));
            addTextAreaIndex()
      }
      

      function eventRightClick(button) {
            let rightClickEvent = document.createEvent('event');
            rightClickEvent.initEvent('event',true,true);
            button.addEventListener()
      }

      function majActive() {
            if(isMaj){
                  isMaj = false
                  removeCapsLock();
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


      function writeInTextArea(button,chn1,chn2) {
            let input;
            if(isMaj && button.children.length === 2) {
                  input = button.children[1].innerText;
            }
            else if(!isMaj && button.children.length === 2) {
                  input = button.children[0].innerText;
            }
            else {
                  input = button.innerText;
            }
            textOutput.value = chn1 + input + chn2;
            if(!isCapslocked) removeCapsLock();
            isMaj = false;
      }
           
      

      
      function moveCursorArrow(direction) {
            let caretPos = textOutput.selectionStart;
            if(direction === -1 && caretPos === 0 ) return;
            textOutput.setSelectionRange(caretPos + direction, caretPos + direction);
            console.log(caretPos)
      }


      function capsLocked() {
            buttons.forEach(button => {
                  if(button.classList.contains('letter')) button.classList.toggle('upperCase');
                  if(button.classList.contains('majDependent')) button.classList.toggle('majActive');
            })
      }
      function removeCapsLock() {
            buttons.forEach(button => {
                  button.classList.remove('upperCase');
                  button.classList.remove('majActive');
                  button.classList.remove('uppercase-active');
            })
      }

      // AJOUTE UNE LIGNE INDEX A CHAQUE SAUT DE LIGNE
      const indexDiv = document.querySelector('#index');
      function addTextAreaIndex() {
            const data = textOutput.value.split('\n');
            // console.log(data);
            // for(let i=1;i<data.length+1;i++){
            //       const indiceNb = document.createElement('p');
            //       indiceNb.innerText = i;
            //       indexDiv.appendChild(indiceNb);
            // }
            const indiceNb = document.createElement('p');
            indiceNb.innerText = data.length;
            indexDiv.appendChild(indiceNb);
      }
      addTextAreaIndex();
      

 
});