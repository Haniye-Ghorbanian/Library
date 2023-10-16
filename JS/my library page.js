let containerIsOpened = false;
function showMoreSavedBooks() {
    debugger
    if(!containerIsOpened) {
        ALL_SAVED_BOOKS.classList.remove('max-h-350');
        ALL_SAVED_BOOKS.classList.add('fit-content-h');
        SHOW_MORE_SAVED_BOOKS_TEXT.textContent = 'مشاهده کمتر';
        SHOW_MORE_SAVED_BOOKS_ICON.classList.remove('fa-chevron-down');
        SHOW_MORE_SAVED_BOOKS_ICON.classList.add('fa-chevron-up');
        containerIsOpened = true;
    } else {
        ALL_SAVED_BOOKS.classList.remove('fit-content-h');
        ALL_SAVED_BOOKS.classList.add('max-h-350');
        SHOW_MORE_SAVED_BOOKS_ICON.classList.add('fa-chevron-down');
        SHOW_MORE_SAVED_BOOKS_ICON.classList.remove('fa-chevron-up');
        SHOW_MORE_SAVED_BOOKS_TEXT.textContent = 'نمایش همه';
        containerIsOpened = false;
    }

}



SHOW_MORE_SAVED_BOOKS.addEventListener('click', showMoreSavedBooks)