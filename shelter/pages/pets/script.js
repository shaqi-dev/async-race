"use strict"

import handleOpenHamburger from "../../scripts/handleOpenHamburger.js";
import PetsService from "../../pets-service.js";
import paginator from "../../scripts/paginator.js";
import modal from "../../scripts/modal.js";

handleOpenHamburger('.header .wrapper .logo', '.hamburger','.hamburger__button', '.overlay', 'pets');

const petsService = new PetsService(),
      pets = await petsService.getAllPets(),
      petCards = pets.map(pet => petsService.createPetCard(pet));

paginator('.our-friends__cards', '.paginator__item', petCards)
modal('.pet-modal', '.pet-modal__overlay', '.wrapper_modal', '.pet-modal__close-button', '.our-friends__cards', pets);


