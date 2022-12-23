// @ts-check

/**
 * @typedef {Object} MenuItemData
 * @property {string} name
 * @property {number} price
 * @property {string} image
 * @property {string} alt
 * @property {number} count
 */

class Bill {
    subtotal = /** @type {HTMLDivElement} */ (
        document.getElementById("subtotal")
    );
    tax = /** @type {HTMLDivElement} */ (document.getElementById("tax"));
    total = /** @type {HTMLDivElement} */ (document.getElementById("total"));
    empty = /** @type {HTMLDivElement} */ (document.getElementById("empty"));

    /**
     * @param {MenuItemData[]} items
     */
    constructor(items) {
        /** @type {MenuItemData[]} */ this.items = items;
    }

    recalculate() {
        const subtotal = this.items.reduce(
            (acc, val) => acc + val.count * val.price,
            0
        );
        const tax = subtotal * 0.0975;
        const total = subtotal + tax;

        this.subtotal.innerText = "$" + subtotal.toFixed(2);
        this.tax.innerText = "$" + tax.toFixed(2);
        this.total.innerText = "$" + total.toFixed(2);

        if (subtotal > 0) {
            this.hideEmpty();
        } else {
            this.showEmpty();
        }
    }

    hideEmpty() {
        this.empty.style.display = "none";
    }

    showEmpty() {
        this.empty.style.display = "block";
    }
}

class MenuItem {
    menu = /** @type {HTMLUListElement} */ (document.getElementById("menu"));
    cart = /** @type {HTMLUListElement} */ (document.getElementById("cart"));
    /** @type {HTMLButtonElement | null} */ cartButton = null;
    /** @type {HTMLLIElement | null} */ cartListItem = null;
    /** @type {HTMLDivElement | null} */ quantity1 = null;
    /** @type {HTMLDivElement | null} */ quantity2 = null;
    /** @type {HTMLDivElement | null} */ subtotal = null;

    /**
     * @param {MenuItemData} data
     * @param {Bill} bill
     */
    constructor(data, bill) {
        /** @type {MenuItemData} */ this.data = data;
        /** @type {Bill} */ this.bill = bill;
        this.menu.appendChild(this.createPlateListItem());
    }

    /**
     * @returns {HTMLLIElement}
     */
    createPlateListItem() {
        // li
        const li = document.createElement("li");

        // div.plate
        const plate = document.createElement("div");
        plate.classList.add("plate");
        li.appendChild(plate);

        // img.plate
        const image = document.createElement("img");
        image.classList.add("plate");
        image.src = "images/" + this.data.image;
        image.alt = this.data.alt;
        plate.appendChild(image);

        // div.content
        const content = document.createElement("div");
        content.classList.add("content");
        this.menuContent = content;
        li.appendChild(content);

        // p.menu-item
        const menuItem = document.createElement("p");
        menuItem.classList.add("menu-item");
        menuItem.textContent = this.data.name;
        content.appendChild(menuItem);

        // p.price
        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = "$" + this.data.price;
        content.appendChild(price);

        // button.add
        const button = document.createElement("button");
        this.addToCartButton = button;
        content.appendChild(button);
        this.fillAddToCartButtonContent();
        button.addEventListener("click", this.addToCart);

        return li;
    }

    fillAddToCartButtonContent() {
        if (this.addToCartButton) {
            this.addToCartButton.classList.remove("in-cart");
            this.addToCartButton.classList.add("add");
            this.addToCartButton.replaceChildren(
                document.createTextNode("Add to Cart")
            );
        }
    }

    fillInCartButtonContent() {
        if (this.addToCartButton) {
            this.addToCartButton.classList.remove("add");
            this.addToCartButton.classList.add("in-cart");

            // img check
            const image = document.createElement("img");
            image.src = "images/check.svg";
            image.width = 22;
            image.height = 17;
            image.alt = "Check";

            this.addToCartButton.replaceChildren(
                image,
                document.createTextNode("In Cart")
            );
        }
    }

    /**
     * @returns {HTMLLIElement}
     */
    createCartListItem() {
        // li
        const li = document.createElement("li");

        // div.plate
        const plate = document.createElement("div");
        plate.classList.add("plate");
        li.appendChild(plate);

        // img.plate
        const image = document.createElement("img");
        image.classList.add("plate");
        image.src = "images/" + this.data.image;
        image.alt = this.data.alt;
        plate.appendChild(image);

        // div.quantity
        const quantity1 = document.createElement("div");
        quantity1.classList.add("quantity");
        this.quantity1 = quantity1;
        plate.appendChild(quantity1);

        // div.content
        const content = document.createElement("div");
        content.classList.add("content");
        li.appendChild(content);

        // p.menu-item
        const menuItem = document.createElement("p");
        menuItem.classList.add("menu-item");
        menuItem.textContent = this.data.name;
        content.appendChild(menuItem);

        // p.price
        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = "$" + this.data.price;
        content.appendChild(price);

        // div.quantity__wrapper
        const quantityWrapper = document.createElement("div");
        quantityWrapper.classList.add("quantity__wrapper");
        li.appendChild(quantityWrapper);

        // button.decrease
        const decrease = document.createElement("button");
        decrease.classList.add("decrease");
        quantityWrapper.appendChild(decrease);
        decrease.addEventListener("click", this.decrease);

        // img decrease
        const imageDecrease = document.createElement("img");
        imageDecrease.src = "images/chevron.svg";
        decrease.appendChild(imageDecrease);

        // div.quantity
        const quantity2 = document.createElement("div");
        quantity2.classList.add("quantity");
        this.quantity2 = quantity2;
        quantityWrapper.appendChild(quantity2);

        // button.increase
        const increase = document.createElement("button");
        increase.classList.add("increase");
        quantityWrapper.appendChild(increase);
        increase.addEventListener("click", this.increase);

        // img increase
        const imageIncrease = document.createElement("img");
        imageIncrease.src = "images/chevron.svg";
        increase.appendChild(imageIncrease);

        // div.subtotal
        const subtotal = document.createElement("div");
        subtotal.classList.add("subtotal");
        this.subtotal = subtotal;
        li.appendChild(subtotal);

        this.updateQuantities();
        this.updateSubtotal();

        return li;
    }

    addToCart = () => {
        if (this.data.count === 0) {
            this.fillInCartButtonContent();
            this.data.count++;
            this.cartListItem = this.createCartListItem();
            this.cart.appendChild(this.cartListItem);
            this.bill.recalculate();
        }
    };

    increase = () => {
        this.data.count++;
        this.bill.recalculate();
        this.updateQuantities();
        this.updateSubtotal();
    };

    decrease = () => {
        if (this.data.count === 1) {
            this.cartListItem?.remove();
            this.fillAddToCartButtonContent();
        }

        this.data.count--;
        this.bill.recalculate();
        this.updateQuantities();
        this.updateSubtotal();
    };

    updateQuantities() {
        this.quantity1 &&
            (this.quantity1.textContent = this.data.count.toString());
        this.quantity2 &&
            (this.quantity2.textContent = this.data.count.toString());
    }

    updateSubtotal() {
        if (this.subtotal) {
            this.subtotal.textContent =
                "$" + (this.data.price * this.data.count).toFixed(2);
        }
    }
}

/** @type {MenuItemData[]} */
const menuItems = [
    {
        name: "French Fries with Ketchup",
        price: 2.23,
        image: "plate__french-fries.png",
        alt: "French Fries",
        count: 0,
    },
    {
        name: "Salmon and Vegetables",
        price: 5.12,
        image: "plate__salmon-vegetables.png",
        alt: "Salmon and Vegetables",
        count: 0,
    },
    {
        name: "Spaghetti Meat Sauce",
        price: 7.82,
        image: "plate__spaghetti-meat-sauce.png",
        alt: "Spaghetti with Meat Sauce",
        count: 0,
    },
    {
        name: "Bacon, Eggs, and Toast",
        price: 5.99,
        image: "plate__bacon-eggs.png",
        alt: "Bacon, Eggs, and Toast",
        count: 0,
    },
    {
        name: "Chicken Salad with Parmesan",
        price: 6.98,
        image: "plate__chicken-salad.png",
        alt: "Chicken Salad with Parmesan",
        count: 0,
    },
    {
        name: "Fish Sticks and Fries",
        price: 6.34,
        image: "plate__fish-sticks-fries.png",
        alt: "Fish Sticks and Fries",
        count: 0,
    },
];

const bill = new Bill(menuItems);
menuItems.forEach((item) => new MenuItem(item, bill));
