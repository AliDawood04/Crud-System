var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchInput= document.getElementById("searchInput")
var addBtn=document.getElementById('addBtn')
var updateBtn=document.getElementById('updateBtn')
var productsContainer ;
var updateIndex ;

if(localStorage.getItem('products') == null){
    productsContainer = []
}else{
    productsContainer = JSON.parse( localStorage.getItem('products') ) ;
    displayProducts()
}

function addProduct(){
    if(productNameInput.value == "" || productPriceInput.value == ""){
    alert("Please fill in all required fields");
    return;
}
var product={
    code:productNameInput.value,
    price:productPriceInput.value,
    category:productCategoryInput.value,
    description:productDescriptionInput.value,
    image:`images/${productImageInput.files[0]?.name}`
}
productsContainer.push(product);
clearForm();
displayProducts();
localStorage.setItem( "products" , JSON.stringify(productsContainer))
}


function clearForm(){
    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
    productImageInput.value = null;
}

function displayProducts(){
    var cartona=``
    for (var i = 0; i < productsContainer.length; i++) {
        cartona +=`<div class="col-md-2 col-sm-6">
                <div class="product ">
                    <img src="${productsContainer[i].image}" class="w-100" alt="product name">
                    <h2 class="h4">${productsContainer[i].code}</h2>
                    <p class="text-secondary mb-2">${productsContainer[i].description}</p>
                    <h3 class="h5"><span class="fw-bolder">Price :</span> ${productsContainer[i].price} </h3>
                    <h3 class="h5"><span class="fw-bolder">Category :</span> ${productsContainer[i].category} </h3>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete</button>
                    <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update</button>
                </div>
        </div>`    
    }
document.getElementById('rowData').innerHTML = cartona;
}

function deleteProduct(trashIndex){
    productsContainer.splice(trashIndex,1)
    displayProducts()
    localStorage.setItem( "products" , JSON.stringify(productsContainer))

}

function searchProducts(term){
    var term = searchInput.value;
    var cartona=``;
    for(var i=0;i<productsContainer.length;i++){
        if(productsContainer[i].code.toLowerCase().includes(term.toLowerCase()) == true){
                cartona +=`<div class="col-md-2 col-sm-6">
                <div class="product">
                    <img src="${productsContainer[i].image}" class="w-100" alt="product name">
                    <h2 class="h4">${productsContainer[i].code}</h2>
                    <p class="text-secondary mb-2">${productsContainer[i].description}</p>
                    <h3 class="h5"><span class="fw-bolder">Price :</span> ${productsContainer[i].price} </h3>
                    <h3 class="h5"><span class="fw-bolder">Category :</span> ${productsContainer[i].category} </h3>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete</button>
                    <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update</button>
                </div>
        </div>` 
        }
    }
    document.getElementById(`rowData`).innerHTML=cartona; 
}

function setFormForUpdate(i){
    updateIndex = i;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    productNameInput.value=productsContainer[i].code;
    productPriceInput.value=productsContainer[i].price;
    productCategoryInput.value=productsContainer[i].category;
    productDescriptionInput.value=productsContainer[i].description;

}

function updateProduct(){
    if(productNameInput.value == "" || productPriceInput.value==""){
        alert('pleas go fill the data')
        return;
    }
    
    productsContainer[updateIndex].code =productNameInput.value;
    productsContainer[updateIndex].price =productPriceInput.value;
    productsContainer[updateIndex].description=productDescriptionInput.value;
    productsContainer[updateIndex].category=productCategoryInput.value;
    displayProducts();
    localStorage.setItem( "products" , JSON.stringify(productsContainer))
    clearForm()
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}
