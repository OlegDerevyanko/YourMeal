
// document.addEventListener('DOMContentLoaded', function() {
//     const addToCartButtons = document.querySelectorAll('.food__burger-modal-addbtn');
//     const cartItemsList = document.getElementById('cart-items');
//     const totalQuantityElement = document.getElementById('total-quantity');
//     const totalPriceElement = document.getElementById('total-price');
//     const miniCartQuantityElement = document.getElementById('mini-cart-quantity');

//     // Объект для хранения товаров в корзине
//     const cart = {};

//     // Функция для обновления общего количества и суммы
//     function updateTotals() {
//         let totalQuantity = 0;
//         let totalPrice = 0;

//         // Считаем общее количество и сумму
//         Object.values(cart).forEach(item => {
//             totalQuantity += item.quantity;
//             totalPrice += item.quantity * item.price;
//         });

//         // Обновляем элементы на странице
//         totalQuantityElement.innerText = totalQuantity;
//         totalPriceElement.innerText = totalPrice.toFixed(2);
//         miniCartQuantityElement.innerText = totalQuantity;
//     }

//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const productName = document.querySelector('.food__burger-modal-title').innerText;
//             const productPrice = parseFloat(document.querySelector('.food__burger-modal-price').innerText.replace('₴', ''));
//             const productImage = document.querySelector('.food__burger-modal-img').src;
//             const productWeight = document.querySelector('.food__burger-modal-ingredients-weight').innerText;

//             // Если товар уже есть в корзине, увеличиваем количество
//             if (cart[productName]) {
//                 cart[productName].quantity += 1;
//                 updateCartItem(productName);
//             } else {
//                 // Если товара нет в корзине, добавляем его
//                 cart[productName] = {
//                     quantity: 1,
//                     price: productPrice,
//                     image: productImage,
//                     weight: productWeight,
//                     element: createCartItem(productName, productPrice, productImage, productWeight)
//                 };
//                 cartItemsList.appendChild(cart[productName].element);
//             }

//             // Обновляем общее количество и сумму
//             updateTotals();
//         });
//     });

//     // Функция для создания элемента корзины
//     function createCartItem(productName, productPrice, productImage, productWeight) {
//         const li = document.createElement('li');
//         li.className = 'basket-modal__item';

//         // Контейнер для изображения и информации о товаре
//         const preview = document.createElement('div');
//         preview.className = 'basket-modal__burger-preview';

//         const img = document.createElement('img');
//         img.className = 'basket-modal__burger-img';
//         img.src = productImage;
//         img.width = 64;
//         img.height = 52;
//         img.alt = productName;

//         const info = document.createElement('div');

//         const name = document.createElement('p');
//         name.className = 'basket-modal__burger-name';
//         name.innerText = productName;

//         const weight = document.createElement('p');
//         weight.className = 'basket-modal__burger-weight';
//         weight.innerText = productWeight;

//         const cost = document.createElement('p');
//         cost.className = 'basket-modal__burger-cost';
//         cost.innerText = `${productPrice}₴`;

//         info.appendChild(name);
//         info.appendChild(weight);
//         info.appendChild(cost);

//         preview.appendChild(img);
//         preview.appendChild(info);

//         // Контролы для изменения количества
//         const quantityControls = document.createElement('div');
//         quantityControls.className = 'quantity-controls';

//         const decreaseButton = document.createElement('button');
//         decreaseButton.className = 'quantity-controls__btn';
//         decreaseButton.innerText = '-';
//         decreaseButton.addEventListener('click', () => changeQuantity(productName, -1));

//         const quantitySpan = document.createElement('span');
//         quantitySpan.className = 'quantity-controls__quantity';
//         quantitySpan.innerText = '1';

//         const increaseButton = document.createElement('button');
//         increaseButton.className = 'quantity-controls__btn';
//         increaseButton.innerText = '+';
//         increaseButton.addEventListener('click', () => changeQuantity(productName, 1));

//         quantityControls.appendChild(decreaseButton);
//         quantityControls.appendChild(quantitySpan);
//         quantityControls.appendChild(increaseButton);

//         li.appendChild(preview);
//         li.appendChild(quantityControls);

//         return li;
//     }

//     // Функция для обновления количества товара в корзине
//     function updateCartItem(productName) {
//         const item = cart[productName];
//         const quantitySpan = item.element.querySelector('.quantity-controls span');
//         quantitySpan.innerText = item.quantity;

//         // Если количество стало 0, удаляем товар из корзины
//         if (item.quantity === 0) {
//             cartItemsList.removeChild(item.element);
//             delete cart[productName];
//         }

//         // Обновляем общее количество и сумму
//         updateTotals();
//     }

//     // Функция для изменения количества товара
//     function changeQuantity(productName, change) {
//         const item = cart[productName];
//         item.quantity += change;

//         // Не позволяем количеству быть меньше 0
//         if (item.quantity < 0) item.quantity = 0;

//         updateCartItem(productName);
//     }
// });



document.addEventListener('DOMContentLoaded', function() {
    const basketTotal = document.getElementById('mini-cart-quantity');
    const basketModalTotal = document.getElementById('total-quantity');
    const totalPriceElement = document.getElementById('total-price');
    const cartItemsList = document.getElementById('cart-items');
    const deliveryText = document.querySelector('.basket-modal__end-text');
    const addButtons = document.querySelectorAll('.food__burger-addbtn');
    const modalAddButton = document.querySelector('.food__burger-modal-addbtn');
    const modalDecreaseBtn = document.getElementById('modal-decrease-btn');
    const modalIncreaseBtn = document.getElementById('modal-increase-btn');
    const modalQuantity = document.getElementById('modal-quantity');
    const foodModal = document.getElementById('food-modal');

    let cart = [];
    let currentProduct = null;

    function updateCartDisplay() {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
        basketTotal.textContent = totalQuantity;
        basketModalTotal.textContent = totalQuantity;
        totalPriceElement.textContent = totalPrice;
    
        deliveryText.textContent = totalPrice >= 500 ? 'Безкоштовна доставка' : 'Доставка 150₴';
    
        cartItemsList.innerHTML = '';
        cart.forEach(item => {
            const li = createCartItem(item.name, item.price, item.image, item.weight, item.quantity); // Передаем текущее количество
            cartItemsList.appendChild(li);
        });
    }

    function createCartItem(productName, productPrice, productImage, productWeight, quantity) {
        const li = document.createElement('li');
        li.className = 'basket-modal__item';
    
        const preview = document.createElement('div');
        preview.className = 'basket-modal__burger-preview';
    
        const img = document.createElement('img');
        img.className = 'basket-modal__burger-img';
        img.src = productImage;
        img.width = 64;
        img.height = 52;
        img.alt = productName;
    
        const info = document.createElement('div');
    
        const name = document.createElement('p');
        name.className = 'basket-modal__burger-name';
        name.innerText = productName;
    
        const weight = document.createElement('p');
        weight.className = 'basket-modal__burger-weight';
        weight.innerText = productWeight;
    
        const cost = document.createElement('p');
        cost.className = 'basket-modal__burger-cost';
        cost.innerText = `${productPrice}₴`;
    
        info.appendChild(name);
        info.appendChild(weight);
        info.appendChild(cost);
    
        preview.appendChild(img);
        preview.appendChild(info);
    
        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls-basket';
    
        const decreaseButton = document.createElement('button');
        decreaseButton.className = 'quantity-controls-basket__btn';
        decreaseButton.innerText = '-';
        decreaseButton.addEventListener('click', () => changeQuantity(productName, -1));
    
        const quantitySpan = document.createElement('span');
        quantitySpan.className = 'quantity-controls-basket__quantity';
        quantitySpan.innerText = quantity; // Устанавливаем текущее количество товара
    
        const increaseButton = document.createElement('button');
        increaseButton.className = 'quantity-controls-basket__btn';
        increaseButton.innerText = '+';
        increaseButton.addEventListener('click', () => changeQuantity(productName, 1));
    
        quantityControls.appendChild(decreaseButton);
        quantityControls.appendChild(quantitySpan);
        quantityControls.appendChild(increaseButton);
    
        li.appendChild(preview);
        li.appendChild(quantityControls);
    
        return li;
    }

   

    function changeQuantity(productName, change) {
        const item = cart.find(item => item.name === productName);
        if (item) {
            item.quantity += change;
    
            // Если количество стало меньше или равно 0, удаляем товар из корзины
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.name !== productName);
            }
    
            // Обновляем отображение корзины
            updateCartDisplay();
        }
    }

    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = button.closest('.food__burger-item');
            currentProduct = {
                name: item.querySelector('.food__burger-name').textContent,
                price: parseInt(item.querySelector('.food__burger-price').textContent),
                image: item.querySelector('.food__burger-img').src,
                weight: item.querySelector('.food__burger-weight').textContent,
                quantity: 1
            };
            foodModal.style.display = 'block';
        });
    });

    modalAddButton.addEventListener('click', function() {
        const existingProduct = cart.find(item => item.name === currentProduct.name);
        if (existingProduct) {
            existingProduct.quantity += parseInt(modalQuantity.textContent);
        } else {
            currentProduct.quantity = parseInt(modalQuantity.textContent);
            cart.push(currentProduct);
        }
        updateCartDisplay();
        foodModal.style.display = 'none';
    });

    modalDecreaseBtn.addEventListener('click', function() {
        let quantity = parseInt(modalQuantity.textContent);
        if (quantity > 1) {
            quantity--;
            modalQuantity.textContent = quantity;
        }
    });

    modalIncreaseBtn.addEventListener('click', function() {
        let quantity = parseInt(modalQuantity.textContent);
        quantity++;
        modalQuantity.textContent = quantity;
    });

    document.querySelector('.food__burger-modal-close-btn').addEventListener('click', function() {
        foodModal.style.display = 'none';
    });
});