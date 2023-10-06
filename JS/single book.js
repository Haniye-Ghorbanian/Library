


function handleRoutToSingleBook(event) {
    debugger
    event.preventDefault();
    const singleBookHref = event.target.closest('.SINGLE_BOOK').href;
    const bookId = +event.target.closest('.SINGLE_BOOK').getAttribute('data-book-id');
    console.log(bookId)
    console.log(singleBookHref)
    history.pushState(null, null, singleBookHref);
    findRelatedBookCard(bookId)
    showSingleBookPage()
}



function showSingleBookPage() {
    ALL_BOOKS_PAGE.classList.add('d-none');
    SINGLE_BOOK_PAGE.classList.remove('d-none')
}

function findRelatedBookCard(id) {
   const relatedBook = BOOKS.find(book => book.id === id);
   renderBookCard(relatedBook);
}


function renderBookCard(book) {
    SINGLE_BOOK_PAGE_BOOK.innerHTML = `
    
        <div class="single-book-page__book--info w-50 h-100 d-flex justify-content-center align-items-center flex-column">
            <div class="single-book-page__book--info--tw text-center">
                <h1 class="single-book-page__book--info--tw--title fs-lg-55px fw-bold mb-4">${book.title}</h1>
        
                <h2 class="single-book-page__book--info--tw--author fs-lg-35px fw-semibold">${book.author}</h2>
            </div>
        
        
        
            <div class="single-book-page__book--info--gld d-flex flex-row w-80 justify-content-evenly mb-5">
                <h3 class="single-book-page__book--info--gld--genre fs-lg-22px fw-normal">${book.genre}</h3>
        
                <h3 class="single-book-page__book--info--gld--language fs-lg-22px fw-normal">${book.language}</h3>
        
                <h3 class="single-book-page__book--info--gld--date fs-lg-22px fw-normal">${book.published_date}</h3>
            </div>
        
        
            <div class="single-book-page__book--info--btns d-flex flex-row w-80 justify-content-evenly">
                <button class="cards__content__buttons--add fs-lg-18px Mybtn ADD_TO_LIBRARY_BTN"
                    data-book-id="${book.id}">افزودن به کتابخانه</button>
        
                <i class="fa-regular fa-heart cards__content__buttons--fav text-white fs-lg-18px MyIcon ADD_TO_FAV_BTN"
                    data-fav-book="${book.id}"></i>
            </div>
        
        </div>


        <div class="single-book-page__book--image w-50 h-100 text-center">
            <img class="" src="./assets/images/${book.imgSrc}" alt="">
        </div>

    `
}

function startSingleBook(singleBook) {
    console.log(singleBook)
    singleBook.map(book => book.addEventListener('click', handleRoutToSingleBook))
}



document.addEventListener("DOMContentLoaded", startSingleBook);