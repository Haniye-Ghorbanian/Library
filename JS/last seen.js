


function renderLastSeenCards(book) {
    const text = LAST_SEEN_BOOKS.querySelector('.last-seen-text');
    if (lastSeen.length === 0) {
        if (!text) {
            const newText = document.createElement('div');
            newText.classList.add('last-seen-text', 'd-flex', 'justify-content-center', 'align-items-center', 'h-100', 'w-100', 'fs-lg-20px', 'color-gray', 'fw-light', 'p-5', 'm-5');
            newText.textContent = 'هنوز کتابی مشاهده نکردید';
            LAST_SEEN_BOOKS.appendChild(newText);
        }
    } else {
    // const existingText = LAST_SEEN_BOOKS.querySelector('div');
    if (text) {
        LAST_SEEN_BOOKS.removeChild(text);
    }
    const lastSeenCard = document.createElement('swiper-slide');
    lastSeenCard.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'h-90');
    lastSeenCard.setAttribute('data-genre', book.genre);

    const cardContent = `
    <a href="./book${book.id}" class="SIMILAR_BOOK" data-book-id="${book.id}">
      <swiper-slide class="cards box-shadow-none m-3 d-flex flex-column align-items-center justify-content-center" style="width: 335.75px; margin-left: 30px;>
        <div
            class="">

            <div class="cards--bookmoc">

                <div class="cards--bookmoc--image">
                    <img class="cards--bookmoc--image--frame" src="./assets/images/${book.imgSrc}" alt="">
                </div>


            </div>
            <div class="cards__content">
                <h3
                    class="cards__content--title fs-lg-20px fs-md-18px fs-sm-16px mb-2 mt-3">
                    ${book.title}
                </h3>
                <h4
                    class="cards__content--author mb-3 fw-normal fs-lg-16px fs-md-14px fs-sm-12px">
                    ${book.author}
                </h4>

                <div class="cards__content__info mb-2 w-100">
                    <h5
                        class="cards__content__info--published-date card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">
                        ${book.published_date}
                    </h5>
                    <h5
                        class="cards__content__info--genre card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">
                        ${book.genre}
                    </h5>
                    <h5
                        class="cards__content__info--language card-info fs-lg-14px fs-md-12px fs-sm-10px fw-light">
                        ${book.language}
                    </h5>
                </div>

            </div>
        </div>
      </swiper-slide>
    </a>
    `

    lastSeenCard.innerHTML = cardContent;
    LAST_SEEN_BOOKS.appendChild(lastSeenCard);
    }
    
}


document.addEventListener('DOMContentLoaded', renderLastSeenCards);