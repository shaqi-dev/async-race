import appendParent from '../../utils/appendParent';
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

export const updateGarage = async (): Promise<void> => {
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

const handleCreateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const createForm = e.target as HTMLFormElement | null;

  if (createForm) {
    const textInput = createForm.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    const colorInput = createForm.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;

    if (textInput.value) {
      await createCar({ name: textInput.value, color: colorInput.value });
      await updateGarage();

      createForm.reset();
    }
  }
};

const handleUpdateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const updateForm = e.target as HTMLFormElement | null;

  if (updateForm) {
    const id = updateForm.dataset.carId;
    const textInput = updateForm.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    const colorInput = updateForm.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;

    console.log(id);

    if (id && textInput.value) {
      await updateCar(+id, {
        name: textInput.value,
        color: colorInput.value,
      });
      await updateGarage();

      updateForm.reset();
    }
  }
};

const handleGenerateCars = async (): Promise<void> => {
  const cars: CarSettings[] = getRandomCars();
  const promise = cars.map((car) => createCar(car));

  await Promise.all(promise);
  await updateGarage();
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

const Garage = (parentSelector?: string): GarageObj => {
  const container = appendParent(document.createElement('div'), parentSelector);
  const rootSelector = `.${s.root}`;
  if (s.root) container.classList.add(s.root);

  const controllPanel = ControllPanel(rootSelector);
  store.controllPanel = controllPanel;

  const title = appendParent(document.createElement('h2'), rootSelector);
  if (s.title) title.classList.add(s.title);

  const main = appendParent(document.createElement('div'), rootSelector);
  main.id = 'garage-main';
  if (s.main) main.classList.add(s.main);

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
