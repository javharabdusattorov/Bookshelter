// function of FETCH
function bookmarkFetch(evt) {
    const element = $(evt.target);
    const index = element.parent().parent().parent().attr('data-id');
    
    if(!isBookLiked(allBooks[index])) {
        bookmark.push(allBooks[index]);
        console.log(bookmark);
    }
    
    localData()
    renderBookmark(bookmark)
}

function isBookLiked(allBookID) {
    return bookmark.some(book => book.id === allBookID.id);
}

// function RENDER
renderBookmark(bookmark)
function renderBookmark(bookmark) {
    elBookmarkContainer.html("")
    bookmark.forEach( (book, index) => {
        let html = $(`
        <div class="bookmarks__item mt-2">
            <div>
                <h3 class="bookmark__title">${book.volumeInfo.title}</h3>
                <p class="bookmark__text">${book.volumeInfo.authors}</p>
            </div>
            <div class="d-flex align-items-center justify-content-between">
                <a target="_blank" href="${book.volumeInfo.previewLink}" type="button" class="bookmark__read-link" target="_blank">
                    <img src="img/book-open.png" alt="">
                </a>
                <button class="bookmarks__delete">
                    <img onclick="removeBookfromBookmark(event)" data-id="${index}" src="img/book-delete.png" alt="">
                </button>
            </div>
        </div>
        `)
    elBookmarkContainer.append(html);
    })
}

// function of delete Book from bookmark
function removeBookfromBookmark(evt) {
    const element = $(evt.target);
    const index = element.attr('data-id');
    bookmark.splice(index, 1);

    renderBookmark(bookmark)
    localData()
}

function localData() {
    localStorage.setItem('bookmark', JSON.stringify(bookmark));
}