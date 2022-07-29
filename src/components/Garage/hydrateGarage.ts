import { CarSettings } from '../../interfaces/shared';
import { createCar, getCars, updateCar } from '../../services/api';
import { store } from '../../App';
import getRandomCars from '../../utils/getRandomCars';
import { GarageObj } from './Garage';
import GarageSlot from './GarageSlot';
import hydrateGarageSlots from './GarageSlot/hydrateGarageSlots';

const update = async (): Promise<void> => {
  const { garage } = store;

  if (garage) {
    const { garagePage } = store;
    const { title, page, main } = garage;
    const [data, error] = await getCars(garagePage);

    if (error) {
      console.error(error.message);
    } else {
      title.innerText = `Garage (${data?.count})`;
      page.innerText = `Page #${garagePage}`;
      main.innerHTML = '';
      garage.slots = data.cars.map((car) => GarageSlot(car, garage));
      hydrateGarageSlots(garage.slots);

      if (data.count / (garagePage * 7) < 1) {
        garage.next.disabled = true;
      } else {
        garage.next.disabled = false;
      }
    }
  }
};

const handleCreateCar = async (e: SubmitEvent, garage: GarageObj): Promise<void> => {
  e.preventDefault();
  const { container, textInput, colorInput } = garage.settings.createForm;

  if (textInput.value) {
    const error = await createCar({ name: textInput.value, color: colorInput.value });

    if (error) {
      console.error(error);
    } else {
      if (garage.update) garage.update();
      container.reset();
    }
  }
};

const handleUpdateCar = async (e: SubmitEvent, garage: GarageObj): Promise<void> => {
  e.preventDefault();
  const { container, textInput, colorInput, disable } = garage.settings.updateForm;
  const id = container.dataset.carId;

  if (id && textInput.value) {
    await updateCar(+id, {
      name: textInput.value,
      color: colorInput.value,
    });

    if (garage.update) garage.update();
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

  const { garage } = store;

  if (garage && garage.update) {
    if (store.garagePage === 1) {
      garage.prev.disabled = true;
    }

    garage.update();
  }
};

const handleClickNext = (): void => {
  store.garagePage = store.garagePage + 1;

  const { garage } = store;

  if (garage && garage.update) {
    garage.prev.disabled = false;

    garage.update();
  }
};

const bindListeners = (garage: GarageObj): void => {
  const { createForm, updateForm, generateCarsBtn } = garage.settings;

  createForm.container.addEventListener('submit', (e) => handleCreateCar(e, garage));
  updateForm.container.addEventListener('submit', (e) => handleUpdateCar(e, garage));
  generateCarsBtn.addEventListener('click', () => handleGenerateCars(garage));
  garage.prev.addEventListener('click', handleClickPrev);
  garage.next.addEventListener('click', handleClickNext);
};

const hydrateGarage = (): GarageObj => {
  bindListeners(store.garage);
  store.garage.update = update;
  store.garage.update();

  if (store.view !== 'garage') {
    store.garage.hide();
  }

  if (store.garagePage === 1) {
    store.garage.prev.disabled = true;
  }

  return store.garage;
};

export default hydrateGarage;
