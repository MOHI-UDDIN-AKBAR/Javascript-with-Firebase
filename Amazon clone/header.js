function getTotalItemsFromFirebase() {
    db.collection("cart-items").onSnapshot(snapshot => {
        let totalItem = 0
        //using onSnapshot for real time
        snapshot.forEach(doc => {
            totalItem += doc.data().quantity
        })
        // console.log(totalItem)
        addTotalItemsOnCartIcon(totalItem)
    })
}

function addTotalItemsOnCartIcon(totalItem) {
    // console.log(totalItem)
    const cartIcon = document.querySelector(".heart-cart-bell-icon #count")
    cartIcon.innerText = `${totalItem}`
}
getTotalItemsFromFirebase()