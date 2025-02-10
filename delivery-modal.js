const buttonDelivery = document.querySelector('.modal__btn');
const modalDelivery = document.querySelector('.delivery__modal');
const deliveryElem = document.querySelector('.delivery__modal-delivery');
const deliveryMenu = document.querySelector('.input__delivery');
const deliveryMenuPickup = document.querySelector('.input__pickup');
const burgerDescription = document.querySelector('.food__burger-modal');
const burgerDescriptionOpen = document.querySelector('.food__burger-btn');




deliveryElem.style.cssText = `
    display: flex;
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    transition: opacity 250ms ease-in-out;
`;

modalDelivery.style.cssText = `
    display: flex;
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    transition: opacity 250ms ease-in-out;
`;

burgerDescription.style.cssText = `
display: flex;
flex-direction: column;
visibility: hidden;
opacity: 0;
transition: opacity 250ms ease-in-out;
`;

const closeDelivery = event => {
    const target = event.target;

    if (target === modalDelivery ||        
        target.closest('.delivery__modal-close-btn') ||
        event.code === 'Escape') {
            modalDelivery.style.opacity = 0;  

        setTimeout(() => {
            modalDelivery.style.visibility = 'hidden'; 
        }, 1000);

        window.removeEventListener('keydown', closeDelivery);
    }
}

const closeDeliveryMenu = event => {
    const target = event.target;

    if (target === deliveryMenuPickup ||        
        target.closest('.input__pickup') ||
        event.code === 'Escape') {
            deliveryElem.style.opacity = 0;  

        setTimeout(() => {
            deliveryElem.style.visibility = 'hidden'; 
        }, 1000);

        window.removeEventListener('keydown', closeDeliveryMenu);
    }
}

const closeBurgerDescription = event => {
    const target = event.target;

    if (target === burgerDescription ||        
        target.closest('.food__modal-close-btn') ||
        event.code === 'Escape') {
            burgerDescription.style.opacity = 0;  

        setTimeout(() => {
            burgerDescription.style.visibility = 'hidden'; 
        }, 1000);

        window.removeEventListener('keydown', closeBurgerDescription);
    }
}

const openDelivery = () => {
    modalDelivery.style.visibility = 'visible';
    modalDelivery.style.opacity = 1;
    window.addEventListener('keydown', closeDelivery)
};

const openDeliveryMenu = () => {
    deliveryElem.style.visibility = 'visible';
    deliveryElem.style.opacity = 1;
    window.addEventListener('keydown', closeDeliveryMenu)
};

const openBurgerDescription = () => {
    burgerDescription.style.visibility = 'visible';
    burgerDescription.style.opacity = 1;
    window.addEventListener('keydown', closeBurgerDescription)
};

buttonDelivery.addEventListener('click', openDelivery);
modalDelivery.addEventListener('click', closeDelivery);
deliveryMenu.addEventListener('click', openDeliveryMenu);
deliveryMenuPickup.addEventListener('click', closeDeliveryMenu);
burgerDescriptionOpen.addEventListener('click', openBurgerDescription);
burgerDescription.addEventListener('click', closeBurgerDescription);





document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.food__burger-btn');
    const cartItemsList = document.getElementById('cart-items');
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalPriceElement = document.getElementById('total-price');
    const miniCartQuantityElement = document.getElementById('mini-cart-quantity');

    // Объект для хранения товаров в корзине
    const cart = {};

    // Функция для обновления общего количества и суммы
    function updateTotals() {
        let totalQuantity = 0;
        let totalPrice = 0;

        // Считаем общее количество и сумму
        Object.values(cart).forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.quantity * item.price;
        });

        // Обновляем элементы на странице
        totalQuantityElement.innerText = totalQuantity;
        totalPriceElement.innerText = totalPrice.toFixed(2);
        miniCartQuantityElement.innerText = totalQuantity;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('.food__burger-name').innerText;
            const productPrice = parseFloat(this.parentElement.querySelector('.food__burger-price').innerText.replace('₴', ''));
            const productImage = this.parentElement.querySelector('.food__burger-img').src;
            const productWeight = this.parentElement.querySelector('.food__burger-weight').innerText;

            // Если товар уже есть в корзине, увеличиваем количество
            if (cart[productName]) {
                cart[productName].quantity += 1;
                updateCartItem(productName);
            } else {
                // Если товара нет в корзине, добавляем его
                cart[productName] = {
                    quantity: 1,
                    price: productPrice,
                    image: productImage,
                    weight: productWeight,
                    element: createCartItem(productName, productPrice, productImage, productWeight)
                };
                cartItemsList.appendChild(cart[productName].element);
            }

            // Обновляем общее количество и сумму
            updateTotals();
        });
    });

    // Функция для создания элемента корзины
    function createCartItem(productName, productPrice, productImage, productWeight) {
        const li = document.createElement('li');

        // Контейнер для изображения и информации о товаре
        const preview = document.createElement('div');
        preview.className = 'modal__burger-preview';

        const img = document.createElement('img');
        img.className = 'modal__burger-img';
        img.src = productImage;
        img.width = 64;
        img.height = 52;
        img.alt = productName;

        const info = document.createElement('div');

        const name = document.createElement('p');
        name.className = 'modal__burger-name';
        name.innerText = productName;

        const weight = document.createElement('p');
        weight.className = 'modal__burger-weight';
        weight.innerText = productWeight;

        const cost = document.createElement('p');
        cost.className = 'modal__burger-cost';
        cost.innerText = `${productPrice}₴`;

        info.appendChild(name);
        info.appendChild(weight);
        info.appendChild(cost);

        preview.appendChild(img);
        preview.appendChild(info);

        // Контролы для изменения количества
        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';

        const decreaseButton = document.createElement('button');
        decreaseButton.className = 'quantity-controls__btn';
        decreaseButton.innerText = '-';
        decreaseButton.addEventListener('click', () => changeQuantity(productName, -1));

        const quantitySpan = document.createElement('span');
        quantitySpan.className = 'quantity-controls__quantity';
        quantitySpan.innerText = '1';

        const increaseButton = document.createElement('button');
        increaseButton.className = 'quantity-controls__btn';
        increaseButton.innerText = '+';
        increaseButton.addEventListener('click', () => changeQuantity(productName, 1));

        quantityControls.appendChild(decreaseButton);
        quantityControls.appendChild(quantitySpan);
        quantityControls.appendChild(increaseButton);

        li.appendChild(preview);
        li.appendChild(quantityControls);

        return li;
    }

    // Функция для обновления количества товара в корзине
    function updateCartItem(productName) {
        const item = cart[productName];
        const quantitySpan = item.element.querySelector('.quantity-controls span');
        quantitySpan.innerText = item.quantity;

        // Если количество стало 0, удаляем товар из корзины
        if (item.quantity === 0) {
            cartItemsList.removeChild(item.element);
            delete cart[productName];
        }

        // Обновляем общее количество и сумму
        updateTotals();
    }

    // Функция для изменения количества товара
    function changeQuantity(productName, change) {
        const item = cart[productName];
        item.quantity += change;

        // Не позволяем количеству быть меньше 0
        if (item.quantity < 0) item.quantity = 0;

        updateCartItem(productName);
    }
});