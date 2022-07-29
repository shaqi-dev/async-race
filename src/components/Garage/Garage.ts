import render from '../../utils/render';
import initGarageSettings, { GarageSettingsObj } from './GarageSettings';
import initGarageSlot from './GarageSlot';
import getRandomCars from '../../utils/getRandomCars';
import { CarSettings } from '../../interfaces/shared';
import { getCars, createCar, updateCar } from '../../services/api';
import store from '../../store';
import s from './Garage.module.scss';
import Button from '../Button';
export interface GarageObj {
  container: HTMLDivElement;
  garageSettings: GarageSettingsObj;
  title: HTMLParagraphElement;
  page: HTMLParagraphElement;
  main: HTMLDivElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
  update: typeof updateGarage;
}

const updateGarage = async (): Promise<void> => {
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
      data.cars.map((car) => initGarageSlot(car, garage));

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

const handleClickPrev = (): void => {
  store.garagePage = store.garagePage - 1;

  const { garage } = store;

  if (garage) {
    if (store.garagePage === 1) {
      garage.prev.disabled = true;
    }

    garage.update();
  }
};

const handleClickNext = (): void => {
  store.garagePage = store.garagePage + 1;

  const { garage } = store;

  if (garage) {
    garage.prev.disabled = false;

    garage.update();
  }
};

const bindListeners = (garage: GarageObj): void => {
  const { createForm, updateForm, generateCarsBtn } = garage.garageSettings;

  createForm.container.addEventListener('submit', (e) => handleCreateCar(e, garage));
  updateForm.container.addEventListener('submit', (e) => handleUpdateCar(e, garage));
  generateCarsBtn.addEventListener('click', () => handleGenerateCars(garage));
  garage.prev.addEventListener('click', handleClickPrev);
  garage.next.addEventListener('click', handleClickNext);
};

const Garage = (parent: string | HTMLElement): GarageObj => {
  const { garagePage } = store;

  const container = render<HTMLDivElement>('div', s.root, parent);
  const garageSettings = initGarageSettings(container);
  const title = render<HTMLParagraphElement>('p', s.title, container, 'Garage');
  const page = render<HTMLParagraphElement>('p', s.page, container, `Page #${garagePage}`);
  const main = render<HTMLDivElement>('div', s.main, container);
  const pagination = render<HTMLDivElement>('div', s.pagination, container);
  const prev = Button({ label: 'Prev' }, pagination);
  const next = Button({ label: 'Next' }, pagination);

  return {
    container,
    garageSettings,
    title,
    page,
    main,
    prev,
    next,
    update: updateGarage,
  };
};

const initGarage = (parent: string | HTMLElement): GarageObj => {
  store.garage = Garage(parent);
  bindListeners(store.garage);
  store.garage.update();

  if (store.view !== 'garage') {
    store.garage.container.style.display = 'none';
  }

  if (store.garagePage === 1) {
    store.garage.prev.disabled = true;
  }

  return store.garage;
};

export default initGarage;
