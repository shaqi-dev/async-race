import { CarSettings } from '../../interfaces/shared';
import { createCar, getCars, updateCar } from '../../services/api';
import { store } from '../../App';
import getRandomCars from '../../utils/getRandomCars';
import { GarageObj } from './Garage';
import GarageSlot from './GarageSlot';
import hydrateGarageSlots from './GarageSlot/hydrateGarageSlots';

const update = async (): Promise<void> => {
  const { garage, viewSettings, garagePage } = store;
  const [data, error] = await getCars(garagePage);

  if (error) {
    console.error(error.message);
  } else {
    viewSettings.garageTitle.innerText = `Garage (${data.count})`;
    viewSettings.garagePage.innerText = `Page #${garagePage}`;
    garage.main.innerHTML = '';

    garage.slots = data.cars.map((car) => GarageSlot(car, garage));
    hydrateGarageSlots(garage.slots);

    if (data.count / (garagePage * 7) < 1) {
      viewSettings.garageNext.disabled = true;
    } else {
      viewSettings.garageNext.disabled = false;
    }
  }
};

const handleCreateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const { container, textInput, colorInput } = store.garageSettings.createForm;

  if (textInput.value) {
    const error = await createCar({ name: textInput.value, color: colorInput.value });

    if (error) {
      console.error(error);
    } else {
      if (store.garage.update) store.garage.update();
      container.reset();
    }
  }
};

const handleUpdateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const { container, textInput, colorInput, disable } = store.garageSettings.updateForm;
  const id = container.dataset.carId;

  if (id && textInput.value) {
    await updateCar(+id, {
      name: textInput.value,
      color: colorInput.value,
    });

    if (store.garage.update) store.garage.update();
    await store.winners?.table.update();

    disable();
  }
};

const handleGenerateCars = async (garage: GarageObj): Promise<void> => {
  const cars: CarSettings[] = getRandomCars();

  const promise = cars.map((car) => createCar(car));
  await Promise.all(promise);

  if (garage.update) garage.update();
};

const handleClickPrev = (): void => {
  store.garagePage = store.garagePage - 1;

  const { garage, viewSettings } = store;

  if (garage.update) {
    if (store.garagePage === 1) {
      viewSettings.garagePrev.disabled = true;
    }

    garage.update();
  }
};

const handleClickNext = (): void => {
  store.garagePage = store.garagePage + 1;

  const { garage, viewSettings } = store;

  if (garage.update) {
    viewSettings.garagePrev.disabled = false;

    garage.update();
  }
};

const bindListeners = (): void => {
  const { createForm, updateForm, generateCarsBtn } = store.garageSettings;
  const { garage, viewSettings } = store;

  createForm.container.addEventListener('submit', (e) => handleCreateCar(e));
  updateForm.container.addEventListener('submit', (e) => handleUpdateCar(e));
  generateCarsBtn.addEventListener('click', () => handleGenerateCars(garage));
  viewSettings.garagePrev.addEventListener('click', handleClickPrev);
  viewSettings.garageNext.addEventListener('click', handleClickNext);
};

const hydrateGarage = (): GarageObj => {
  const { garage, viewSettings } = store;
  
  bindListeners();
  
  garage.update = update;
  garage.update();

  if (store.view !== 'garage') {
    garage.hide();
  }

  if (store.garagePage === 1) {
    viewSettings.garagePrev.disabled = true;
  }

  return garage;
};

export default hydrateGarage;
