import appendParent from '../../utils/appendParent';
import ControllPanel, { ControllPanelObj } from './ControllPanel';
import GarageSlot from './GarageSlot';
import getRandomCars from '../../utils/getRandomCars';
import { CarSettings } from '../../interfaces/shared';
import { getCars, createCar, updateCar } from '../../services/api';
import s from './Garage.module.scss';

export type UpdateGarage = (garage: GarageObj) => Promise<void>;
export interface GarageObj {
  container: HTMLDivElement;
  controllPanel: ControllPanelObj;
  title: HTMLHeadingElement;
  main: HTMLDivElement;
  // updateGarage: UpdateGarage;
}

export const updateGarage = async (garage: GarageObj): Promise<void> => {
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
};

const handleCreateCar = async (
  e: SubmitEvent,
  garage: GarageObj
): Promise<void> => {
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
      await updateGarage(garage);

      createForm.reset();
    }
  }
};

const handleUpdateCar = async (
  e: SubmitEvent,
  garage: GarageObj
): Promise<void> => {
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
      await updateCar(+id, { name: textInput.value, color: colorInput.value });
      await updateGarage(garage);

      updateForm.reset();
    }
  }
};

const handleGenerateCars = async (garage: GarageObj): Promise<void> => {
  const cars: CarSettings[] = getRandomCars();
  const promise = cars.map((car) => createCar(car));

  await Promise.all(promise);
  await updateGarage(garage);
};

const bindGarageListeners = (garage: GarageObj): void => {
  const { controllPanel } = garage;

  controllPanel.createForm.container.addEventListener('submit', (e) =>
    handleCreateCar(e, garage),
  );
  controllPanel.updateForm.container.addEventListener('submit', (e) =>
    handleUpdateCar(e, garage),
  );
  controllPanel.generateCarsBtn.addEventListener('click', () =>
    handleGenerateCars(garage),
  );
};

const Garage = async (parentSelector?: string): Promise<GarageObj> => {
  const container = appendParent(document.createElement('div'), parentSelector);
  const rootSelector = `.${s.root}`;
  if (s.root) container.classList.add(s.root);

  const controllPanel = ControllPanel(rootSelector);

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
  };

  bindGarageListeners(garage);
  updateGarage(garage);

  return garage;
};

export default Garage;
