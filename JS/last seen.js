function renderLastSeenCards() {
    lastSeen.map(book => {
        return `
        <swiper-slide class="d-flex justify-content-center align-items-center h-90 " data-genre="${book.genre}">
        <div class="cards p-0 box-shadow-none m-3 d-flex align-items-center justify-content-center h-85 w-50 w-max-none HOME_CARD_SWIPER">

            
            <div class="cards__layout h-100 w-100 d-flex justify-content-center align-items-center position-relative">

                <div class="cards--bookmoc--image cards__layout--image">
                    <img class="cards--bookmoc--image--frame" src="./assets/images/${persianToEnglish(book.genre)}.jpg" alt="">
                </div>

                <div class="position-absolute text-shadow">
                    <span class="fs-lg-40px fw-bolder text-white">${book.genre}</span>
                </div>

            </div>
             
        </div>
    </swiper-slide>
        `
    })
}