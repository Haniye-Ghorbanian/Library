// Model
let booksInFavArr = [];




function addToFav(event) {
    
    const exisetdInFavBook = BOOKS.find(book => book.id === +event.target.getAttribute('data-fav-book'));

    if (!isBookInFavorites(exisetdInFavBook)) {
        booksInFavArr.push(exisetdInFavBook);

    } else {
        removeBookFromFavorites(exisetdInFavBook);
    }
    saveFavoritesInLocal(booksInFavArr);
    renderAllFavBooks(booksInFavArr);
    changeFavBtnStyle(event.target);
}

function isBookInFavorites(book) {
    return booksInFavArr.some((favBook) => favBook.id === book.id);
}

function saveFavoritesInLocal(books) {
    const favBooksArrString = JSON.stringify(books);
    localStorage.setItem('favoriteBooks', favBooksArrString);
}


function changeFavBtnStyle(button) {
    const exisetdInFavBook = BOOKS.find((book) => book.id === +button.getAttribute('data-fav-book'));

    if (isBookInFavorites(exisetdInFavBook)) {
        button.classList.remove('fa-regular');
        button.classList.add('fa-solid');
    } else {
        button.classList.remove('fa-solid');
        button.classList.add('fa-regular');
    }
}




window.addEventListener('load', () => {
    renderAllFavBooks(booksInFavArr);
});



function removeBookFromFavorites(book) {
    booksInFavArr = booksInFavArr.filter((favBook) => favBook.id !== book.id);
}



function renderAllFavBooks(booksInFavArr) {
    const storedFavBooksString = localStorage.getItem('favoriteBooks');
    const storedFavBooks = JSON.parse(storedFavBooksString) || [];

    const favBooksCardTemplate = [... new Set(storedFavBooks)].map(book => {
        return  `<div class="cards col-lg-4 m-3 d-flex flex-column align-items-center justify-content-center">
            
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

    FAV_SAVED_BOOKS.innerHTML = favBooksCardTemplate.join('');
}




function handleAddtoFav(buttons) {
    buttons.map(btn => btn.addEventListener('click', addToFav))
}