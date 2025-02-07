const buttonElem = document.querySelector('.basket__btn');
const modalElem = document.querySelector('.basket__modal');

modalElem.style.cssText = `
    display: flex;
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    transition: opacity 1000ms ease-in-out;
`;

const closeModal = event => {
    const target = event.target;

    if (target === modalElem ||        
        target.closest('.modal__end-close') ||
        event.code === 'Escape') {
        modalElem.style.opacity = 0;  

        setTimeout(() => {
            modalElem.style.visibility = 'hidden'; 
        }, 1000);

        window.removeEventListener('keydown', closeModal);
    }
}

const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    // Отключение прокрутки страницы при открытом модальном окне
    // document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeModal)
};

buttonElem.addEventListener('click', openModal);
modalElem.addEventListener('click', closeModal);




