const burgerOpenModal = document.querySelector('.food__burger-addbtn');
const burgerModal = document.querySelector('.food__burger-modal');

burgerModal.style.cssText = `
    display: flex;
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    transition: opacity 250ms ease-in-out;    
`;

const closeBurgerModal = event => {
    const target = event.target;

    if (target === burgerModal ||        
        target.closest('.food__burger-modal-close-btn') ||
        event.code === 'Escape') {
            burgerModal.style.opacity = 0; 
        
        setTimeout(() => {
            burgerModal.style.visibility = 'hidden'; 
        }, 250);

        window.removeEventListener('keydown', closeBurgerModal);
    }
}

const openBurgerModal = () => {
    burgerModal.style.visibility = 'visible';
    burgerModal.style.opacity = 1;    
    window.addEventListener('keydown', closeBurgerModal)
};


burgerOpenModal.addEventListener('click', openBurgerModal);
burgerModal.addEventListener('click', closeBurgerModal);