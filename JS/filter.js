// Models
let GENRE_CHECKBOXES;
let genreOptions;
let generalFilteredBooks = [];
let filterOnGenre = [];
let filterOnLanguage = [];
let filterOnYear = [];

function allCategoriesRender() {
    genres      = [...new Set(BOOKS.map(book => book.genre))];
    languages   = [...new Set(BOOKS.map(book => book.language))];

    const genrePromise    = genreCategoryMaker(genres);
    const languagePromise = languageCategoryMaker(languages);

    Promise.all([genrePromise, languagePromise])
        .then(() => {
            selectGenreCheckboxes();
            selectLanguageCheckboxes();
        })
        .then(() => {
            identifyGenreCheckbox();
            identifyLanguageCheckbox();
        })
        .then(() => {

        });
}

function genreCategoryMaker(genres) {
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

function languageCategoryMaker(languages) {
    return new Promise((resolve) => {
        languageOptions = languages.map(language => {
            return `
                <li class="control-panel__options__container--body--options--language--options--${persianToEnglish(language)} pb-2 pt-2 d-flex align-items-center">
                    <input type="checkbox" id="${persianToEnglish(language)}" class="LANGUAGE_CHECKBOXES mgc mgc-primary">
                    <label for="${persianToEnglish(language)}">${language}</label>
                </li>`;
        });

        LANGUAGE_OPTIONS_CONTAINER.innerHTML = languageOptions.join('');
        resolve();
    });
}



function selectGenreCheckboxes() {
    GENRE_CHECKBOXES = Array.from(document.querySelectorAll('.GENRE_CHECKBOXES'));
}



function selectLanguageCheckboxes() {
    LANGUAGE_CHECKBOXES = Array.from(document.querySelectorAll('.LANGUAGE_CHECKBOXES'));
    console.log(LANGUAGE_CHECKBOXES);
}



function identifyGenreCheckbox() {
    GENRE_CHECKBOXES.map(checkbox => checkbox.addEventListener('change', findBooksOnGenre))
}


function identifyLanguageCheckbox() {
    LANGUAGE_CHECKBOXES.map(checkbox => checkbox.addEventListener('change', findBooksOnLanguage))
}


function findBooksOnGenre(event) {
    debugger
    switch (event.target.checked) {
        case true:
            if(filterOnLanguage.length !== 0) {
             displayBooksOnLanguage(filterOnLanguage)          
            } else {
                const filteredBooksOnGenre = BOOKS.filter(book => persianToEnglish(book.genre) === event.target.getAttribute('id'));
                filteredBooksOnGenre.forEach(filteredBook => filterOnGenre.push(filteredBook));
                displayBooksOnGenre(filterOnGenre);
            }
            break;

        case false:
            deleteUncheckedGenre(event.target);
            break;
    }
}




function findBooksOnLanguage(event) {
    debugger
    switch (event.target.checked) {
        case true:
            switch (filterOnGenre.length === 0) {
               case true: 
                    const filteredBooksOnLanguageNoGenre = BOOKS.filter(book => persianToEnglish(book.language) === event.target.getAttribute('id'));
                    filteredBooksOnLanguageNoGenre.forEach(filteredBook => filterOnLanguage.push(filteredBook));
                    displayBooksOnLanguage(filterOnLanguage);
                    break;

                case false:
                    const filteredBooksOnLanguageWithGenre = filterOnGenre.filter(book => persianToEnglish(book.language) === event.target.getAttribute('id'));
                    filteredBooksOnLanguageWithGenre.forEach(filteredBook => filterOnLanguage.push(filteredBook));
                    displayBooksOnLanguage(filterOnLanguage);
                    break;
            }
            break;

        case false:
            
            break;
    }
}



function deleteUncheckedGenre(uncheckedGenre) {

    if(filterOnLanguage !== 0) {
        filterOnGenre = filterOnLanguage.filter(filteredBook => persianToEnglish(filteredBook.genre) !== uncheckedGenre.getAttribute('id'));
        displayBooksOnGenre(filterOnGenre);
    } else {
        filterOnGenre = filterOnGenre.filter(filteredBook => persianToEnglish(filteredBook.genre) !== uncheckedGenre.getAttribute('id'));
        displayBooksOnGenre(filterOnGenre);
    }
    
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




function displayBooksOnLanguage(filterOnLanguage) {
    switch (filterOnLanguage.length) {
        case 0:
            switch (filterOnGenre.length === 0) {
                case true: 
                     LIBRARY.innerHTML = '';
                     renderCards();
                     break;

                case false:
                    displayBooksOnGenre();
                    break;     
            }


        default:
            const displayedBooksOnLanguage = filterOnLanguage.map(book => {
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
            LIBRARY.innerHTML = displayedBooksOnLanguage.join('');
            break;
    }
}







document.addEventListener('DOMContentLoaded', allCategoriesRender);
