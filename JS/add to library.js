
// model 
let booksInSavedArr = [];
let parentElements = [];
let buttonId = localStorage.getItem('buttonId');
const parentElement = JSON.parse(localStorage.getItem('parent'));
let childrenElements = localStorage.getItem('children');
let childrenOuterHtml = ''




function addToLibrary(event) {
    debugger
    buttonId = event.target.getAttribute('data-book-id');
    localStorage.setItem('buttonId', buttonId)
    const exisetdInLibraryBook = BOOKS.find(book => book.id === +buttonId);
    booksInSavedArr.push(exisetdInLibraryBook);
    saveBooksInLocal(booksInSavedArr);
    changeButtonStyle(event.target, buttonId)
}


let binIsCreated = false;

function changeButtonStyle(button, buttonId) {
    
    setTimeout(() => {
        button.textContent = 'افزودن به کتابخانه'
    }, 1500);
    button.textContent = 'موجود در کتابخانه'
    
    
    const existingBin = button.parentElement.querySelector('.BIN_BTN');
    
    if (!existingBin) {
        const BIN_BTN = document.createElement('i');
        BIN_BTN.className = `fa-solid fa-trash cards__content__buttons--bin MyIcon BIN_BTN`;
        BIN_BTN.addEventListener('click', () => handleTrashIconClick(button));

        button.parentElement.style.width = '200px';
        button.parentElement.appendChild(BIN_BTN);

        localStorage.setItem(`binIsCreated_${buttonId}`, 'true');
    }
    parentElement = button.parentNode;
    console.log(parentElement)
    localStorage.setItem('parent', JSON.stringify(parentElement));
    childrenElements = parentElement.children;
    const childrenArray  =Array.from(childrenElements)
    childrenArray.map(child => {childrenOuterHtml += child.outerHTML} )
    console.log(childrenOuterHtml)
    localStorage.setItem('children', childrenOuterHtml)
    
}



// let containerHtml = '';
function saveButtonState(children, parent, buttonId) {
    if (children) {
        parent.innerHTML = children;
    }
    localStorage.setItem(`binIsCreated_${buttonId}`, 'true');
}



function saveBooksInLocal(books) {
    const booksInSavedArrString = JSON.stringify(books);
    localStorage.setItem('savedBooks', booksInSavedArrString);
    renderAllSavedBooks(booksInSavedArrString)
}



function handleTrashIconClick(button) {
    
    booksInSavedArr = booksInSavedArr.filter(book => book.id !== +button.getAttribute('data-book-id'));
    saveBooksInLocal(booksInSavedArr);
    renderAllSavedBooks();
}



function renderAllSavedBooks() {
    const storedBooksString = localStorage.getItem('savedBooks');
    const storedBooks = JSON.parse(storedBooksString) || [];
    const savedBooksCardTemplate = [...new Set (storedBooks)].map(book => {
        return `<div class="cards col-lg-4 m-3 d-flex flex-column align-items-center justify-content-center">
            
        <div class="cards--bookmoc">

                <div class="cards--bookmoc--image">
                    <img class="cards--bookmoc--image--frame" src="./assets/images/${book.imgSrc}" alt="">
                </div>
                

            </div>
            <div class="cards__content">
                <h3 class="cards__content--title fs-lg-20px fs-md-18px fs-sm-16px mb-2 mt-3">${book.title}</h3>
                <h4 class="cards__content--author mb-3 fw-normal fs-lg-16px fs-md-14px fs-sm-12px">${book.author}</h4>
               
                <div class="cards__content__info mb-2 w-100">
                    <h5 class="cards__content__info--published-date card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">${book.published_date}</h5>
                    <h5 class="cards__content__info--genre card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">${book.genre}</h5>
                    <h5 class="cards__content__info--language card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">${book.language}</h5>
                </div>
               
            </div>
        </div>
        </div>
    `
    })

    ALL_SAVED_BOOKS.innerHTML = savedBooksCardTemplate.join('');

}


window.addEventListener('load', () => {
    debugger
    
    x(buttonId);
    renderAllSavedBooks();
});




function handleAddToMyLibrary(buttonsContainers) {
    buttonsContainers.map(btn => {
        btn.addEventListener('click', addToLibrary);
    });
}


function x(buttonId) {
    const binIsCreatedInLocal = localStorage.getItem(`binIsCreated_${buttonId}`);
        if (binIsCreatedInLocal === 'true') {
            saveButtonState(childrenElements, parentElement , buttonId);
        } 
} 
