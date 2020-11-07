window.addEventListener('load', () => {

    (function () {


        const switchMode = document.querySelector('#switch');
        const cssFile = document.querySelector('link[href=\'css/keyboard-light.css\']');



       switchMode.addEventListener('click', ()=> {
           switchMode.checked ? cssFile.setAttribute('href','css/keyboard-dark.css') : cssFile.setAttribute('href','css/keyboard-light.css');
        })
    })();


})