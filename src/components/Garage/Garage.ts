import render from '../../utils/render';
import initGarageSettings, { GarageSettingsObj } from './GarageSettings';
import initGarageSlot from './GarageSlot';
import ViewTitle from '../ViewTitle';
import getRandomCars from '../../utils/getRandomCars';
import { CarSettings } from '../../interfaces/shared';
import { getCars, createCar, updateCar } from '../../services/api';
import store from '../../store';
import s from './Garage.module.scss';
export interface GarageObj {
  container: HTMLDivElement;
  garageSettings: GarageSettingsObj;
  title: HTMLParagraphElement;
  main: HTMLDivElement;
  footer: HTMLDivElement;
  update: typeof updateGarage;
}

const handleCreateCar = async (e: SubmitEvent, garage: GarageObj): Promise<void> => {
  e.preventDefault();
  const { container, textInput, colorInput } = garage.garageSettings.createForm;

  if (textInput.value) {
    const error = await createCar({ name: textInput.value, color: colorInput.value });

    if (error) {
      console.error(error);
    } else {
      await garage.update();
      container.reset();
    }
  }
};

const handleUpdateCar = async (e: SubmitEvent, garage: GarageObj): Promise<void> => {
  e.preventDefault();
  const { container, textInput, colorInput, disable } = garage.garageSettings.updateForm;
  const id = container.dataset.carId;

  if (id && textInput.value) {
    await updateCar(+id, {
      name: textInput.value,
      color: colorInput.value,
    });

    await garage.update();

    disable();
  }
};

const handleGenerateCars = async (garage: GarageObj): Promise<void> => {
  const cars: CarSettings[] = getRandomCars();

  const promise = cars.map((car) => createCar(car));
  await Promise.all(promise);

  await garage.update();
};

const bindListeners = (garage: GarageObj): void => {
  const { createForm, updateForm, generateCarsBtn } = garage.garageSettings;

  createForm.container.addEventListener('submit', (e) => handleCreateCar(e, garage));
  updateForm.container.addEventListener('submit', (e) => handleUpdateCar(e, garage));
  generateCarsBtn.addEventListener('click', () => handleGenerateCars(garage));
};

const updateGarage = async (): Promise<void> => {
  const { garage } = store;

  if (garage) {
    const { garagePage } = store;
    const { title, main } = garage;
    const [data, error] = await getCars(garagePage);

    if (error) {
      console.error(error.message);
    } else {
      title.innerText = `Garage (${data?.count})`;
      main.innerHTML = '';
      data.cars.map((car) => initGarageSlot(car, garage));
    }
  }
};

const Garage = (parent: string | HTMLElement): GarageObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const garageSettings = initGarageSettings(container);
  const title = ViewTitle('Garage', container);
  const main = render<HTMLDivElement>('div', s.main, container);
  const footer = render<HTMLDivElement>('div', s.footer, container);

  return {
    container,
    garageSettings,
    title,
    main,
    footer,
    update: updateGarage,
  };
};

const initGarage = (parent: string | HTMLElement): GarageObj => {
  store.garage = Garage(parent);
  bindListeners(store.garage);
  store.garage.update();

  return store.garage;
};

export default initGarage;
