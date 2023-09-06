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

const decreaseButton = document.getElementById("decrease");
        const increaseButton = document.getElementById("increase");
        const quantityInput = document.getElementById("quantity");

        decreaseButton.addEventListener("click", () => {
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;
            }
        });

        increaseButton.addEventListener("click", () => {
            let currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;
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

            const detailInforText = document.querySelector(".detail__infor-text");
            detailInforText.textContent = `${data.description}`;

            const image = document.querySelector(".detail__main-img");
            image.innerHTML = `<img src="${data.picture}" alt="">`;
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error("Lỗi khi gọi API: " + xhr.status);
        }
    };

    xhr.send();

})



