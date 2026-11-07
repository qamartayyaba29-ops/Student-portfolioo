

// Shopping Cart
let cart = [];

// Add to Cart
document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", function() {

        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = Number(this.dataset.price);

        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        alert(name + " added to cart!");
    });

});

// Update Cart
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="d-flex justify-content-between
                        align-items-center mb-3">

                <div>
                    <h6>${item.name}</h6>
                    <p class="mb-0">
                        Rs. ${item.price} x ${item.quantity}
                    </p>
                </div>

                <button class="btn btn-danger btn-sm"
                        onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cartCount.innerText = count;
    cartTotal.innerText = total.toLocaleString("en-PK");
}

// Remove Product
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}

// Checkout
document.getElementById("checkout-btn")
    .addEventListener("click", function() {

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Thank you for shopping with ShopEase!");

        cart = [];

        updateCart();

        const modal = bootstrap.Modal.getInstance(
            document.getElementById("cartModal")
        );

        modal.hide();
    });
