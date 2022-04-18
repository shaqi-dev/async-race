"use strict";

export default class PetsService {
	constructor() {
		this._apiBase = "../../pets.json";
	}

	getResource = async () => {
		const response = await fetch(this._apiBase);

		if (!response.ok) {
			throw new Error(`Couldn't fetch ${url}``, received: ${response.status}`);
		}

		return await response.json();
	};

	getAllPets = async () => {
		const res = await this.getResource();
		return res;
	};  

	createPetCard = (petData) => {
		const card = document.createElement("div");
    	card.classList.add('pet-card');
		card.setAttribute('data-name', `${petData.name}`);
		card.innerHTML = `
        <img
            src=${petData.img}
            class="pet-card__image"
            alt="pet card image"
        />
        <span class="pet-card__name">${petData.name}</span>
        <button type="button" class="button button_secondary button_pet-card">
            Learn more
        </button>
    `;

    return card
	};
}
