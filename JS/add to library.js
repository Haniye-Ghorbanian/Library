
// model 
let booksInSavedArr = [];



function addToLibrary(event) {
    // debugger
    const exisetdInLibraryBook = BOOKS.find(book => book.id === +event.target.getAttribute('data-book-id'));
    booksInSavedArr.push(exisetdInLibraryBook);
    renderAllSavedBooks(booksInSavedArr);
    changeButtonStyle(event.target)
}


let binIsCreated = false;
function changeButtonStyle(button) {

    setTimeout(() => {
        button.textContent = 'افزودن به کتابخانه'
    }, 1500);
    button.textContent = 'موجود در کتابخانه'
    
    let BIN_BTN;
    if(binIsCreated == false) {
        BIN_BTN = document.createElement('i');
        BIN_BTN.className = `fa-solid fa-trash cards__content__buttons--bin MyIcon BIN_BTN`;  

        console.log(BIN_BTN)
        BIN_BTN.addEventListener('click', () => handleTrashIconClick(button));


        button.parentElement.style.width ='200px'
        button.parentElement.appendChild(BIN_BTN);
        binIsCreated = true;
    } else {
        BIN_BTN.removeAttribute('onclick');
    }
    
}


function handleTrashIconClick(button) {
    debugger
    booksInSavedArr = booksInSavedArr.filter(book => book.id !== +button.getAttribute('data-book-id'));
    renderAllSavedBooks(booksInSavedArr);
}



function renderAllSavedBooks(booksInSavedArr) {
    const savedBooksCardTemplate = [...new Set (booksInSavedArr)].map(book => {
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

    ALL_SAVED_BOOKS.innerHTML = savedBooksCardTemplate;

}






function handleAddToMyLibrary(buttonsContainers) {
    buttonsContainers.map(btn => btn.addEventListener('click', addToLibrary));
}

