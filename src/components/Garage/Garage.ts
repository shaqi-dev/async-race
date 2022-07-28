import render from '../../utils/render';
import ControllPanel, { ControllPanelObj } from './ControllPanel';
import GarageSlot from './GarageSlot';
import getRandomCars from '../../utils/getRandomCars';
import { CarSettings } from '../../interfaces/shared';
import { getCars, createCar, updateCar } from '../../services/api';
import store from '../../store';
import s from './Garage.module.scss';
export interface GarageObj {
  container: HTMLDivElement;
  controllPanel: ControllPanelObj;
  title: HTMLHeadingElement;
  main: HTMLDivElement;
  bindListeners: typeof bindListeners;
  update: typeof updateGarage;
}

const handleCreateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const createForm = e.target as HTMLFormElement | null;

  if (createForm) {
    const textInput = createForm.querySelector('input[type="text"]') as HTMLInputElement;
    const colorInput = createForm.querySelector('input[type="color"]') as HTMLInputElement;

    if (textInput.value) {
      await createCar({ name: textInput.value, color: colorInput.value });
      await store.garage?.update();

      createForm.reset();
    }
  }
};

const handleUpdateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const updateForm = e.target as HTMLFormElement | null;

  if (updateForm) {
    const id = updateForm.dataset.carId;
    const textInput = updateForm.querySelector('input[type="text"]') as HTMLInputElement;
    const colorInput = updateForm.querySelector('input[type="color"]') as HTMLInputElement;

    console.log(id);

    if (id && textInput.value) {
      await updateCar(+id, {
        name: textInput.value,
        color: colorInput.value,
      });
      await store.garage?.update();

      updateForm.reset();
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
  const { controllPanel } = store;

  if (controllPanel) {
    const { createForm, updateForm, generateCarsBtn } = controllPanel;

    createForm.container.addEventListener('submit', handleCreateCar);
    updateForm.container.addEventListener('submit', handleUpdateCar);
    generateCarsBtn.addEventListener('click', handleGenerateCars);
  }
};

const updateGarage = async (): Promise<void> => {
  const { garage } = store;

  if (garage) {
    const { title, main } = garage;
    const data = await getCars(1);
    title.innerText = `Garage (${data?.count})`;
    main.innerHTML = '';
    console.log(main.classList);
    data?.cars.map((car) =>
      GarageSlot({
        car,
        garageSelector: '#garage-main',
        garage,
      }),
    );
  }
};

const Garage = (parentSelector?: string): GarageObj => {
  const container = render<HTMLDivElement>('div', s.root, parentSelector);
  const rootSelector = `.${s.root}`;

  const controllPanel = ControllPanel(rootSelector);
  store.controllPanel = controllPanel;

  const title = render<HTMLHeadingElement>('h2', s.title, rootSelector);

  const main = render<HTMLDivElement>('div', s.main, rootSelector);
  main.id = 'garage-main';

  const footer = render<HTMLDivElement>('div', s.footer, rootSelector);

  const garage: GarageObj = {
    container,
    controllPanel,
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
