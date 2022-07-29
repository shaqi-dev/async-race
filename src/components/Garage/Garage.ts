import render from '../../utils/render';
import GarageSettings, { GarageSettingsObj } from './GarageSettings';
import GarageSlot from './GarageSlot';
import getRandomCars from '../../utils/getRandomCars';
import { CarSettings } from '../../interfaces/shared';
import { getCars, createCar, updateCar } from '../../services/api';
import store from '../../store';
import s from './Garage.module.scss';
export interface GarageObj {
  container: HTMLDivElement;
  garageSettings: GarageSettingsObj;
  title: HTMLHeadingElement;
  main: HTMLDivElement;
  bindListeners: typeof bindListeners;
  update: typeof updateGarage;
}

const handleCreateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const { garageSettings, garage } = store;

  if (garageSettings) {
    const { container, textInput, colorInput } = garageSettings.createForm;

    if (textInput.value) {
      const error = await createCar({ name: textInput.value, color: colorInput.value });

      if (error) {
        console.error(error);
      } else {
        await garage?.update();
        container.reset();
      }
    }
  }
};

const handleUpdateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const { garageSettings, garage } = store;

  if (garageSettings) {
    const { container, textInput, colorInput, disable } = garageSettings.updateForm;
    const id = container.dataset.carId;

    if (id && textInput.value) {
      await updateCar(+id, {
        name: textInput.value,
        color: colorInput.value,
      });
      await garage?.update();
      disable();
    }
  }
};

const handleGenerateCars = async (): Promise<void> => {
  const cars: CarSettings[] = getRandomCars();
  const promise = cars.map((car) => createCar(car));

  await Promise.all(promise);
  await store.garage?.update();
};

const bindListeners = (): void => {
  const { garageSettings } = store;

  if (garageSettings) {
    const { createForm, updateForm, generateCarsBtn } = garageSettings;

    createForm.container.addEventListener('submit', handleCreateCar);
    updateForm.container.addEventListener('submit', handleUpdateCar);
    generateCarsBtn.addEventListener('click', handleGenerateCars);
  }
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
      data?.cars.map((car) =>
        GarageSlot({
          car,
          garageSelector: '#garage-main',
          garage,
        }),
      );
    }
  }
};

const Garage = (parentSelector?: string): GarageObj => {
  const container = render<HTMLDivElement>('div', s.root, parentSelector);
  const rootSelector = `.${s.root}`;

  const garageSettings = GarageSettings(rootSelector);
  store.garageSettings = garageSettings;

  const title = render<HTMLHeadingElement>('h2', s.title, rootSelector);

  const main = render<HTMLDivElement>('div', s.main, rootSelector);
  main.id = 'garage-main';

  render<HTMLDivElement>('div', s.footer, rootSelector);

  const garage: GarageObj = {
    container,
    garageSettings,
    title,
    main,
    bindListeners,
    update: updateGarage,
  };

  return garage;
};

const initGarage = (): GarageObj => {
  store.garage = Garage();
  store.garage.bindListeners();
  store.garage.update();

  return store.garage;
};

export default initGarage;
