// Model
console.log(BOOKS);
let GENRE_CHECKBOXES;
let genreOptions;
let filterOnGenre = [];
let filterOnLanguage = [];
let filterOnYear = [];

function genrecategoryRender() {
    genres = [...new Set(BOOKS.map(book => book.genre))];
    console.log(genres);
    genreCategorymaker(genres)
        .then(() => {
            selectCheckboxes();
        })
        .then(() => {
            identifyTheCheckbox();
        })
        .then(() => {

        });
}

function genreCategorymaker(genres) {
    return new Promise((resolve) => {
        genreOptions = genres.map(genre => {
            return `
                <li class="control-panel__options__container--body--options--genre--options--${persianToEnglish(genre)} pb-2 pt-2 d-flex align-items-center">
                    <input type="checkbox" id="${persianToEnglish(genre)}" class="GENRE_CHECKBOXES mgc mgc-primary">
                    <label for="${persianToEnglish(genre)}">${genre}</label>
                </li>`;
        });

        GENRE_OPTIONS_CONTAINER.innerHTML = genreOptions.join('');
        resolve();
    });
}



function selectCheckboxes() {
    GENRE_CHECKBOXES = Array.from(document.querySelectorAll('.GENRE_CHECKBOXES'));
}


function identifyTheCheckbox() {
    GENRE_CHECKBOXES.map(checkbox => checkbox.addEventListener('change', findBooksOnGenre))
}


function findBooksOnGenre(event) {
    

    if (event.target.checked) {
        const filteredBooksOnGenre = (BOOKS.filter(book => persianToEnglish(book.genre) === event.target.getAttribute('id')));
        filteredBooksOnGenre.forEach(filteredBook => filterOnGenre.push(filteredBook));
        console.log(filterOnGenre)
        displayBooksOnGenre(filterOnGenre);

    } else {
        deleteUncheckedGenre(event.target)  
    }
}



function deleteUncheckedGenre(uncheckedGenre) {
    filterOnGenre = filterOnGenre.filter(filteredBook => persianToEnglish(filteredBook.genre) !== uncheckedGenre.getAttribute('id'));
    displayBooksOnGenre(filterOnGenre)
}



function displayBooksOnGenre(filterOnGenre) {
    switch (filterOnGenre.length) {
        case 0:
            LIBRARY.innerHTML = '';
            renderCards();
            break;

        default:
            const displayedBooksOnGenre = filterOnGenre.map(book => {
                return `   
                <div class="library__cards">
                    <div class="library__cards--bookmoc">

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
                 </div>`
            })

            LIBRARY.innerHTML = '';
            LIBRARY.innerHTML = displayedBooksOnGenre.join('');
            break;


    }
}







document.addEventListener('DOMContentLoaded', genrecategoryRender);
