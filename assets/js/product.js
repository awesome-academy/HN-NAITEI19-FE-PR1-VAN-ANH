const freeProductList = document.getElementById('product-category__free-list');

document.addEventListener("DOMContentLoaded", function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const results = data.filter(product => product.status === 'free');

            const limitedResults = results.slice(0, 6);

            limitedResults.forEach((result) => {
                const liItem = document.createElement('li');
                const formattedPrice = result.price.toLocaleString('vi-VN').replace('₫', '');
                liItem.innerHTML =
                    `
                    <div class="free__img">
                        <img src="${result.picture}" alt="">
                    </div>
                    <div class="free__content">
                        <div class="free__title">
                            ${result.name}
                        </div>
                        <div class="free__price">
                            ${formattedPrice}
                        </div>
                    </div>
                    `;
                freeProductList.appendChild(liItem);
            });
        }
    };

    xhr.send();
});

const galleryList = document.querySelector(".gallery");
console.log(galleryList);
document.addEventListener("DOMContentLoaded", function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const results = JSON.parse(xhr.responseText);
            results.forEach((result) => {
                const divItem = document.createElement('div');
                divItem.classList.add("gallery__item")
                const formattedPrice = result.price.toLocaleString('vi-VN').replace('₫', '');
                divItem.innerHTML =
                    `
                    <div class="gallery__img">
                                    <img src="${result.picture}" alt="">
                                </div>
                                <div class="gallery__content">
                                    <div class="gallery__name">
                                        ${result.name}
                                    </div>
                                    <div class="gallery__rating">
                                        <img src="./assets/image/rating.png" alt="Rating">
                                        <span class="gallery__comment"> (${result.comment} Đánh giá) </span>
                                    </div>
                                    <div class="gallery__description">
                                        ${result.description}
                                    </div>
                                    <div class="gallery__price">
                                        ${formattedPrice} Đ
                                    </div>
                                    <div class="gallery__button">
                                        <button type="button" class="buy btn--bg-primary">MUA NGAY</button>
                                        <button type="button" class="detail btn--bg-black" data-product-id="${result.id}">XEM CHI TIẾT</button>
                                    </div>
                                </div>
                    `;
                galleryList.appendChild(divItem);
            });
            initializeProductDisplay();
            const detailButtons = document.querySelectorAll(".detail");

            detailButtons.forEach((button) => {
                button.addEventListener("click", function() {
                    const productId = this.getAttribute("data-product-id");
                    window.location.href = `detail.html?id=${productId}`
                });
            });
        }
    };

    xhr.send();
});


function initializeProductDisplay(){
    var currentPage = 1;
var itemsPerPage = 9;
var products = document.querySelectorAll(".gallery__item");
var totalPages = Math.ceil(products.length / itemsPerPage);
var pageNumbers = document.getElementById("page-numbers");
var listNumber = document.getElementById("list-number");
const gallery = document.querySelector(".gallery");
var isGridActive = false;

document.getElementById("grid-active-btn").addEventListener("click", function () {
    isGridActive = true;
    gallery.classList.add("grid-display");
    updateProductDisplay(currentPage, itemsPerPage);
    document.getElementById("grid-active-btn").classList.add("active-btn");
    document.getElementById("detail-active-btn").classList.remove("active-btn");
});

document.getElementById("detail-active-btn").addEventListener("click", function () {
    isGridActive = false;
    gallery.classList.remove("grid-display");
    updateProductDisplay(currentPage, itemsPerPage);
    document.getElementById("detail-active-btn").classList.add("active-btn");
    document.getElementById("grid-active-btn").classList.remove("active-btn");
});



listNumber.addEventListener("change", function () {
    itemsPerPage = parseInt(this.value);
    totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    updateProductDisplay(currentPage, itemsPerPage);
});

for (var i = 1; i <= totalPages; i++) {
    var pageNumber = document.createElement("button");
    pageNumber.textContent = i;
    pageNumber.classList.add("page-number");
    pageNumbers.appendChild(pageNumber);

    pageNumber.addEventListener("click", function () {
        currentPage = parseInt(this.textContent);
        updateProductDisplay(currentPage, itemsPerPage);
    });
}

document.getElementById("previous-page-button").addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        updateProductDisplay(currentPage, itemsPerPage);
    }
});

document.getElementById("next-page-button").addEventListener("click", function () {
    if (currentPage < totalPages) {
        currentPage++;
        updateProductDisplay(currentPage, itemsPerPage);
    }
});

function updateProductDisplay(currentPage, itemsPerPage) {
    for (var i = 0; i < products.length; i++) {
        if (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) {
            products[i].style.display = "flex";
        } else {
            products[i].style.display = "none";
        }
    }

    var pageButtons = document.querySelectorAll(".page-number");
    for (var i = 0; i < pageButtons.length; i++) {
        pageButtons[i].classList.remove("active-page-btn");
    }

    pageButtons[currentPage - 1].classList.add("active-page-btn");
}

updateProductDisplay(currentPage, itemsPerPage); 
}

function ToPayPage() {
    window.location.href = "pay.html";
}

function ToCartPage() {
    window.location.href = "cart.html";
}


function goBackToHomePage() {
    window.location.href = "index.html";
}

function goToRegisterPage() {
    window.location.href = "register.html";
}


document.addEventListener("DOMContentLoaded", function () {
    const cartDropdown = document.querySelector('.cart-dropdown__content');
    const cartList = cartDropdown.querySelector('.cart-dropdown__list');
    const totalPay = document.querySelector('.cart-dropdown__total-money');

    function calculateTotal(cartData) {
        let total = 0;
        cartData.forEach((cartItem) => {
            total += cartItem.quantity * cartItem.productPrice;
        });

        total = total + 0.1*total;

        totalPay.textContent = total.toLocaleString('vi-VN') + ' Đ';
    
    }

    function displayCartItems(cartData) {
        cartList.innerHTML = '';

        cartData.forEach((cartItem, index) => {
            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                <div class="cart-dropdown__item">
                    <div class="cart-item__img">
                        <img src="${cartItem.productPicture}" alt="">
                    </div>
                    <div class="cart-item__content">
                        <div class="cart-item__name">
                            ${cartItem.productName}
                        </div>
                        <div class="cart-item__total">
                            <span class="cart-item__quantity">${cartItem.quantity} x </span>
                            <span class="cart-item__price">${cartItem.productPrice} Đ</span>
                        </div>
                    </div>
                    <div class="cart-item__button">
                        <button type="button">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            `;

            cartList.appendChild(cartItemElement);
        });

        calculateTotal(cartData);
    }

    function fetchCartItems() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/carts', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const cartData = JSON.parse(xhr.responseText);
                displayCartItems(cartData);
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
                console.error('Lỗi khi gọi API giỏ hàng');
            }
        };

        xhr.send();
    }

    fetchCartItems();

    const cartDropdownToggle = cartDropdown.querySelector('.cart-dropdown__toggle');
    cartDropdownToggle.addEventListener('click', function () {
        cartList.classList.toggle('show'); 
    });
});




