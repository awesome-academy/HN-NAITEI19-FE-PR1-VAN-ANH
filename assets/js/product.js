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

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const pageNumbers = document.getElementById("page-numbers");
    let currentPage = 1;
    let itemsPerPage = 9;
    let products = [];
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

    function fetchProducts() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/products", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                products = JSON.parse(xhr.responseText);
                sortProducts("sortbyname"); // Sắp xếp ban đầu theo tên sản phẩm
                updateProductDisplay(currentPage, itemsPerPage);
                createPageButtons();
            }
        };
        xhr.send();
    }

    function sortProducts(sortOption) {
        if (sortOption === "sortbyname") {
            products.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "sortbyprice") {
            products.sort((a, b) => a.price - b.price);
        }
    }


    function createPageButtons() {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        pageNumbers.innerHTML = "";
        let currentPageButton;
        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement("button");
            pageNumber.textContent = i;
            pageNumber.classList.add("page-number");
            pageNumbers.appendChild(pageNumber);

            pageNumber.addEventListener("click", function () {
                currentPage = parseInt(this.textContent);
                updateProductDisplay(currentPage, itemsPerPage);

                if (currentPageButton) {
                    currentPageButton.classList.remove("active-page-btn");
                }
                this.classList.add("active-page-btn");
                currentPageButton = this;
            });

            if (i === 1) {
                pageNumber.classList.add("active-page-btn");
                currentPageButton = pageNumber;
            }
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
    }
    function updateProductDisplay(currentPage, itemsPerPage) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        gallery.innerHTML = "";

        for (let i = startIndex; i < endIndex && i < products.length; i++) {
            const product = products[i];
            const formattedPrice = product.price.toLocaleString("vi-VN").replace("₫", "");

            const divItem = document.createElement("div");
            divItem.classList.add("gallery__item");
            divItem.innerHTML = `
                <!-- Nội dung sản phẩm -->
                <div class="gallery__img">
                    <img src="${product.picture}" alt="">
                </div>
                <div class="gallery__content">
                    <div class="gallery__name">
                        ${product.name}
                    </div>
                    <div class="gallery__rating">
                        <img src="./assets/image/rating.png" alt="Rating">
                        <span class="gallery__comment"> (${product.comment} Đánh giá) </span>
                    </div>
                    <div class="gallery__description">
                        ${product.description}
                    </div>
                    <div class="gallery__price">
                        ${formattedPrice} Đ
                    </div>
                    <div class="gallery__button">
                        <button type="button" class="detail-buy btn--bg-primary" data-product-id="${product.id}">MUA NGAY</button>
                        <button type="button" class="detail-buy btn--bg-black" data-product-id="${product.id}">XEM CHI TIẾT</button>
                    </div>
                </div>
            `;

            gallery.appendChild(divItem);
            const detailButtons = document.querySelectorAll(".detail-buy");

                detailButtons.forEach((button) => {
                    button.addEventListener("click", function() {
                        const productId = this.getAttribute("data-product-id");
                        window.location.href = `detail.html?id=${productId}`
                    });
                });
        }
        
    }


    fetchProducts();

    const sortSelect = document.getElementById("sort");
    sortSelect.addEventListener("change", function () {
        const selectedSortOption = this.value;
        sortProducts(selectedSortOption);
        updateProductDisplay(currentPage, itemsPerPage);
    });
});

//Hiển thị giỏ hàng
document.addEventListener("DOMContentLoaded", function () {
    const cartDropdown = document.querySelector('.cart-dropdown__content');
    const cartList = cartDropdown.querySelector('.cart-dropdown__list');
    const totalPay = document.querySelector('.cart-dropdown__total-money');

    function calculateTotal(cartData) {
        let total = 0;
        cartData.forEach((cartItem) => {
            if(cartItem.status=="cart")
            {
                total += cartItem.quantity * cartItem.productPrice;
            }
        });

        total = total + 0.1*total;

        totalPay.textContent = total.toLocaleString('vi-VN') + ' Đ';
    
    }

    function displayCartItems(cartData) {
        cartList.innerHTML = '';
        let cartItemCount = 0;
        cartData.forEach((cartItem, index) => {
            if(cartItem.status == "cart"){
                const cartItemElement = document.createElement('li');
                cartItemCount++;
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
                        <button type="button" class="delete-btn" data-cart-id="${cartItem.id}">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            `;

            cartList.appendChild(cartItemElement);
            }
        });

        updateCartItemCount(cartItemCount);

        calculateTotal(cartData);
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach((deleteButton) => {
            deleteButton.addEventListener('click', function() {
                const cartId = this.getAttribute('data-cart-id');
                deleteCartItem(cartId);
            })
        })
    }

    function deleteCartItem(cartId) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `http://localhost:3000/carts/${cartId}`, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 204) {
                    fetchCartItems();
                } else {
                    console.error('Lỗi khi xóa mục trong giỏ hàng' + xhr.status);
                }
            }
        };

        xhr.send();
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

    function updateCartItemCount(count) {
        cartItemCount = count;
        const cartItemCountElement = document.getElementById("cart-item-product");
        cartItemCountElement.textContent = count;
    }

    fetchCartItems();

    const cartDropdownToggle = cartDropdown.querySelector('.cart-dropdown__toggle');
    cartDropdownToggle.addEventListener('click', function () {
        cartList.classList.toggle('show'); 
    });
});





