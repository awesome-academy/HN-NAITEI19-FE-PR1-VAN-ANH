// POP UP

const popup = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close-btn");
const popupCloseOverlay = document.querySelector(".popup__close-overlay");

const popupCloseFunc = function () { popup.classList.add('hidden') }

popupCloseOverlay.addEventListener('click', popupCloseFunc);
popupCloseBtn.addEventListener('click', popupCloseFunc);




function goBackToHomePage() {
    window.location.href = "index.html";
}

function goToRegisterPage() {
    window.location.href = "register.html";
}

// FEATURED PRODUCTS
const featuredList = document.getElementById('featured__list');

function getDataForFeatured() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const results = JSON.parse(xhr.responseText);
            results.forEach(result => {
                const liItem = document.createElement('li');
                const formattedPrice = result.price.toLocaleString('vi-VN').replace('₫', '');
                liItem.innerHTML =
                    `
                    <div class="featured__item">
                        <div class="item__img">
                            <img src="${result.picture}" alt="">
                        </div>
                        <div class="item__price text-center">
                            ${formattedPrice} Đ
                        </div>
                        <div class="item__name text-center">
                            ${result.name}
                        </div>
                        <div class="item__rating text-center">
                            <img src="./assets/image/rating.png" alt="Rating">
                            <span class="item__comment"> (${result.comment} Đánh giá) </span>
                        </div> 
                        <div class="item__button">
                            <button type="button" class="buy item__btn btn--bg-primary">MUA NGAY</button>
                            <button type="button" class="detail item__btn btn--bg-black">XEM CHI TIẾT</button>
                        </div>
                    </div>
                    `;
                featuredList.appendChild(liItem);
            });

            initializeProductList();
        }
    };

    xhr.send();
}

function initializeProductList() {
    const productList = document.getElementById("featured__list");
    const products = Array.from(productList.getElementsByTagName("li"));
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    let currentIndex = 0;

    const showProducts = (startIndex) => {
        for (let i = 0; i < products.length; i++) {
            products[i].classList.add("hidden");
        }
        for (let i = startIndex; i < startIndex + 6; i++) {
            const productIndex = i % products.length;
            products[productIndex].classList.remove("hidden");
        }
    };

    const showNextProducts = () => {
        currentIndex = (currentIndex + 6) % products.length;
        showProducts(currentIndex);
    };

    const showPrevProducts = () => {
        currentIndex = (currentIndex - 6 + products.length) % products.length;
        showProducts(currentIndex);
    };

    prevButton.addEventListener("click", showPrevProducts);
    nextButton.addEventListener("click", showNextProducts);

    showProducts(currentIndex);
}

getDataForFeatured();

// New Product

const newProductList = document.getElementById('new__list');

function getDataForNewProduct() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const results = data.filter(product => product.status === 'new');
            results.forEach((result) => {
                const liItem = document.createElement('li');
                const formattedPrice = result.price.toLocaleString('vi-VN').replace('₫', '');
                liItem.innerHTML =
                    `
                    <div class="new__item">
                        <div class="new__img">
                            <img src="${result.picture}" alt="">
                        </div>
                        <div class="new__content">
                            <div class="new__name">
                                ${result.name}
                            </div>
                            <div class="new__rating">
                                <img src="./assets/image/rating.png" alt="Rating">
                                <span class="new__comment"> (${result.comment} Đánh giá) </span>
                            </div>
                            <div class="new__description">
                                ${result.description}
                            </div> 
                            <div class="new__price">
                                ${formattedPrice} Đ
                            </div>
                            <div class="new__button-list">
                                <button type="button" class="buy new__btn-list btn--bg-primary">MUA NGAY</button>
                                <button type="button" class="detail new__btn-list btn--bg-black">XEM CHI TIẾT</button>
                            </div>
                        </div>
                    </div>
                    `;
                newProductList.appendChild(liItem);
            });

            initializeNewList();
        }
    };

    xhr.send();
}

function initializeNewList() {
    const newList = document.getElementById("new__list");
    const news = Array.from(newList.getElementsByTagName("li"));
    const prevButton = document.getElementById("prev-new");
    const nextButton = document.getElementById("next-new");
    let currentIndex = 0;

    const showNews = (startIndex) => {
        for (let i = 0; i < news.length; i++) {
            news[i].classList.add("hidden");
        }
        for (let i = startIndex; i < startIndex + 4; i++) {
            const newProductIndex = i % news.length;
            news[newProductIndex].classList.remove("hidden");
        }
    }

    const showNextNews = () => {
        currentIndex = (currentIndex + 4) % news.length;
        showNews(currentIndex);
    }

    const showPrevNews = () => {
        currentIndex = (currentIndex - 4 + news.length) % news.length;
        showNews(currentIndex);
    };

    prevButton.addEventListener("click", showPrevNews);
    nextButton.addEventListener("click", showNextNews);

};

getDataForNewProduct();

// Sản phẩm mới

document.addEventListener("DOMContentLoaded", function () {
    const spList = document.getElementById("newsp__list");
    let currentCategory = "Máy khoan";

    document.getElementById("maykhoan").addEventListener("click", function () {
        currentCategory = "Máy khoan";
        updateProductList();
    });

    document.getElementById("mayin3d").addEventListener("click", function () {
        currentCategory = "Máy in 3D";
        updateProductList();
    });

    document.getElementById("maycnc").addEventListener("click", function () {
        currentCategory = "Máy CNC";
        updateProductList();
    });

    document.getElementById("maytien").addEventListener("click", function () {
        currentCategory = "Máy tiện";
        updateProductList();
    });

    document.getElementById("maykhac").addEventListener("click", function () {
        currentCategory = "Máy khác";
        updateProductList();
    });

    function updateProductList() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/products', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const results = data.filter(newSp => newSp.category === currentCategory);
                spList.innerHTML = '';

                results.forEach(result => {
                    const formattedPrice = result.price.toLocaleString('vi-VN').replace('₫', '');
                    const liItem = document.createElement('li');
                    liItem.innerHTML =
                        `
                        <div class="newsp__item">
                        <div class="newsp__img">
                            <img src="${result.picture}" alt="">
                        </div>
                        <div class="newsp__price text-center">
                            ${formattedPrice} Đ
                        </div>
                        <div class="newsp__name text-center">
                            ${result.name}
                        </div>
                        <div class="newsp__rating text-center">
                            <img src="./assets/image/rating.png" alt="Rating">
                            <span class="newsp__comment"> (${result.comment} Đánh giá) </span>
                        </div> 
                        <div class="newsp__content-btn">
                            <button type="button" class="buy newsp__ct-btn btn--bg-primary">MUA NGAY</button>
                            <button type="button" class="detail newsp__ct-btn btn--bg-black">XEM CHI TIẾT</button>
                        </div>
                    </div>
                        `;
                    spList.appendChild(liItem);
                });

                initializeNewSpList();
            }
        };

        xhr.send();
    }

    function initializeNewSpList() {
        const newsps = Array.from(spList.getElementsByClassName("newsp__item"));
        const prevButton = document.getElementById("prev-newsp");
        const nextButton = document.getElementById("next-newsp");
        let currentIndex = 0;

        const showNewSps = (startIndex) => {
            newsps.forEach(news => {
                news.classList.add("hidden");
            });
            for (let i = startIndex; i < startIndex + 3; i++) {
                const newSpIndex = i % newsps.length;
                newsps[newSpIndex].classList.remove("hidden");
            }
        }

        const showNextNewSps = () => {
            currentIndex = (currentIndex + 3) % newsps.length;
            showNewSps(currentIndex);
        }

        const showPrevNewSps = () => {
            currentIndex = (currentIndex - 3 + newsps.length) % newsps.length;
            showNewSps(currentIndex);
        };

        prevButton.addEventListener("click", showPrevNewSps);
        nextButton.addEventListener("click", showNextNewSps);
    }

    updateProductList();
});



// Brand carousel

document.addEventListener("DOMContentLoaded", function() {
    const brandList = document.getElementById("brand__list");
    const brands = Array.from(brandList.getElementsByTagName("img"));
    const prevButton = document.getElementById("brand__prev");
    const nextButton = document.getElementById("brand__next");
    let currentIndex = 0;

    const showBrands = (startIndex) => {
        for(let i = 0; i <brands.length; i++) {
            brands[i].classList.add("hidden");
        }
        for(let i = startIndex; i < startIndex + 5; i++) {
            const brandIndex = i % brands.length;
            brands[brandIndex].classList.remove("hidden");
        }

    }

    const showNextBrands = () => {
        currentIndex = (currentIndex + 5) % brands.length;
        showBrands(currentIndex);
    }

    const showPrevBrands = () => {
        currentIndex = (currentIndex - 4 + brands.length) % brands.length;
        showBrands(currentIndex);
    };

    prevButton.addEventListener("click", showPrevBrands);
    nextButton.addEventListener("click", showNextBrands);

});


