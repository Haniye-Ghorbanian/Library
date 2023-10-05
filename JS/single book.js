


function handleRoutToSingleBook(event) {
    event.preventDefault();
    const singleBookHref = event.target.closest('.SINGLE_BOOK').href;
    console.log(singleBookHref)
    history.pushState(null, null, singleBookHref);
    showSingleBookPage()
}


function showSingleBookPage() {
    ALL_BOOKS_PAGE.classList.add('d-none');
    SINGLE_BOOK_PAGE.classList.remove('d-none')
}




function startSingleBook(singleBook) {
    console.log(singleBook)
    singleBook.map(book => book.addEventListener('click', handleRoutToSingleBook))
}



document.addEventListener("DOMContentLoaded", startSingleBook);