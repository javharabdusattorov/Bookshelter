// function of submit
elInput.keyup(function(evt) {
  let code = evt.which;
  if (code === 13) {
    evt.preventDefault();
    search = elInput.val();
    elInput.val("");
    elInput.attr("placeholder", `${search}`);
    searchFetch();
  }
});

// function of FETCH
searchFetch()
function searchFetch() {
    startLoader()
    fetch(`${API_URL}/books/v1/volumes?q=${search}&startIndex=${pagination.startIndex}&orderBy=${order}`)
    .then((res) => res.json())
    .then((detail) => {
      allBooks = detail.items || [];
      $('.header__bottom-result').text(`Showing ${detail.totalItems} Result(s)`);
      endLoader()
      
      if (!detail.items) {
        reflash()
      }

      renderBooks()
      calculatePagination(detail.totalItems)
      renderPagination()
    });
}

// function of Default book/Newest book
let isDefaultOrNewest = false;
$('.header__bottom-newest').on('click', function() {
    isDefaultOrNewest = !isDefaultOrNewest;

    if (isDefaultOrNewest === true) {
        $('.header__bottom-newest').text('📅 Order by default');
        order = 'newest';
        searchFetch()
    }
    else if (isDefaultOrNewest === false) {
        $('.header__bottom-newest').text('📅 Order by newest');
        order = 'relevance'
        searchFetch()
    } 
})

// function of RENDER
function renderBooks() {
  elBooks.html("");
  allBooks.forEach((book, index) => {
    let html = $(`
    <div class="col-lg-4 book-item d-flex flex-column mt-4" data-id="${index}">
        <div class="books__top">
            <img src="${
              book.volumeInfo.imageLinks.smallThumbnail ||
              " https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=200" }" alt="">
        </div>

        <div class="books__bottom flex-grow-1 mt-2">
            <h5 class="books__title">${book.volumeInfo.title}</h5>
            <p class="books__writer">${book.volumeInfo.authors}</p>
            <p class="books__year">${book.volumeInfo.publishedDate}</p>
        </div>

        <div class="books__bottom-btns mt-2">
            <div class="books__info-btns d-flex justify-content-between">
                <button class="btn btn-warning add__bookmark w-100" onclick="bookmarkFetch(event)">Bookmark</button>
                <button onclick="infoFetch(event)" class="btn btn-info books__info w-100 ms-2" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">More info
                </button>
            </div>
            <a href="${book.volumeInfo.previewLink}"
                target="_blank" class="btn btn-secondary books__read w-100 mt-1">Read
            </a>
        </div>
    </div>
  
    `);
    elBooks.append(html);
  });
}

// funciton of PAGINATION
function goToPage(evt) {
    const element = $(evt.target);
    const index = element.attr('data-id');
    pagination.currentPage = parseInt(index);
    
    searchFetch()
}

function goToPrev(evt) {
    const element = $(evt.target);
    pagination.currentPage-= 1
    pagination.startIndex = pagination.startIndex - 10;
    searchFetch()
}

function goToNext(evt) {
    const element = $(evt.target);
    pagination.currentPage++
    pagination.startIndex = pagination.startIndex + 10;
    searchFetch()
}

function calculatePagination(total) {
    const eachPage = pagination.eachPage;
    const pageCount = Math.ceil(total / eachPage);
    pagination.total = total;
    pagination.pageCount = pageCount;
    pagination.startIndex = pagination.currentPage * 10;

    if (pagination.currentPage === 1) {
        elPrevBtn.disabled = true;
        elPrevBtn.addClass("disabled");
    } else {
        elPrevBtn.disabled = false;
        elPrevBtn.removeClass("disabled");
    }
}

function renderPagination() {
    elPaginationContainer.html("")

    for(let i = 1; i <= pagination.pageCount; i++) {
        const activeClass = i === pagination.currentPage ? "primary" : "";
        let html = $(`
            <div class="pagination-item">
                <button
                    onclick="goToPage(event)"
                    class="pagination-btn btn ${activeClass} ms-2"
                    data-id="${i}">${i}
                </button>
            </div>
        `)
        elPaginationContainer.append(html);
    }
}

function reflash() {
    var toastLiveExample = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();

    search = 'javascript';
    searchFetch()
    elInput.val("");
    elInput.attr("placeholder", "Movie name");
    elBooks.html("");
}