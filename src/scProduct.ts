// close and open sidebar 
class Sidebar {
    sideBar : HTMLElement | null;
    staus : boolean;

    constructor(status : boolean, sideBar : HTMLElement | null) {
        this.sideBar = sideBar;
        this.staus = status;
    }

    open(): void {
        if(this.staus == false && this.sideBar) {
            this.sideBar.style.left = `0`;
            this.staus = true;
        }
    
    }

    close(): void {
        if(this.staus == true && this.sideBar) {
            this.sideBar.style.left = `-50%`;
            this.staus = false;
        }
    }
}


//product class
type strNull = string | null
class Product {
    productName : strNull;
    category : strNull;
    price : strNull;
    image : strNull;
    constructor(prductName : strNull, category : strNull, price : strNull, image : strNull) {
        this.productName = prductName;
        this.category = category;
        this.price = price;
        this.image = image;
    }
}


//upload image 
class MyImage {
    static uploadImg (imgInput : HTMLElement | null,
                      element : HTMLElement | null)
                       {
                        imgInput?.addEventListener('change',
                                                    function(e) {
                                                            const reader = new FileReader();
                                                            reader.addEventListener('load', ()=> {
                                                                let uplodImg : string | ArrayBuffer | null = reader.result;
                                                                if (element && element.style) {
                                                                        element.innerHTML = `<img src = "${uplodImg}" class = new-img>`;
                                                                }
                                                    })
                            const files = (e.target as HTMLInputElement).files;
                            if (files) {
                            reader.readAsDataURL(files[0]);
                        }
                        })
    }


    static removeImageFrom(element : HTMLElement | null) {
                    if (element && element.style) {
                        element.innerHTML = ``;
                    }
    }
}

//display products class

class DisplayProducts {
    static addProductInPage (element : HTMLElement | null, 
                             prName : strNull, 
                             price : strNull, 
                             image :string | undefined | null, 
                             category: strNull): void {

                        if(element && image) {
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
    static selectedButton (value : strNull) {
                    let buttons = document.querySelectorAll<HTMLElement>('.button-value')
                    if(buttons) {
                        buttons.forEach((btn)=> {
                                    if(value?.toUpperCase() == btn?.innerText.toLocaleUpperCase()) {
                                        btn?.classList.add('active');
                                    }else {
                                        btn?.classList.remove('active')
                                    }
                        })
                    }
                    this.filter(value);
    }


    static filter (value : strNull) {
                    let cards = document.querySelectorAll<HTMLElement>('.card');

                    cards.forEach((card) => {
                                    if(value == "All") {
                                        card.classList.remove('hide');
                                    }else {
                                        if(value && card.classList.contains(value)) {
                                            card.classList.remove('hide');
                                        }else {
                                            card.classList.add('hide');
                                        }
                                    }
                    })
    }


    static search(search : strNull, card : HTMLElement[], elements : HTMLElement[]) {
                    elements.forEach((el, i) => {
                                    if(search && el.innerText.includes(search.toUpperCase())) {
                                        card[i].classList.remove('hide')
                                    }else {
                                        card[i].classList.add('hide');
                                    }
                                    if(search === "") {
                                        card.forEach((elcard)=> {
                                            elcard.classList.remove('.hide')
                                        })
                                    }
                    })
    }
}


//localstorage class
class LocalStorageCntr {
            static setProduct (product : objProduct[]) {
                window.localStorage.setItem('Product', JSON.stringify(product));
            }

            static getProducts (): objProduct[] | void {
                let getPrd = window.localStorage.getItem('Product');
                if(getPrd) return JSON.parse(getPrd);
            }
            
            static addInPage (element : HTMLElement | null) {
                let allProducts = this.getProducts();
                console.log(allProducts);
                if(allProducts) {
                    allProducts.forEach((el)=> {
                        DisplayProducts.addProductInPage(element,
                                                        el.productName,
                                                        el.price, 
                                                        el.image,
                                                        el.category)
                    })
                    
                }
            }
}


//sidebar control
const sidebarElement = document.querySelector<HTMLElement>('.side-bar');
const openSideBarButton = document.querySelector<HTMLElement>('.open-sidebar');
const closeSideBarButton = document.querySelector<HTMLElement>('.close-sidebar');



const sidebar = new Sidebar(false, sidebarElement);

closeSideBarButton?.addEventListener('click', ((e)=> {
    sidebar.close();
}))

openSideBarButton?.addEventListener('click', ((e)=>{
    sidebar.open();
}));






//add new product
const form = document.querySelector('.add-prd-form');
const inptImg = document.querySelector<HTMLElement>('#image-file');
const displayImg = document.querySelector<HTMLElement>('.display-image');

type objProduct = {
    productName : strNull;
    category : strNull;
    price : strNull;
    image : strNull;
}


//add products from localStorage

LocalStorageCntr.addInPage(document.querySelector('.all-products'));




form?.addEventListener('submit', ((e)=> {
                    e.preventDefault();
                    let prName : string = "";
                    let prPrice : string = "";
                    let prCtegoty : string = "";
                    let prImage : string | undefined= "";

                    const allInput = form.querySelectorAll<HTMLInputElement>('input');
                    const selectCategory = form.querySelector<HTMLSelectElement>('select');

                    if(selectCategory?.value) prCtegoty = selectCategory?.value;

                    allInput.forEach((el)=> {
                                            switch (el.id) {
                                                case "product-name":
                                                    prName = el.value.toUpperCase();
                                                case "price" :
                                                    prPrice = el.value;
                                                case "image-file" : 
                                                    prImage = displayImg?.innerHTML;
                                                default:
                                                    break;
                                            }
                                            el.value ="";
                    })

                    const myProduct = new Product(prName, prCtegoty, prPrice, prImage);
                    let allProductsData : objProduct[]  = [];
                    let allPr = LocalStorageCntr.getProducts();
                        allPr = LocalStorageCntr.getProducts();
                        if(allPr) allProductsData = allPr;
                        
                    allProductsData.push(myProduct);
                    LocalStorageCntr.setProduct(allProductsData);
                    
                    let myHtmlAllProductsEelemnt = document.querySelector<HTMLElement>('.all-products');
                    if(allPr && myHtmlAllProductsEelemnt){
                        allProductsData = allPr;
                        myHtmlAllProductsEelemnt.innerHTML = ''
                        allPr.forEach((pr)=> {
                            DisplayProducts.addProductInPage(myHtmlAllProductsEelemnt, 
                                                     pr.productName, 
                                                     pr.price, 
                                                     pr.image,
                                                     pr.category);
                        })
                    } 
                    allProductsData =[];
                    MyImage.removeImageFrom(displayImg);
}))

//search 
let inptSearch = document.querySelector<HTMLInputElement>('#search-input');
let searchBtn = document.querySelector<HTMLElement>('#search')


inptSearch?.addEventListener('keydown', ()=> {
                    let inputSearchValue = inptSearch?.value;
                    let elements = Array.from(document.querySelectorAll<HTMLElement>('.product-name'));
                    let cards = Array.from(document.querySelectorAll<HTMLElement>('.card'));

                    if(inputSearchValue) {
                        FilterProducts.search(inputSearchValue, cards, elements)
                    }
    
})


MyImage.uploadImg(inptImg, displayImg);