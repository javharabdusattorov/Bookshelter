
// Variables
let bookmark = JSON.parse(localStorage.getItem('bookmark')) || [];
let allBooks = [];
let bookInfo = {};
let search = 'javascript';
let order = 'relevance';
let pagination = {
    total: null,
    eachPage: 10,
    pageCount: null,
    currentPage: 1,
    startIndex: 0
}

// Constantas
const API_URL = `https://www.googleapis.com`;   
const elBooks = $('.books');
const elInput = $('.header__form-search');
const elBookmarkContainer = $('.bookmarks__list');
const elPaginationContainer = $('.pagination');
const elPrevBtn = $('.prev__btn');