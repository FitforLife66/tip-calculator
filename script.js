const billEl = document.querySelector("#bill");
const tipsEl = document.querySelector('#tips');
const tipCustomEl = document.querySelector('#tips__custom');
const peopleLabelEl = document.querySelector("#people-label");
const peopleEl = document.querySelector("#people");
const tipPPEl = document.querySelector('#tip-per-person');
const totalPPEl = document.querySelector('#total-per-person');
const resetBtn = document.querySelector('#reset-btn');

const splitter = {
    bill: '',
    tip: '',
    people: '',
    tipPP: function() {
        return Number(this.bill * this.tip / 100 / this.people).toFixed(2);        
    }, 
    totalPP: function() {
        return Number(this.bill * (1 + this.tip / 100) / this.people).toFixed(2); 
    }
};

//  Rendering Splitter
//  ==================
function renderSplitter() { 

    splitter.bill = billEl.value;
    splitter.people = peopleEl.value;

    // Div zero check and tip results
    if(splitter.people != '0') {
        peopleLabelEl.setAttribute("data-error-msg", ""); 
        peopleEl.style.outline = '';
        if(splitter.people !='') {
            tipPPEl.textContent = splitter.tipPP();
            totalPPEl.textContent = splitter.totalPP();
        } else {
            totalPPEl.textContent = '0.00';
            tipPPEl.textContent = '0.00';
        }
    } else {     
        peopleLabelEl.setAttribute("data-error-msg", "Can't be zero");
        peopleEl.style.outline = '2px solid #e17457';
    };
};

//  'Bill' Events
//  =============
billEl.addEventListener('click', () => {
    billEl.value = '';
    renderSplitter();
})

billEl.addEventListener('input', () => {
    renderSplitter();
});

//  Arrows: disable spin
//  Tab: Inits the 1st Tip item
//  Delete: delete value, reset rendering
billEl.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown': 
            event.preventDefault();
            break;
        case 'Tab':
            resetTipEl();
            tipsEl.children[0].classList.add('focus');            
            splitter.tip = tipsEl.children[0].textContent;  
            break;
        case 'Delete':
            bill.El.value = '';            
            break;
        default: false;        
    };  
    renderSplitter(); 
 
});

//  Tip Button Events
//  =================

//  Reset and unfocus 'Selected Tip' Elements
function resetTipEl() {
    Array.from(tipsEl.children).forEach((event) => {
        event.classList.remove('focus');
        if(event.tagName === 'INPUT') {
            event.value = '';
        }
    });
    splitter.tip = '';
};

tipsEl.addEventListener('click', (event) => {
    resetTipEl();

    // Focus clicked Item
    event.target.focus();
    event.target.classList.add('focus');

    //  Get the selected tip
    let tipIndex = [...tipsEl.children].indexOf(event.target); 
    splitter.tip = tipsEl.children[tipIndex].textContent;

    renderSplitter();  
});

//  Arrows: UP/Down: Disalbe; Left/Right: jump to the next Tip item
//  Tab:    jumps to 'Bill' or 'Number of People'
tipsEl.addEventListener('keydown', (event) => {

    
    //  Get index of the current focussed Tip item
    let tipIndex = [...tipsEl.children].indexOf(event.target);
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            event.preventDefault();
            break;
        case 'ArrowRight': 
            event.preventDefault();         
            tipIndex === tipsEl.children.length - 1 ? tipIndex = 0 : tipIndex++;
            resetTipEl();
            tipsEl.children[tipIndex].focus();
            tipsEl.children[tipIndex].classList.add('focus');
            splitter.tip = tipsEl.children[tipIndex].textContent;
            break;
        case 'ArrowLeft':  
            event.preventDefault();
            tipIndex === 0 ? tipIndex = tipsEl.children.length - 1 : tipIndex--;
            resetTipEl();
            tipsEl.children[tipIndex].focus();
            tipsEl.children[tipIndex].classList.add('focus'); 
            splitter.tip = tipsEl.children[tipIndex].textContent; 
            break;
        case 'Tab':
            event.preventDefault();
            if(event.shiftKey) {                
                billEl.focus();
                billEl.value = '';                
            } else {
                peopleEl.focus();
                peopleEl.value = '';
            };
            break;
        default: false;  
    };
    renderSplitter();
});

//  Input a Custom Tip Events
//  =========================
tipCustomEl.addEventListener('input', () => {  
    splitter.tip = tipCustomEl.value;
    renderSplitter(); 
});

//  Arrows:     jump to the next Tip item
//  Delete:     delete value, reset rendering
tipCustomEl.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown': 
        case '.':
            event.preventDefault();
            break;
        case 'Delete':
            tipCustomEl.value = '';
            splitter.tip = '';
            break;
        default: false;  
    };
    renderSplitter();
});

//  'Number of People' Events
//  =========================
peopleEl.addEventListener('click', () => {
    peopleEl.value = '';
    renderSplitter();
});

//  Arrows:     disable spin
//  'Dot':      disable floating point
//  Delete:     delete value, reset rendering
//  Tab:        
peopleEl.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown': 
        case '.':
            event.preventDefault();
            break;
        case 'Delete':
            peopleEl.value = '';
            break;
        case 'Tab':
            if(event.shiftKey) {
                resetTipEl(); 
                splitter.tip = '';
            }
            break;
        default: false;  
    };
    renderSplitter();
});

peopleEl.addEventListener('input', () => {
    splitter.people = peopleEl.value;
    renderSplitter();
})

//  Reset Event
//  ===========
resetBtn.addEventListener('click', () => {
    billEl.value = '';
    resetTipEl();
    peopleEl.value = '';
    renderSplitter();
});