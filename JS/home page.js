


function sliderMaker() {
    const topSwiperSlide = genres.map(genre => {
        return `
        
    <swiper-slide class="d-flex justify-content-center align-items-center h-90 " data-genre="${genre}">
        <div class="cards p-0 box-shadow-none m-3 d-flex align-items-center justify-content-center h-85 w-50 w-max-none HOME_CARD_SWIPER">

            
            <div class="cards__layout h-100 w-100 d-flex justify-content-center align-items-center position-relative">

                <div class="cards--bookmoc--image cards__layout--image">
                    <img class="cards--bookmoc--image--frame" src="./assets/images/${persianToEnglish(genre)}.jpg" alt="">
                </div>

                <div class="position-absolute text-shadow">
                    <span class="fs-lg-40px fw-bolder text-white">${genre}</span>
                </div>

            </div>
             
        </div>
    </swiper-slide>
`
    })

    SLIDER_CONTAINER.innerHTML = topSwiperSlide.join(''); 
}


let parent;
let initialCardize;
let cardContentChanged = false;
let CARD_INTERCHANGABLE_CONTENT;

function resizeCard(event) { 
    debugger
    parent = event.target.parentElement;
    const genre = parent.getAttribute('data-genre'); 
    event.target.classList.remove('cards')
    event.target.innerHTML = ''
    const effectCardsContainer = document.createElement('swiper-container');
    effectCardsContainer.classList.add("mySwiper");
    effectCardsContainer.classList.add("h-85");
    effectCardsContainer.classList.add("w-85");
    effectCardsContainer.setAttribute("effect", "cards");
    effectCardsContainer.setAttribute("grab-cursor", "true"); 
    event.target.appendChild(effectCardsContainer);
    effectCardsContainer.innerHTML = efectCardsGenerator(genre);
    
}


function efectCardsGenerator(genre) {
    const filteredBooks = BOOKS.filter(book => book.genre === genre);
    const card = filteredBooks.map(book => {
         return`
        <swiper-slide>
            <div class="cards--bookmoc--image cards__layout--image">
                <img class="cards--bookmoc--image--frame" src="./assets/images/${book.imgSrc}" alt="">
            </div>
        </swiper-slide>`
    })

    return card.join('');
    
}

function resizeCard2(event) {
    debugger
    const genre = parent.getAttribute('data-genre');
    event.target.innerHTML = `
    <div class="cards__layout h-100 w-100 d-flex justify-content-center align-items-center position-relative">

        <div class="cards--bookmoc--image cards__layout--image">
            <img class="cards--bookmoc--image--frame" src="./assets/images/${persianToEnglish(genre)}.jpg" alt="">
        </div>

        <div class="position-absolute text-shadow">
            <span class="fs-lg-40px fw-bolder text-white">${genre}</span>
        </div>

    </div>`
   
    
    
}


function eventsOnCards(cards) {
    cards.map(card => card.addEventListener('mouseenter', resizeCard));
    cards.map(card => card.addEventListener('mouseleave', resizeCard2))
}


function getSlider() {
    const HOME_CARD_SWIPER = Array.from(document.querySelectorAll('.HOME_CARD_SWIPER'));
    SWIPER_CONTAINER = document.querySelector('.SWIPER_CONTAINER');
    const CARD_INTERCHANGABLE_CONTENT = document.querySelector('.CARD_INTERCHANGABLE_CONTENT');
    eventsOnCards(HOME_CARD_SWIPER);
}

const homeSliderPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 0);
});


homeSliderPromise
    .then(sliderMaker)
    .then(getSlider)
    
    










