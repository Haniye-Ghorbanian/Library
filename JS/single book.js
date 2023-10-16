let similarBooks = [];
let lastSeen = [];
let clickedBookId;
let currentPage;
let lastSeenBook;



function handleRoutToSingleBook(event) {
    debugger
    event.preventDefault();
    if(event.target.closest('.SINGLE_BOOK')){
        const singleBookHref = event.target.closest('.SINGLE_BOOK').href;
        clickedBookId = +event.target.closest('.SINGLE_BOOK').getAttribute('data-book-id');
        lastSeen.push(lastSeenBook);
        lastSeenBook = BOOKS.find(book => book.id === clickedBookId);
        renderLastSeenCards(lastSeenBook);
        history.pushState(null, null, singleBookHref);
        findRelatedBookCard(clickedBookId);
        showSingleBookPage();
    } 

    else {
        const singleBookHref = event.target.closest('.SIMILAR_BOOK').href;
        // lastSeen.push(event.target.closest('.SIMILAR_BOOK'));
        clickedBookId = +event.target.closest('.SIMILAR_BOOK').getAttribute('data-book-id');
        lastSeenBook = BOOKS.find(book => book.id === clickedBookId);
        lastSeen.push(lastSeenBook);
        renderLastSeenCards(lastSeenBook);
        history.pushState(null, null, singleBookHref);
        findRelatedBookCard(clickedBookId);
    }
     
}


function showSingleBookPage() {
    ALL_BOOKS_PAGE.classList.add('d-none');
    SINGLE_BOOK_PAGE.classList.remove('d-none');
}



function findRelatedBookCard(id) {
   const relatedBook = BOOKS.find(book => book.id === id);
   renderBookCard(relatedBook);

//    if(similarBooks.length === 0 || +relatedBook.id !== id){
       findSimilarBooks(relatedBook, id);
//    }
}



function renderBookCard(book) {
    SINGLE_BOOK_PAGE_BOOK.innerHTML = '';
    const bookCard = `
    
        <div class="single-book-page__book--info w-50 h-100 d-flex justify-content-center align-items-center flex-column BOOK_${book.id}">
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
                <button class="cards__content__buttons--add fs-lg-18px Mybtn ADD_TO_LIBRARY_BTN_${book.id}"
                    data-book-id="${book.id}">افزودن به کتابخانه</button>
        
                <i class="fa-regular fa-heart cards__content__buttons--fav text-white fs-lg-18px MyIcon ADD_TO_FAV_BTN_${book.id}"
                    data-fav-book="${book.id}"></i>
            </div>
        
        </div>


        <div class="single-book-page__book--image w-50 h-100 text-center">
            <img class="" src="./assets/images/${book.imgSrc}" alt="">
        </div>

    `
    SINGLE_BOOK_PAGE_BOOK.innerHTML = bookCard;
    currentPage = document.querySelector(`.BOOK_${book.id}`).parentElement.parentElement.parentElement;

    const ADD_TO_FAV_SNIGLE_BOOK = document.querySelector(`.ADD_TO_FAV_BTN_${book.id}`);
    const ADD_TO_LIBRARY_SNIGLE_BOOK = document.querySelector(`.ADD_TO_LIBRARY_BTN_${book.id}`);

   

    handleAddtoFavFromSingleBookPage(ADD_TO_FAV_SNIGLE_BOOK);
    handleAddtoLibFromSingleBookPage(ADD_TO_LIBRARY_SNIGLE_BOOK);
}




function findSimilarBooks(relatedBook, currentId) {
    
    similarBooks = [];
    BOOKS.filter(book =>  {if(book.genre === relatedBook.genre)
                                   {similarBooks.push(book);}});
    const currentBookIndex = similarBooks.findIndex(book => book.id === currentId);
    similarBooks.splice(currentBookIndex, 1); 
   
 
     renderSimilarBooks(similarBooks);
}



function renderSimilarBooks() {
    
    const renderedBooks = similarBooks.map(book => {
        return `
        <a href="./book${book.id}" class="SIMILAR_BOOK" data-book-id="${book.id}">
            <swiper-slide class="cards box-shadow-none m-3 d-flex flex-column align-items-center justify-content-center" style="width: 335.75px; margin-left: 30px;>
                <div
                    class="">
        
                    <div class="cards--bookmoc">
        
                        <div class="cards--bookmoc--image">
                            <img class="cards--bookmoc--image--frame" src="./assets/images/${book.imgSrc}" alt="">
                        </div>
        
        
                    </div>
                    <div class="cards__content">
                        <h3
                            class="cards__content--title fs-lg-20px fs-md-18px fs-sm-16px mb-2 mt-3">
                            ${book.title}
                        </h3>
                        <h4
                            class="cards__content--author mb-3 fw-normal fs-lg-16px fs-md-14px fs-sm-12px">
                            ${book.author}
                        </h4>
        
                        <div class="cards__content__info mb-2 w-100">
                            <h5
                                class="cards__content__info--published-date card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">
                                ${book.published_date}
                            </h5>
                            <h5
                                class="cards__content__info--genre card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">
                                ${book.genre}
                            </h5>
                            <h5
                                class="cards__content__info--language card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">
                                ${book.language}
                            </h5>
                        </div>
        
                    </div>
                </div>
            </swiper-slide>
        </a>`
        })


        SIMILAR_BOOKS_CONTAINER.innerHTML = renderedBooks.join('');
        const SIMILAR_BOOKS = Array.from(document.querySelectorAll('.SIMILAR_BOOK'));
        SIMILAR_BOOKS.map(book => book.addEventListener('click', handleRoutToSingleBook));
        
        
        
}


function handleBackward() {
    debugger
    const path = window.location.pathname.split('/');
    const prePath = (path[path.length - 1]);
    let id; 
    console.log(id);
    console.log(currentPage);
    console.log(prePath);
    if(prePath.match(/book\d+/)) {
        HOME_PAGE.classList.add('d-none');
        MY_LIBRARY_PAGE.classList.add('d-none');
        ALL_BOOKS_PAGE.classList.add('d-none');
        id = +prePath.match(/\d+/)[0];
        SINGLE_BOOK_PAGE.classList.remove('d-none');
        findRelatedBookCard(id);
    } else {
        currentPage.classList.add('d-none');
    }
}



document.addEventListener("DOMContentLoaded", startSingleBook);
window.addEventListener("popstate", handleBackward)
function startSingleBook(singleBook) {
    singleBook.map(book => book.addEventListener('click', handleRoutToSingleBook))
}



