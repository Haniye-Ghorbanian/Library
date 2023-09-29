// Models
let GENRE_CHECKBOXES;
let genreOptions;
let filteredBooksOnLanguage;
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







// Creating options (checkboxes) for genre and language filter ::start
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
// Creating options (checkboxes) for genre and language filter ::end











// Getting Dom nodes of checkbox inputs for genre and language filter::start
function selectGenreCheckboxes() {
    GENRE_CHECKBOXES = Array.from(document.querySelectorAll('.GENRE_CHECKBOXES'));
}

function selectLanguageCheckboxes() {
    LANGUAGE_CHECKBOXES = Array.from(document.querySelectorAll('.LANGUAGE_CHECKBOXES'));
}
// Getting Dom nodes of checkbox inputs for genre and language filter::end











// Adding eventListeners on genre and language inputs::start
function identifyGenreCheckbox() {
    GENRE_CHECKBOXES.map(checkbox => checkbox.addEventListener('change', findBooksOnGenre))
}

function identifyLanguageCheckbox() {
    LANGUAGE_CHECKBOXES.map(checkbox => checkbox.addEventListener('change', findBooksOnLanguage))
}
// Adding eventListeners on genre and language inputs::end











// Finfing related books from original or model arrays and storing them in model related model arrays::start

// For genre filter::start
function findBooksOnGenre(event) {
    // debugger
    switch (event.target.checked) {
        case true:
            
            if(filterOnLanguage.length === 0){
                const filteredBooksOnGenre = BOOKS.filter(book => persianToEnglish(book.genre) === event.target.getAttribute('id'));
                filteredBooksOnGenre.forEach(filteredBook => filterOnGenre.push(filteredBook));
                filteredBooksOnGenre.forEach(filteredBook => generalFilteredBooks.push(filteredBook));
                displayFilteredBooks(generalFilteredBooks);
            }

            else {
                const filteredBooksOnGenre = filterOnLanguage.filter(book => persianToEnglish(book.genre) === event.target.getAttribute('id'));
                filteredBooksOnGenre.forEach(book => filterOnGenre.push(book));
                filteredBooksOnGenre.forEach(book => generalFilteredBooks.push(book));
                displayFilteredBooks(generalFilteredBooks);
            }
                
            
            break;

        case false:
            deleteUncheckedGenre(event.target);
            break;
    }
}
// For genre filter::end


// For language filter::start
function findBooksOnLanguage(event) {
    let filteredBooksOnLanguageWithGenre;
    debugger
    switch (event.target.checked) {
        case true:

            if (filterOnGenre.length === 0) {
                filteredBooksOnLanguage = BOOKS.filter(book => persianToEnglish(book.language) === event.target.getAttribute('id'));

                filteredBooksOnLanguage.forEach(filteredBook => filterOnLanguage.push(filteredBook));

                const filteredBooksOnLanguageNoGenre = BOOKS.filter(book => persianToEnglish(book.language) === event.target.getAttribute('id'));

                filteredBooksOnLanguageNoGenre.forEach(filteredBook => generalFilteredBooks.push(filteredBook));

                displayFilteredBooks(generalFilteredBooks);
            }

            else if(filterOnGenre.length !== 0) {
               
                filteredBooksOnLanguage = BOOKS.filter(book => persianToEnglish(book.language) === event.target.getAttribute('id'));
                filteredBooksOnLanguage.forEach(filteredBook => filterOnLanguage.push(filteredBook));

                let checkedLanguageCheckboxes = [];
                checkedLanguageCheckboxes = LANGUAGE_CHECKBOXES.filter(checkbox => checkbox.checked);


                if(checkedLanguageCheckboxes.length > 1) {

                    let filteredBooksOnLanguageWithGenre = [];

                    checkedLanguageCheckboxes.map(checkbox => {
                        const x = filterOnGenre.filter(book => {
                            return persianToEnglish(book.language) === checkbox.getAttribute('id');
                        });
                        filteredBooksOnLanguageWithGenre.push(...x); 
                    });
                    

                    console.log(filteredBooksOnLanguageWithGenre)
                    generalFilteredBooks = [];
                    filteredBooksOnLanguageWithGenre.forEach(filteredBook => generalFilteredBooks.push(filteredBook));
                    
                    displayFilteredBooks(generalFilteredBooks);
                    

                } 
                
                else {
                   filteredBooksOnLanguageWithGenre = generalFilteredBooks.filter(book => persianToEnglish(book.language) === event.target.getAttribute('id'));

                    generalFilteredBooks = [];
                    filteredBooksOnLanguageWithGenre.forEach(filteredBook => generalFilteredBooks.push(filteredBook));
                        
                    displayFilteredBooks(generalFilteredBooks);
                }
            }  
            
            break;

        case false:
            deleteUncheckedLanguage(event.target)
            break;
    }
}
// For language filter::end

// Finfing related books from original or model arrays and storing them in model related model arrays::end










// controlling unchecked inputs for genre and language filters::start

// For genre filters::start
function deleteUncheckedGenre(uncheckedGenre) {

    if(filterOnLanguage.length !== 0) {
        filterOnGenre = filterOnGenre.filter(filteredBook => persianToEnglish(filteredBook.genre) !== uncheckedGenre.getAttribute('id'));

        if(filterOnGenre.length === 0) {
            generalFilteredBooks = [];
            filterOnLanguage.forEach(book => generalFilteredBooks.push(book));
            displayFilteredBooks(generalFilteredBooks)
        } 
        else {
            generalFilteredBooks = generalFilteredBooks.filter(filteredBook => persianToEnglish(filteredBook.genre) !== uncheckedGenre.getAttribute('id'));
            displayFilteredBooks(generalFilteredBooks);
        }
         
    } else {
        filterOnGenre = filterOnGenre.filter(filteredBook => persianToEnglish(filteredBook.genre) !== uncheckedGenre.getAttribute('id'));
        generalFilteredBooks = filterOnGenre.filter(filteredBook => persianToEnglish(filteredBook.genre) !== uncheckedGenre.getAttribute('id'));
        displayFilteredBooks(generalFilteredBooks);
    }
    
}
// For genre filters::end


// For language filters::start
function deleteUncheckedLanguage(uncheckedLanguage) {
    filterOnLanguage = filterOnLanguage.filter(filteredBook => persianToEnglish(filteredBook.language) !== uncheckedLanguage.getAttribute('id'));

    if(filterOnGenre.length === 0 && filterOnLanguage >= 1) {
        generalFilteredBooks = generalFilteredBooks.filter(filteredBook => persianToEnglish(filteredBook.language) !== uncheckedLanguage.getAttribute('id'));
        displayFilteredBooks(generalFilteredBooks); 
    }

    else if(filterOnGenre.length === 0 && filterOnLanguage.length === 0) {
        filterOnLanguage = filterOnLanguage.filter(filteredBook => persianToEnglish(filteredBook.language) !== uncheckedLanguage.getAttribute('id'));
        generalFilteredBooks = [];
        displayFilteredBooks(generalFilteredBooks);
        // ok
    }

    else if(filterOnGenre.length >= 1 && filterOnLanguage.length === 0) {
        generalFilteredBooks = [];
        filterOnGenre.forEach(book => generalFilteredBooks.push(book));
        displayFilteredBooks(generalFilteredBooks);
    }

    else if(filterOnGenre.lenght >= 1 && filterOnLanguage >= 1) {
        generalFilteredBooks = generalFilteredBooks.filter(filteredBook => persianToEnglish(filteredBook.language) !== uncheckedLanguage.getAttribute('id'));
        displayFilteredBooks(generalFilteredBooks); 
    } 
}
// For language filters::end

// controlling unchecked inputs for genre and language filters::end









// view
function displayFilteredBooks(filteredBooks) {
    switch (filteredBooks.length) {
        case 0:
            LIBRARY.innerHTML = '';
            renderCards();
            break;

        default:
            const displayedBooksOnGenre = filteredBooks.map(book => {
                return `   
                <div class="cards col-lg-4 m-3 d-flex flex-column align-items-center justify-content-center">
                    <div class="cards--bookmoc">

                           <div class="cards--bookmoc--image">
                           <img class="cards--bookmoc--image--frame" src="./assets/images/${book.imgSrc}" alt="">
                           </div>
            
                    </div>


                     <div class="cards__content">
                            <h3 class="cards__content--title fs-lg-20px mb-2 mt-3">${book.title}</h3>
                            <h4 class="cards__content--author mb-3 fw-normal fs-lg-16px">${book.author}</h4>
           
                            <div class="cards__content__info mb-2">
                                <h5 class="cards__content__info--published-date card-info fs-lg-14px fw-light">${book.published_date}</h5>
                                <h5 class="cards__content__info--genre card-info fs-lg-14px fw-light">${book.genre}</h5>
                                <h5 class="cards__content__info--language card-info fs-lg-14px fw-light">${book.language}</h5>
                            </div>
           
                            <div class="cards__content__buttons">
                                <button class="cards__content__buttons--add Mybtn">افزودن به کتابخانه</button>
                                
                                <i class="fa-regular fa-heart cards__content__buttons--fav MyIcon"></i>
                            
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
    
    







document.addEventListener('DOMContentLoaded', allCategoriesRender);
