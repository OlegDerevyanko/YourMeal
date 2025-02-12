const buttonElem = document.querySelector('.basket__btn');
const modalElem = document.querySelector('.basket-modal');

modalElem.style.cssText = `
    display: flex;
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    transition: opacity 250ms ease-in-out;    
`;

const closeModal = event => {
    const target = event.target;

    if (target === modalElem ||        
        target.closest('.basket-modal__end-close') ||
        event.code === 'Escape') {
        modalElem.style.opacity = 0; 

        setTimeout(() => {
            modalElem.style.visibility = 'hidden'; 
        }, 250);

        window.removeEventListener('keydown', closeModal);
    }
}

const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;    
    window.addEventListener('keydown', closeModal)
};

buttonElem.addEventListener('click', openModal);
modalElem.addEventListener('click', closeModal);


