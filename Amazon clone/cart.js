function getItemsFromCartCollection() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let items = []
        snapshot.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            })
        })
        displayItemOnCartSection(items)
        // console.log(items)
    })
}

function decreaseItem(itemId) {
    console.log(itemId);
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get()
        .then(doc => {
            if (doc.exists) {
                if (doc.data().quantity > 1) {
                    cartItem.update({
                        quantity: doc.data().quantity - 1
                    })
                }
            }
        })
}

function increaseItem(itemId) {
    console.log(itemId);
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get()
        .then(doc => {
            if (doc.exists) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        })
}

function deleteItem(itemId) {
    console.log(itemId);
    db.collection("cart-items").doc(itemId).delete();
}



function getTotalCost() {
    // let cartItem = db.collection("cart-items").get();
    let cartItem = db.collection("cart-items");
    cartItem.onSnapshot(snapshot => {
        let totalCost = 0
        snapshot.forEach(doc => {
            totalCost += (doc.data().price * doc.data().quantity)
        })
        // console.log(totalCost)
        displayTotalCost(totalCost)
    })
}



function displayTotalCost(totalCost) {
    let finalPart = document.querySelector(".final-part")
    finalPart.innerHTML = ` 
     <div class="total-cost">
        <span>Total Cost</span>
        <span>${ numeral(totalCost).format('$0,0.00')}</span>
     </div>
     <button title="order">Complete Order</button> 
 `
}




getTotalCost()










function displayItemOnCartSection(cartItems) {
    let mainCartSection = ""
    cartItems.forEach(cartItem => {
        // console.log(cartItem.quantity)

        mainCartSection += `
        <div class="selected-product">
<div class="selected-product-short-info">
    <img src="${cartItem.image}"
        alt="${cartItem.name}">
    <div class="Name-Brand">
        <span>${cartItem.name}</span>
        <span>${cartItem.brand}</span>
    </div>
</div>

<div class="amount">
    <span class="increase" data-id="${cartItem.id}"><i class="fas fa-angle-left"></i></span>
    <span id="count">${cartItem.quantity}</span>
    <i data-id="${cartItem.id}" class="fas fa-angle-right"></i>
</div>
<div class="cost">
    <span>${ numeral(cartItem.price*(cartItem.quantity)).format('$0,0.00')}</span>
    <span> <button class="deleteItem" data-id="${cartItem.id}" title="cancel" ><i class="fas fa-times"></i></button> </span>
</div>
</div>
`
    })
    const LocationForAppendCartSection = document.getElementById("main-cart-section")
    LocationForAppendCartSection.innerHTML = mainCartSection
    workWithEventListenerForAction()
}

function workWithEventListenerForAction() {
    const decreaseButton = document.querySelectorAll(".amount .increase")
    const increaseButton = document.querySelectorAll(".fa-angle-right")
    const deleteButton = document.querySelectorAll(".deleteItem")
    decreaseButton.forEach(button => {
        button.addEventListener("click", () => {

            decreaseItem(button.dataset.id)
        })
    })
    increaseButton.forEach(button => {
        button.addEventListener("click", () => {

            increaseItem(button.dataset.id)
        })
    })
    deleteButton.forEach(button => {
        button.addEventListener("click", () => {
            deleteItem(button.dataset.id)
        })
    })
}




getItemsFromCartCollection()