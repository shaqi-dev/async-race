"use strict"

import disableClickEvent from "../../scripts/disableClickEvent.js";
import handleOpenHamburger from "../../scripts/handleOpenHamburger.js";
import PetsService from "../../pets-service.js";
import modal from "../../scripts/modal.js";

const navigationItems = document.querySelectorAll('.navigation__item');

// disableClickEvent(navigationItems[2]);
// disableClickEvent(navigationItems[3]);

handleOpenHamburger('.header .wrapper .logo', '.hamburger','.hamburger__button');

const petsService = new PetsService(),
      pets = await petsService.getAllPets(),
      petCards = pets.map(pet => petsService.createPetCard(pet));

const cardsWrapper = document.querySelector('.our-friends__cards');

petCards.forEach(card => {
    cardsWrapper.append(card)
});

modal('.pet-modal', '.pet-modal__overlay', '.wrapper_modal', '.pet-modal__close-button', '.our-friends__cards', pets);

