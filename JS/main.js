
// view
// Adding cards to LIBRARY

function renderCards() {
   

    const bookCard = BOOKS.map(book => {
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
                   
                    <div class="cards__content__buttons">
                        <button class="cards__content__buttons--add ADD_TO_LIBRARY_BTN" data-book-id="${book.id}">افزودن به کتابخانه</button>
                        <button class="cards__content__buttons--fav ADD_TO_FAV_BTN" data-book-id="${book.id}>
                            <i class="fa-regular fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        `
    })

    LIBRARY.innerHTML = bookCard.join('');
    ADD_TO_LIBRARY_BTN = Array.from(document.querySelectorAll('.ADD_TO_LIBRARY_BTN'));
    console.log(ADD_TO_LIBRARY_BTN);
    handleAddToMyLibrary(ADD_TO_LIBRARY_BTN)
}










// Add event listeners
document.addEventListener("DOMContentLoaded", renderCards);

