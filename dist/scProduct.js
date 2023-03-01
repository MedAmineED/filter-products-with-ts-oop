"use strict";
// close and open sidebar 
class Sidebar {
    constructor(status, sideBar) {
        this.sideBar = sideBar;
        this.staus = status;
    }
    open() {
        if (this.staus == false && this.sideBar) {
            this.sideBar.style.left = `0`;
            this.staus = true;
        }
    }
    close() {
        if (this.staus == true && this.sideBar) {
            this.sideBar.style.left = `-50%`;
            this.staus = false;
        }
    }
}
class Product {
    constructor(prductName, category, price, image) {
        this.productName = prductName;
        this.category = category;
        this.price = price;
        this.image = image;
    }
}
//upload image 
class MyImage {
    static uploadImg(imgInput, element) {
        imgInput === null || imgInput === void 0 ? void 0 : imgInput.addEventListener('change', function (e) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                let uplodImg = reader.result;
                if (element && element.style) {
                    element.innerHTML = `<img src = "${uplodImg}" class = new-img>`;
                }
            });
            const files = e.target.files;
            if (files) {
                reader.readAsDataURL(files[0]);
            }
        });
    }
    static removeImageFrom(element) {
        if (element && element.style) {
            element.innerHTML = ``;
        }
    }
}
//display products class
class DisplayProducts {
    static addProductInPage(element, prName, price, image, category) {
        if (element && image) {
            element.innerHTML = `<div class="card ${category}">
                                                        <div class="img-card">
                                                            ${image}
                                                        </div>
                                                        <div class="product-info">
                                                            <p class="product-name">${prName}</p>
                                                            <p>${price} $</p>
                                                        </div>
                                                </div>` + element.innerHTML;
        }
    }
}
//filter products 
class FilterProducts {
    static selectedButton(value) {
        let buttons = document.querySelectorAll('.button-value');
        if (buttons) {
            buttons.forEach((btn) => {
                if ((value === null || value === void 0 ? void 0 : value.toUpperCase()) == (btn === null || btn === void 0 ? void 0 : btn.innerText.toLocaleUpperCase())) {
                    btn === null || btn === void 0 ? void 0 : btn.classList.add('active');
                }
                else {
                    btn === null || btn === void 0 ? void 0 : btn.classList.remove('active');
                }
            });
        }
        this.filter(value);
    }
    static filter(value) {
        let cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            if (value == "All") {
                card.classList.remove('hide');
            }
            else {
                if (value && card.classList.contains(value)) {
                    card.classList.remove('hide');
                }
                else {
                    card.classList.add('hide');
                }
            }
        });
    }
    static search(search, card, elements) {
        elements.forEach((el, i) => {
            if (search && el.innerText.includes(search.toUpperCase())) {
                card[i].classList.remove('hide');
            }
            else {
                card[i].classList.add('hide');
            }
            if (search === "") {
                card.forEach((elcard) => {
                    elcard.classList.remove('.hide');
                });
            }
        });
    }
}
//localstorage class
class LocalStorageCntr {
    static setProduct(product) {
        window.localStorage.setItem('Product', JSON.stringify(product));
    }
    static getProducts() {
        let getPrd = window.localStorage.getItem('Product');
        if (getPrd)
            return JSON.parse(getPrd);
    }
    static addInPage(element) {
        let allProducts = this.getProducts();
        console.log(allProducts);
        if (allProducts) {
            allProducts.forEach((el) => {
                DisplayProducts.addProductInPage(element, el.productName, el.price, el.image, el.category);
            });
        }
    }
}
//sidebar control
const sidebarElement = document.querySelector('.side-bar');
const openSideBarButton = document.querySelector('.open-sidebar');
const closeSideBarButton = document.querySelector('.close-sidebar');
const sidebar = new Sidebar(false, sidebarElement);
closeSideBarButton === null || closeSideBarButton === void 0 ? void 0 : closeSideBarButton.addEventListener('click', ((e) => {
    sidebar.close();
}));
openSideBarButton === null || openSideBarButton === void 0 ? void 0 : openSideBarButton.addEventListener('click', ((e) => {
    sidebar.open();
}));
//add new product
const form = document.querySelector('.add-prd-form');
const inptImg = document.querySelector('#image-file');
const displayImg = document.querySelector('.display-image');
//add products from localStorage
LocalStorageCntr.addInPage(document.querySelector('.all-products'));
form === null || form === void 0 ? void 0 : form.addEventListener('submit', ((e) => {
    e.preventDefault();
    let prName = "";
    let prPrice = "";
    let prCtegoty = "";
    let prImage = "";
    const allInput = form.querySelectorAll('input');
    const selectCategory = form.querySelector('select');
    if (selectCategory === null || selectCategory === void 0 ? void 0 : selectCategory.value)
        prCtegoty = selectCategory === null || selectCategory === void 0 ? void 0 : selectCategory.value;
    allInput.forEach((el) => {
        switch (el.id) {
            case "product-name":
                prName = el.value.toUpperCase();
            case "price":
                prPrice = el.value;
            case "image-file":
                prImage = displayImg === null || displayImg === void 0 ? void 0 : displayImg.innerHTML;
            default:
                break;
        }
        el.value = "";
    });
    const myProduct = new Product(prName, prCtegoty, prPrice, prImage);
    let allProductsData = [];
    let allPr = LocalStorageCntr.getProducts();
    allPr = LocalStorageCntr.getProducts();
    if (allPr)
        allProductsData = allPr;
    allProductsData.push(myProduct);
    LocalStorageCntr.setProduct(allProductsData);
    let myHtmlAllProductsEelemnt = document.querySelector('.all-products');
    if (allPr && myHtmlAllProductsEelemnt) {
        allProductsData = allPr;
        myHtmlAllProductsEelemnt.innerHTML = '';
        allPr.forEach((pr) => {
            DisplayProducts.addProductInPage(myHtmlAllProductsEelemnt, pr.productName, pr.price, pr.image, pr.category);
        });
    }
    allProductsData = [];
    MyImage.removeImageFrom(displayImg);
}));
//search 
let inptSearch = document.querySelector('#search-input');
let searchBtn = document.querySelector('#search');
inptSearch === null || inptSearch === void 0 ? void 0 : inptSearch.addEventListener('keydown', () => {
    let inputSearchValue = inptSearch === null || inptSearch === void 0 ? void 0 : inptSearch.value;
    let elements = Array.from(document.querySelectorAll('.product-name'));
    let cards = Array.from(document.querySelectorAll('.card'));
    if (inputSearchValue) {
        FilterProducts.search(inputSearchValue, cards, elements);
    }
});
MyImage.uploadImg(inptImg, displayImg);
