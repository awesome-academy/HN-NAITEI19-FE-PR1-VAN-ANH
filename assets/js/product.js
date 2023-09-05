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


