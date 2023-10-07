// routing to all books page (handle back and forward)

function handleRoutingToAllBooks(event) {
    debugger
    event.preventDefault();
    const allBooksPageHref = event.target.closest('.TO_ALL_BOOKS_PAGE_BTN').href;
    console.log(allBooksPageHref)
    history.pushState(null, null, allBooksPageHref);
    showAllBooksPage()
}

function showAllBooksPage() {
    HOME_PAGE.classList.add('d-none');
    MY_LIBRARY_PAGE.classList.add('d-none');
    ALL_BOOKS_PAGE.classList.remove('d-none');
}




TO_ALL_BOOKS_PAGE_BTN.addEventListener('click', handleRoutingToAllBooks)