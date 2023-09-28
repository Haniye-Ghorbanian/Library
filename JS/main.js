
// view
// Adding cards to LIBRARY

function renderCards() {
   

    const bookCard = BOOKS.map(book => {
        return  `<div class="library__cards col-lg-4 m-4 d-flex flex-column align-items-center justify-content-center">
            
            <div class="library__cards--bookmoc">

                    <div class="library__cards--bookmoc--image">
                        <img class="library__cards--bookmoc--image--frame" src="./assets/images/${book.imgSrc}" alt="">
                    </div>
                    

                </div>
                <div class="library__cards__content">
                    <h3 class="library__cards__content--title fs-lg-20px fs-md-18px fs-sm-16px mb-2 mt-3">${book.title}</h3>
                    <h4 class="library__cards__content--author mb-3 fw-normal fs-lg-16px fs-md-14px fs-sm-12px">${book.author}</h4>
                   
                    <div class="library__cards__content__info mb-2 w-100">
                        <h5 class="library__cards__content__info--published-date card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">${book.published_date}</h5>
                        <h5 class="library__cards__content__info--genre card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">${book.genre}</h5>
                        <h5 class="library__cards__content__info--language card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">${book.language}</h5>
                    </div>
                   
                    <div class="library__cards__content__buttons">
                        <button class="library__cards__content__buttons--add">افزودن به کتابخانه</button>
                        <div class="library__cards__content__buttons--fav ">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `
    })

    LIBRARY.innerHTML = bookCard.join('')
}










// Add event listeners
document.addEventListener("DOMContentLoaded", renderCards);

