//getting data from firebase

function getItems() {
    db.collection("items").get().then((querySnapshot) => {
        let items = []
        querySnapshot.forEach(doc => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                brand: doc.data().brand,
                price: doc.data().price,
                rating: doc.data().rating
            })
        })
        // console.log(items)
        getItemsForDisplay(items)
    })
}

function setItemForCreateCollection(item) {
    // console.log(item)
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
        .then(doc => {
            if (doc.exists) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            } else {
                cartItem.set({
                    image: item.image,
                    name: item.name,
                    brand: item.brand,
                    price: item.price,
                    rating: item.rating,
                    quantity: 1
                })
            }
        })

}







function getItemsForDisplay(items) {
    // console.log(items)
    items.forEach(item => {
        let mainSection = document.createElement("div");
        mainSection.classList.add("product-details")
        mainSection.innerHTML = `
        <div class="product-picture">
            <img src="${item.image}"
                alt="${item.name}">
        </div>
        <div class="product-name">
        ${item.name}
        </div>
        <div class="product-brand">
        ${item.brand}
        </div>
        <div class="product-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <span>${item.rating}</span>
        </div>
        <div class="product-price">
        ${numeral(item.price).format('$0,0.00')}
        </div>
        `
        const getLocationForAppend = document.querySelector(".main-section-product");
        const addCart = document.createElement("div")
        addCart.classList.add("add-cart")
        addCart.innerText = `Add cart`
        addCart.addEventListener("click", () => {
            setItemForCreateCollection(item)
        })
        mainSection.appendChild(addCart)
        getLocationForAppend.appendChild(mainSection)
    })
}


getItems()