function sliderMaker() {
    const topSwiperSlide = genres.map(genre => {
        return `<swiper-slide class="d-flex justify-content-center align-items-center HOME_CARD_SWIPER" data-genre="${persianToEnglish(genre)}">
        <div class="cards p-0 box-shadow-none m-3 d-flex align-items-center justify-content-between h-85 w-50 w-max-none">

            <div class="cards__layout h-100 w-100 d-flex justify-content-center align-items-center position-relative">

                <div class="cards--bookmoc--image cards__layout--image">
                    <img class="cards--bookmoc--image--frame" src="./assets/images/${persianToEnglish(genre)}.jpg" alt="">
                </div>

                <div class="position-absolute text-shadow">
                    <span class="fs-lg-40px fw-bolder text-white">${genre}<span/>
                </div>

            </div>

            

            <div class="cards__info HOME_CARD_SWIPER_INFO d-none">

                <div class="cards__info--tw d-flex flex-column align-items-center justify-content-between">
                    <span class="cards__info--tw--title fs-lg-20px fw-bold">ویس و رامین</span>
                    <span class="cards__info--tw--writer fs-lg-18px fw-semibold">هرچی</span>
                </div>


                <div class="cards__info--lgd d-flex align-items-center justify-content-between">

                    <span class="cards__info--lgd--language fs-lg-16px fw-normal">فارسی</span>
                    <span class="cards__info--lgd--genre fs-lg-16px fw-normal">ادبیات</span>
                    <span class="cards__info--lgd--date fs-lg-16px fw-normal">۶۷۰</span>
                </div>


                <div class="cards__content__buttons CARD_BUTTONS_CONTAINER">

                    <button class="cards__content__buttons--add Mybtn ADD_TO_LIBRARY_BTN" data-book-id="">افزودن به کتابخانه</button>
                    
                    <i class="fa-regular fa-heart cards__content__buttons--fav MyIcon ADD_TO_FAV_BTN" data-fav-book=""></i>
                    
                </div>

            </div>

        </div>
    </swiper-slide>
`
    })


    SLIDER_CONTAINER.innerHTML = topSwiperSlide.join(''); 
}



function getSlider() {
    const HOME_CARD_SWIPER = Array.from(document.querySelectorAll('.HOME_CARD_SWIPER'));
    console.log(HOME_CARD_SWIPER)
}

const homeSliderPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 0);
});


homeSliderPromise
    .then(sliderMaker)
    .then(getSlider)










