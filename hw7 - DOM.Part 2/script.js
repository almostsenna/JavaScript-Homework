const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1200
    },
    {
        id: 2,
        name: "Phone",
        price: 800
    },
    {
        id: 3,
        name: "Headphones",
        price: 200
    }
];

const cart = [];

const productList = document.getElementById("product-list");
const productsMessage = document.getElementById("products-message");
const searchInput = document.getElementById("search-input");
const cartList = document.getElementById("cart-list");
const cartMessage = document.getElementById("cart-message");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const emptyCartButton = document.getElementById("empty-cart-button");
const themeButton = document.getElementById("theme-button");

function renderProducts(productsToShow) {
    productList.textContent = "";
    productsMessage.hidden = productsToShow.length > 0;

    for (const product of productsToShow) {
        const card = document.createElement("article");
        card.className = "product";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "$" + product.price;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "add-to-cart";
        button.textContent = "Add to cart";
        button.dataset.productId = product.id;

        card.append(name, price, button);
        productList.append(card);
    }
}

function renderCart() {
    cartList.textContent = "";

    let totalCount = 0;
    let totalPrice = 0;

    for (const item of cart) {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("li");
        cartItem.className = "cart-item";

        const text = document.createElement("p");
        text.className = "cart-item-text";
        text.textContent = item.name + " × " + item.quantity + ": $" + item.price * item.quantity;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "remove-from-cart";
        button.textContent = "Remove";
        button.dataset.productId = item.id;
        button.setAttribute("aria-label", "Видалити " + item.name + " з кошика");

        cartItem.append(text, button);
        cartList.append(cartItem);
    }

    cartCount.textContent = totalCount;
    cartTotal.textContent = "$" + totalPrice;
    cartMessage.hidden = cart.length > 0;
    emptyCartButton.disabled = cart.length === 0;
}

function addToCart(productId) {
    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    const cartProduct = cart.find(function (item) {
        return item.id === productId;
    });

    if (cartProduct) {
        cartProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    renderCart();
}

function removeFromCart(productId) {
    const index = cart.findIndex(function (item) {
        return item.id === productId;
    });

    if (index !== -1) {
        cart.splice(index, 1);
    }

    renderCart();
}

// Один обробник для всіх кнопок додавання, зокрема після пошуку.
productList.addEventListener("click", function (event) {
    const button = event.target.closest(".add-to-cart");

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.productId);
    addToCart(productId);
});

cartList.addEventListener("click", function (event) {
    const button = event.target.closest(".remove-from-cart");

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.productId);
    removeFromCart(productId);
});

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
        return product.name.toLowerCase().includes(searchText);
    });

    renderProducts(filteredProducts);
});

emptyCartButton.addEventListener("click", function () {
    cart.length = 0;
    renderCart();
});

themeButton.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark-mode");

    if (isDark) {
        themeButton.textContent = "Light mode";
    } else {
        themeButton.textContent = "Dark mode";
    }

    themeButton.setAttribute("aria-pressed", String(isDark));
});

renderProducts(products);
renderCart();
