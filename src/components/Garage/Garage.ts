import appendParent from '../../utils/appendParent';
import ControllPanel, { ControllPanelObj } from './ControllPanel';
import GarageSlot from './GarageSlot';
import getRandomCars from '../../utils/getRandomCars';
import { CarSettings } from '../../interfaces/shared';
import { getCars, createCar, updateCar } from '../../services/api';
import s from './Garage.module.scss';

export type UpdateGarage = () => Promise<void>;
export interface GarageObj {
  container: HTMLDivElement;
  controllPanel: ControllPanelObj;
  main: HTMLDivElement;
  updateGarage: UpdateGarage;
}

const handleCreateCar = async (
  e: SubmitEvent,
  updateGarage: UpdateGarage,
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
      await updateGarage();

      createForm.reset();
    }
  }
};

const handleUpdateCar = async (
  e: SubmitEvent,
  updateGarage: UpdateGarage,
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
      await updateGarage();

      updateForm.reset();
    }
  }
};

const handleGenerateCars = async (
  updateGarage: UpdateGarage,
): Promise<void> => {
  const cars: CarSettings[] = getRandomCars();
  const promise = cars.map((car) => createCar(car));

  await Promise.all(promise);
  await updateGarage();
};

const bindGarageListeners = (garage: GarageObj): void => {
  const { controllPanel, updateGarage } = garage;

  controllPanel.createForm.container.addEventListener('submit', (e) =>
    handleCreateCar(e, updateGarage),
  );
  controllPanel.updateForm.container.addEventListener('submit', (e) =>
    handleUpdateCar(e, updateGarage),
  );
  controllPanel.generateCarsBtn.addEventListener('click', () =>
    handleGenerateCars(updateGarage),
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
  const mainSelector = `.${s.main}`;
  if (s.main) main.classList.add(s.main);

  const updateGarage = async (): Promise<void> => {
    const data = await getCars(1);
    title.innerText = `Garage (${data?.count})`;
    main.innerHTML = '';
    data?.cars.map((car) =>
      GarageSlot({ car, garageSelector: mainSelector, updateGarage }),
    );
  };

  const garage = {
    container,
    controllPanel,
    main,
    updateGarage,
  }
  
  bindGarageListeners(garage);
  updateGarage();

  return garage;
};

export default Garage;
