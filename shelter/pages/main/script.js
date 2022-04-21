"use strict"

import disableClickEvent from "../../scripts/disableClickEvent.js";
import handleOpenHamburger from "../../scripts/handleOpenHamburger.js";
import PetsService from "../../pets-service.js";
import slider from "../../scripts/slider.js";
import modal from "../../scripts/modal.js";

const navigationItems = document.querySelectorAll('.navigation__item');
const creditCard = document.querySelector('.credit-card');

disableClickEvent(navigationItems[2]);
disableClickEvent(navigationItems[3]);
disableClickEvent(creditCard);

handleOpenHamburger('.header .wrapper .logo', '.hamburger', '.hamburger__button');

const petsService = new PetsService(),
      pets = await petsService.getAllPets(),
      petCards = pets.map(pet => petsService.createPetCard(pet));

slider('.slider__wrapper', '.slider__items', '.slider__button_left', '.slider__button_right', petCards);
modal('.pet-modal', '.pet-modal__overlay', '.wrapper_modal', '.pet-modal__close-button', '.slider__items', pets);



    









