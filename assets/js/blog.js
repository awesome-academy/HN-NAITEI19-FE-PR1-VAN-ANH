var currentPage = 1;
var itemsPerPage = 4;

var products = document.querySelectorAll(".blog__item");

var totalPages = Math.ceil(products.length / itemsPerPage);

var pageNumbers = document.getElementById("page-numbers");

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

document.getElementById("previous-blog-button").addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        updateProductDisplay(currentPage, itemsPerPage);
    }
});

document.getElementById("next-blog-button").addEventListener("click", function () {
    if (currentPage < totalPages) {
        currentPage++;
        updateProductDisplay(currentPage, itemsPerPage);
    }
});

function updateProductDisplay(currentPage, itemsPerPage) {
    for (var i = 0; i < products.length; i++) {
        if (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) {
            products[i].style.display = "block";
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


