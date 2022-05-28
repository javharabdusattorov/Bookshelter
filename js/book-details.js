
// function of RENDER
function renderBookInfo() {
    $('.info__title').text(`${bookInfo.volumeInfo.title}`);
    $('.offcanvas__image img').attr('src', `${bookInfo.volumeInfo.imageLinks.smallThumbnail}`);
    $('.info__description').text(`${bookInfo.searchInfo.textSnippet}`);
    $('.info__author-name').text(`${bookInfo.volumeInfo.authors}`);
    $('.info__author-btn').text(`Author ${bookInfo.volumeInfo.authors.length}`)
    $('.info__year').text(`${bookInfo.volumeInfo.publishedDate}`);
    $('.info__publishers').text(`${bookInfo.volumeInfo.publisher}`);
    $('.info__categories').text(`${bookInfo.volumeInfo.categories}`);
    $('.info__page-count').text(`${bookInfo.volumeInfo.pageCount}`);
    $('.offcanvas__read').attr('href', `${bookInfo.volumeInfo.previewLink}`)
}

// // function of FETCH
function infoFetch(evt) {
    const element = $(evt.target);
    const index = element.parent().parent().parent().attr('data-id');
    
    fetch(`${API_URL}/books/v1/volumes?q=${allBooks[index].id}`)
        .then(res => res.json())
        .then(info => {
            bookInfo = info.items[0];
            renderBookInfo()
    })
}