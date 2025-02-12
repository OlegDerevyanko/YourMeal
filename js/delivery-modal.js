document.addEventListener('DOMContentLoaded', function() {
    const deliveryModal = document.querySelector('.delivery-modal');
    const pickupInput = document.getElementById('pickup');
    const deliveryInput = document.getElementById('delivery');
    const deliveryAddressBlock = document.querySelector('.delivery-modal__address');
    const form = deliveryModal.querySelector('form'); 
    const buttonDelivery = document.querySelector('.basket-modal__open-delivery-btn');


    deliveryModal.style.cssText = `
    display: flex;
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    transition: opacity 250ms ease-in-out;
`;

const closeDelivery = event => {
    const target = event.target;

    if (target === deliveryModal ||        
        target.closest('.delivery-modal__close-btn') ||
        event.code === 'Escape') {
            deliveryModal.style.opacity = 0;  

        setTimeout(() => {
            deliveryModal.style.visibility = 'hidden'; 
        }, 250);

        window.removeEventListener('keydown', closeDelivery);
    }
}

const openDelivery = () => {
    deliveryModal.style.visibility = 'visible';
    deliveryModal.style.opacity = 1;
    window.addEventListener('keydown', closeDelivery)
};

buttonDelivery.addEventListener('click', openDelivery);
deliveryModal.addEventListener('click', closeDelivery);


    // Функция для переключения видимости блока адреса доставки
    function toggleDeliveryAddressVisibility() {
        if (deliveryInput.checked) {
            deliveryAddressBlock.style.display = 'block';
        } else {
            deliveryAddressBlock.style.display = 'none';
        }
    }

    // Инициализация видимости при загрузке страницы
    toggleDeliveryAddressVisibility();

    // Обработчики событий для переключения видимости при изменении выбора
    pickupInput.addEventListener('change', toggleDeliveryAddressVisibility);
    deliveryInput.addEventListener('change', toggleDeliveryAddressVisibility);

    // Обработчик отправки формы
    deliveryModal.querySelector('.delivery-modal__submit-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        // Сбор данных формы
        const formData = {
            name: deliveryModal.querySelector('.delivery-modal__input-name').value,
            phone: deliveryModal.querySelector('.delivery-modal__input-tel').value,
            deliveryType: deliveryModal.querySelector('input[name="delivery"]:checked').value,
            address: deliveryInput.checked ? {
                street: deliveryModal.querySelector('.delivery-modal__input-address[placeholder="Вулиця"]').value,
                house: deliveryModal.querySelector('.delivery-modal__input-address[placeholder="№ Будинку"]').value,
                apartment: deliveryModal.querySelector('.delivery-modal__input-address[placeholder="Квартира"]').value
            } : null
        };

        // Здесь можно добавить код для отправки данных на сервер
        console.log(formData); // Для демонстрации выводим данные в консоль

        // Очистка формы после отправки
        deliveryModal.querySelector('form').reset();
        toggleDeliveryAddressVisibility(); // Сброс видимости адреса доставки
    });
});