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



        const similarList = document.getElementById('similar-list');

        function getDataForSimilar() {
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
                            <div class="similar__item">
                                    <div class="similar__img">
                                        <img src="${result.picture}" alt="">
                                    </div>
                                    <div class="similar__content">
                                        <div class="similar__price">
                                            ${formattedPrice} Đ
                                        </div>
                                        <div class="similar__name">
                                            ${result.name}
                                        </div>
                                        <div class="similar__rating">
                                            <img src="./assets/image/rating.png" alt="">
                                            <span>(${result.comment} Đánh giá)</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        similarList.appendChild(liItem);
                    });
        
                    initializeSimilarList();
                }
            };
        
            xhr.send();
        }
        
        function initializeSimilarList() {
            const productList = document.getElementById("similar-list");
            const products = Array.from(productList.getElementsByTagName("li"));
            const prevButton = document.getElementById("prev-similar-button");
            const nextButton = document.getElementById("next-similar-button");
            let currentIndex = 0;
        
            const showProducts = (startIndex) => {
                for (let i = 0; i < products.length; i++) {
                    products[i].classList.add("hidden");
                }
                for (let i = startIndex; i < startIndex + 3; i++) {
                    const productIndex = i % products.length;
                    products[productIndex].classList.remove("hidden");
                }
            };
        
            const showNextProducts = () => {
                currentIndex = (currentIndex + 3) % products.length;
                showProducts(currentIndex);
            };
        
            const showPrevProducts = () => {
                currentIndex = (currentIndex - 3 + products.length) % products.length;
                showProducts(currentIndex);
            };
        
            prevButton.addEventListener("click", showPrevProducts);
            nextButton.addEventListener("click", showNextProducts);
        
            showProducts(currentIndex);
        }
        
        getDataForSimilar();


document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/products/${productId}`, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            const formattedPrice = data.price.toLocaleString('vi-VN').replace('₫', '');

            const detailTitle = document.querySelector(".detail-title-name");
            detailTitle.textContent = `${data.name}`;
            
            const detailName = document.querySelector(".detail__name");
            detailName.textContent = `${data.name}`;

            const detailComment = document.querySelector(".detail__comment-text");
            detailComment.textContent = `(${data.comment} Đánh giá )`;

            const detailPrice = document.querySelector(".detail__price");
            detailPrice.textContent = `GNY: ${formattedPrice} Đ`;

            const previewText = document.querySelector(".preview__text");
            previewText.textContent = `${data.description}`;

            const sizeSelection = document.getElementById("size");
            data.size.forEach((size) => {
                const option = document.createElement("option");
                option.value = color;
                option.textContent = size;

                sizeSelection.appendChild(option);
            });

            const colorSelection = document.getElementById("color");
            data.color.forEach((color) => {
                const option = document.createElement("option");
                option.value = color;
                option.textContent = color.charAt(0).toUpperCase() + color.slice(1);

                colorSelection.appendChild(option);
            });

            const detailInforText = document.getElementById("productInfor");
            detailInforText.textContent = `${data.description}`;

            const productComment = document.getElementById("productComments");
            productComment.textContent = `${data.rate}`;

            const productTag = document.getElementById("productTags");
            productTag.textContent = `${data.category}, ${data.color}, ${data.size}`;

            const image = document.querySelector(".detail__main-img");
            image.innerHTML = `<img src="${data.picture}" alt="">`;
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error("Lỗi khi gọi API: " + xhr.status);
        }
    };

    xhr.send();

})

function showComments () {
    document.getElementById("productInfor").classList.add("hidden");
    document.getElementById("productTags").classList.add("hidden");
    document.getElementById("productComments").classList.remove("hidden");

    document.querySelector(".detail__infor-title .detail__full").classList.remove("detail-active-btn");
    document.querySelector(".detail__infor-title .detail__tag").classList.remove("detail-active-btn");
    document.querySelector(".detail__infor-title .detail__cmt").classList.add("detail-active-btn");
}

function showTags() {
    document.getElementById("productComments").classList.add("hidden");
    document.getElementById("productInfor").classList.add("hidden");
    document.getElementById("productTags").classList.remove("hidden");
    document.querySelector(".detail__infor-title .detail__full").classList.remove("detail-active-btn");
    document.querySelector(".detail__infor-title .detail__cmt").classList.remove("detail-active-btn");
    document.querySelector(".detail__infor-title .detail__tag").classList.add("detail-active-btn");
}

function showInfor() {
    document.getElementById("productComments").classList.add("hidden");
    document.getElementById("productTags").classList.add("hidden");
    document.getElementById("productInfo").classList.remove("hidden");

    document.querySelector(".detail__infor-title .detail__full").classList.remove("detail-active-btn");
    document.querySelector(".detail__infor-title .detail__cmt").classList.remove("detail-active-btn");
    document.querySelector(".detail__infor-title .detail__tag").classList.add("detail-active-btn");
}


document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    
    const buyNowButton = document.getElementById("buynow");
    buyNowButton.addEventListener("click", function () {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:3000/products/${productId}`, true);

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    const productInfor = JSON.parse(xhr.responseText);

                    const productPicture = productInfor.picture;
                    const productName = productInfor.name;
                    const productDescription = productInfor.description;
                    const productPrice = productInfor.price;
                    const quantity = document.getElementById("quantity").value;
                    const color = document.getElementById("color").value;
                    const size = document.getElementById("size").value;

                    const productToAdd = {
                        productId: productId,
                        quantity: quantity,
                        productPicture: productPicture,
                        productName: productName,
                        productPrice: productPrice,
                        productDescription: productDescription
                    };

                    const postXHR = new XMLHttpRequest();
                    postXHR.open('POST', 'http://localhost:3000/carts', true);
                    postXHR.setRequestHeader('Content-Type', 'application/json');

                    postXHR.onreadystatechange = function () {
                        if (postXHR.readyState === 4) {
                            if (postXHR.status === 201) {
                                console.log('San pham da duoc them vao gio hang');

                                window.location.href = "cart.html";
                            } else {
                                console.error('Loi khi them san pham vao gio hang' + postXHR.status);
                            }
                        }
                    };

                    postXHR.send(JSON.stringify(productToAdd));
                } else {
                    console.error('Loi khi lay thong tin san pham' + xhr.status);
                }
            }
        };
        xhr.send();
    });
});

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






