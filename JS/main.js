
// view
// Adding cards to LIBRARY
function createCard(book) {
    const bookCard =

        `   <div class="library__cards--bookmoc">

                    <div class="library__cards--bookmoc--image">
                        <img class="library__cards--bookmoc--image--frame" src="./assets/images/${book.imgSrc}" alt="">
                    </div>
                    

                </div>
                <div class="library__cards__content">
                    <h3 class="library__cards__content--title fs-lg-20px mb-2 mt-3">${book.title}</h3>
                    <h4 class="library__cards__content--author mb-3 fw-normal fs-lg-16px">${book.author}</h4>
                   
                    <div class="library__cards__content__info mb-2 w-100">
                        <h5 class="library__cards__content__info--published-date card-info fs-lg-14px fw-light">${book.published_date}</h5>
                        <h5 class="library__cards__content__info--genre card-info fs-lg-14px fw-light">${book.genre}</h5>
                        <h5 class="library__cards__content__info--language card-info fs-lg-14px fw-light">${book.language}</h5>
                    </div>
                   
                    <div class="library__cards__content__buttons">
                        <button class="library__cards__content__buttons--add">افزودن به کتابخانه</button>
                        <div class="library__cards__content__buttons--fav ">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>
        `

    return bookCard;
}





// Card render
function renderCards() {


    BOOKS.map(book => {
        const card = createCard(book);
        const Container = document.createElement('div');
        Container.classList.add('library__cards')
        Container.innerHTML = card;
        LIBRARY.appendChild(Container)
    });
}




// Add event listeners
document.addEventListener("DOMContentLoaded", renderCards);

