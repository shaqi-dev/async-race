export default function modal(modalSelector, modalOverlaySelector, modalWrapperSelector, closeButtonSelector, triggersWrapperSelector, cardsData) {
    const modal = document.querySelector(modalSelector),
          modalOverlay = document.querySelector(modalOverlaySelector),
          modalWrapper = modal.querySelector(modalWrapperSelector),
          triggersWrapper = document.querySelector(triggersWrapperSelector),
          closeButton = document.querySelector(closeButtonSelector);

    function getModalContent(petName) {
        const content = document.createElement('div');
        content.classList.add('content-wrapper');

        const petData = cardsData.filter(card => card.name === petName)[0];
        const { img, name, type, breed, description, age, inoculations, diseases, parasites } = petData
        
        content.innerHTML = `
            <div class="pet-modal__image">
                <img src=${img} alt="pet image" />
            </div>
            <div class="pet-modal__content">
                <h3 class="pet-modal__name">${name}</h3>
                <h4 class="pet-modal__type">${type} - ${breed}</h4>
                <h5 class="pet-modal__description">
                    ${description}
                </h5>
                <ul class="pet-modal__list">
                    <li class="pet-modal__list-item"><strong>Age:</strong> ${age}</li>
                    <li class="pet-modal__list-item"><strong>Inoculations:</strong> ${inoculations.join(', ')}</li>
                    <li class="pet-modal__list-item"><strong>Diseases:</strong> ${diseases.join(', ')}</li>
                    <li class="pet-modal__list-item"><strong>Parasites:</strong> ${parasites.join(', ')}</li>
                </ul>
            </div>
        `;

        return content;
    }

    function showModal(petName) {
        modalWrapper.append(getModalContent(petName));
        modal.classList.add('pet-modal_active');
        document.body.style.overflow = "hidden";
    };

    triggersWrapper.addEventListener('click', (e) => {
        if (e.target !== triggersWrapper) {
            showModal((e.target.parentNode.dataset.name || e.target.dataset.name));
        } 
    });

    function hideModal() {
        modal.classList.remove('pet-modal_active');
        document.body.style.overflow = "";
        const nodesToRemove = [...modalWrapper.childNodes].filter(node => node.nodeName === "#text" || node.className === "content-wrapper")
        nodesToRemove.forEach(node => {
            modalWrapper.removeChild(node)
        })
    };

    modal.addEventListener("click", (e) => {
        if (e.target && e.target === modalOverlay) {
            hideModal();
        }
    });

    closeButton.addEventListener('click', hideModal);

    document.addEventListener("keydown", (e) => {
        if (e.target && e.code === "Escape" && !modal.classList.contains("hide")) {
            hideModal();
        }
    });
}