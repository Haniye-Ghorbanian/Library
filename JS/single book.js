let similarBooks = [];


function handleRoutToSingleBook(event) {
    debugger
    event.preventDefault();
    const singleBookHref = event.target.closest('.SINGLE_BOOK').href;
    const bookId = +event.target.closest('.SINGLE_BOOK').getAttribute('data-book-id');
    console.log(bookId)
    console.log(singleBookHref)
    history.pushState(null, null, singleBookHref);
    findRelatedBookCard(bookId);
    showSingleBookPage();
}




function handleRoutToSingleBook2(event) {
    debugger
    event.preventDefault();
    const singleBookHref = event.target.closest('.SIMILAR_BOOK').href;
    const bookId = +event.target.closest('.SIMILAR_BOOK').getAttribute('data-book-id');
    console.log(bookId)
    console.log(singleBookHref)
    history.pushState(null, null, singleBookHref);
    findRelatedBookCard(bookId);
}



function showSingleBookPage() {
    ALL_BOOKS_PAGE.classList.add('d-none');
    SINGLE_BOOK_PAGE.classList.remove('d-none');
    
}


function findRelatedBookCard(id) {
   const relatedBook = BOOKS.find(book => book.id === id);
   renderBookCard(relatedBook);
   if(similarBooks.length===0){
       findSimilarBooks(relatedBook, id);
   }
}


function renderBookCard(book) {
    SINGLE_BOOK_PAGE_BOOK.innerHTML = '';
    const bookCard = `
    
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
    SINGLE_BOOK_PAGE_BOOK.innerHTML = bookCard;
}



function findSimilarBooks(relatedBook, currentId) {
    if(similarBooks.length === 0){
        BOOKS.filter(book =>  {if(book.genre === relatedBook.genre) {similarBooks.push(book);}});
        const currentBookIndex = similarBooks.findIndex(book => book.id === currentId);
        similarBooks.splice(currentBookIndex, 1); 
    }

   console.log(similarBooks);
   renderSimilarBooks(similarBooks);
}






function renderSimilarBooks() {
    
    const renderedBooks = similarBooks.map(book => {
        return `
            <swiper-slide class="">
            <a href="./book${book.id}" class="cards box-shadow-none m-3 d-flex flex-column align-items-center justify-content-center SIMILAR_BOOK" data-book-id="${book.id}">
                <div
                    class="cards box-shadow-none m-3 d-flex flex-column align-items-center justify-content-center">
        
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
                </a>
            </swiper-slide>`
        })


        SIMILAR_BOOKS_CONTAINER.innerHTML = renderedBooks.join('');
        const SIMILAR_BOOKS = Array.from(document.querySelectorAll('.SIMILAR_BOOK'));
        SIMILAR_BOOKS.map(book => book.addEventListener('click', handleRoutToSingleBook2));
        
        
        
}


handleRouteChange();
document.addEventListener("DOMContentLoaded", startSingleBook);
function startSingleBook(singleBook) {
    singleBook.map(book => book.addEventListener('click', handleRoutToSingleBook))
}



