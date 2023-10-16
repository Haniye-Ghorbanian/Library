const LINKS = document.querySelectorAll('.LINK');





function renderPage(path) {
    switch (path) {
        case '':
            HOME_PAGE.classList.remove('d-none');
            MY_LIBRARY_PAGE.classList.add('d-none');
            ALL_BOOKS_PAGE.classList.add('d-none');
            SINGLE_BOOK_PAGE.classList.add('d-none');
            break;

        case 'myLibrary':
            HOME_PAGE.classList.add('d-none');
            ALL_BOOKS_PAGE.classList.add('d-none');
            MY_LIBRARY_PAGE.classList.remove('d-none');
            SINGLE_BOOK_PAGE.classList.add('d-none');
            break;

        case 'allBooks':
            HOME_PAGE.classList.add('d-none');
            MY_LIBRARY_PAGE.classList.add('d-none');
            ALL_BOOKS_PAGE.classList.remove('d-none');
            SINGLE_BOOK_PAGE.classList.add('d-none');
            break;

        // case 'book': 
        //     HOME_PAGE.classList.add('d-none');
        //     MY_LIBRARY_PAGE.classList.add('d-none');
        //     ALL_BOOKS_PAGE.classList.add('d-none');
        //     SINGLE_BOOK.classList.remove('d-none');
        //     const bookId = +event.target.closest('.SINGLE_BOOK').getAttribute('data-book-id');
        //     showSingleBook()

        
       

    }
}



function showSingleBook() {

}



function handleRouting() {
    const path = window.location.pathname.split('/');
    const prePath = (path[path.length - 1]);
    renderPage(prePath)
}



function updateRouting(event) {
    debugger
    event.preventDefault();
    const href = event.target.closest('.LINK').href;
    // console.log(href)
    const currentHref = href.split('/')
    const currentPath = currentHref[currentHref.length - 1];
    history.pushState(null, null, href);
    renderPage(currentPath);
}






LINKS.forEach(link => link.addEventListener('click', updateRouting));
    

window.addEventListener('popstate', handleRouting);





// routing to home page page (handle back and forward)

// function handleRoutingToHomePage(event) {
//     debugger
//     event.preventDefault();
//     const homePageHref = event.target.closest('a').href;
//     console.log(homePageHref)
//     history.pushState(null, null, homePageHref);
//     showHomePage()
// }


// function showHomePage() {
//     HOME_PAGE.classList.remove('d-none');
//     MY_LIBRARY_PAGE.classList.add('d-none');
//     ALL_BOOKS_PAGE.classList.add('d-none');
// }


// TO_HOME_PAGE_BTN.addEventListener('click', handleRoutingToHomePage)







// routing to all books page (handle back and forward)

// function handleRoutingToAllBooks(event) {
//     debugger
//     event.preventDefault();
//     const allBooksPageHref = event.target.closest('a').href;
//     console.log(allBooksPageHref)
//     history.pushState(null, null, allBooksPageHref);
//     showAllBooksPage();
// }


// function showAllBooksPage() {
//     HOME_PAGE.classList.add('d-none');
//     MY_LIBRARY_PAGE.classList.add('d-none');
//     ALL_BOOKS_PAGE.classList.remove('d-none');
// }


// TO_ALL_BOOKS_PAGE_BTN.addEventListener('click', handleRoutingToAllBooks)



// routing to my library page (handle back and forward)

// function handleRoutingToMyLibrary(event) {
//     debugger
//     event.preventDefault();
//     const myLibraryPageHref = event.target.closest('a').href;
//     const pathParts = myLibraryPageHref.split('/'); // Split the URL by '/'
//     console.log(pathParts)
//     const lastPathPart = pathParts[pathParts.length - 1];

//     console.log(lastPathPart);
//     console.log(myLibraryPageHref)
//     history.pushState(null, null, myLibraryPageHref);
//     showMyLibraryPage();
// }


// function showMyLibraryPage() {
//     HOME_PAGE.classList.add('d-none');
//     ALL_BOOKS_PAGE.classList.add('d-none');
//     MY_LIBRARY_PAGE.classList.remove('d-none');
// }


// TO_MY_LIBRARY_PAGE_BTN.addEventListener('click', handleRoutingToMyLibrary)





