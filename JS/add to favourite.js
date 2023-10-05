// Model
let booksInFavArr = [];
let bookId;

function saveFavButtonState(buttonId, state) {
    localStorage.setItem(`buttonState_${buttonId}`, state);
}



function getFavButtonState(buttonId) {
    return localStorage.getItem(`buttonState_${buttonId}`);
}



function addToFav(event) {
    debugger
    event.stopPropagation();
    bookId = event.target.getAttribute('data-fav-book');
    const exisetdInFavBook = BOOKS.find(book => book.id === +bookId);
    const button = event.target;
    const initialState = getFavButtonState(bookId);
    

    if (initialState == null || initialState == 'inactive') {
        booksInFavArr.push(exisetdInFavBook);
        saveFavoritesInLocal(booksInFavArr);

        

        if (initialState === 'active') {
            saveFavButtonState(bookId, 'inactive');
        } else {
            saveFavButtonState(bookId, 'active');
        }

        changeFavBtnStyle(exisetdInFavBook, button, bookId, initialState);

    } else {
        removeBookFromFavorites(exisetdInFavBook);
        saveFavoritesInLocal(booksInFavArr);

        if (initialState === 'active') {
            saveFavButtonState(bookId, 'inactive');
        } else {
            saveFavButtonState(bookId, 'active');
        }
        
        changeFavBtnStyle(exisetdInFavBook, button, bookId, initialState);
    }

    renderAllFavBooks(booksInFavArr);
}

// function isBookInFavorites(book) {
//     return booksInFavArr.some((favBook) => favBook.id === book.id);
// }

function saveFavoritesInLocal(books) {
    const favBooksArrString = JSON.stringify(books);
    localStorage.setItem('favoriteBooks', favBooksArrString);
}



function changeFavBtnStyle(books, button, bookId, btnState) {
    

    if (btnState == null || btnState == 'inactive') {
        button.classList.remove('fa-regular');
        button.classList.add('fa-solid');
        // localStorage.setItem(`buttonStyle_${bookId}`, 'fa-solid');
    } else if (btnState === 'active') {
        button.classList.remove('fa-solid');
        button.classList.add('fa-regular');
        // localStorage.setItem(`buttonStyle_${bookId}`, 'fa-regular')
    }
}




window.addEventListener('DOMContentLoaded', () => { 
   
    renderAllFavBooks(booksInFavArr);
})



function removeBookFromFavorites(book) {
    booksInFavArr = booksInFavArr.filter((favBook) => favBook.id !== book.id);
}

function renderAllFavBooks(booksInFavArr) {
    const storedFavBooksString = localStorage.getItem('favoriteBooks');
    const storedFavBooks = JSON.parse(storedFavBooksString) || [];

    const favBooksCardTemplate = [...new Set(storedFavBooks)].map(book => {
        
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
        </div>`;
    });

    FAV_SAVED_BOOKS.innerHTML = favBooksCardTemplate.join('');
}

function handleAddtoFav(buttons) {
    buttons.forEach((button) => {
        const buttonId = button.getAttribute('data-fav-book');
        const initialFavBtnState = getFavButtonState(buttonId);
    
        // Set the initial state of the button
        if (initialFavBtnState === 'active') {
            button.classList.add('fa-solid');
        } else {
            button.classList.add('fa-regular');
        }
    
        // Add a click event listener to toggle the button state
        button.addEventListener('click', addToFav);
    });
}

