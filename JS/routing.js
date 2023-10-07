// routing to home page page (handle back and forward)

function handleRoutingToHomePage(event) {
    debugger
    event.preventDefault();
    const homePageHref = event.target.closest('.TO_HOME_PAGE_BTN').href;
    console.log(homePageHref)
    history.pushState(null, null, homePageHref);
    showHomePage()
}


function showHomePage() {
    HOME_PAGE.classList.remove('d-none');
    MY_LIBRARY_PAGE.classList.add('d-none');
    ALL_BOOKS_PAGE.classList.add('d-none');
}


TO_HOME_PAGE_BTN.addEventListener('click', handleRoutingToHomePage)







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



// routing to my library page (handle back and forward)

function handleRoutingToMyLibrary(event) {
    debugger
    event.preventDefault();
    const myLibraryPageHref = event.target.closest('.TO_MY_LIBRARY_PAGE_BTN').href;
    console.log(myLibraryPageHref)
    history.pushState(null, null, myLibraryPageHref);
    showMyLibraryPage()
}

function showMyLibraryPage() {
    HOME_PAGE.classList.add('d-none');
    MY_LIBRARY_PAGE.classList.remove('d-none');
    ALL_BOOKS_PAGE.classList.add('d-none');
}




TO_MY_LIBRARY_PAGE_BTN.addEventListener('click', handleRoutingToMyLibrary)