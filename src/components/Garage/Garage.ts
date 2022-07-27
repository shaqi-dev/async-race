import appendParent from '../../utils/appendParent';
import ControllPanel, { ControllPanelObj } from './ControllPanel';
import GarageSlot from './GarageSlot';
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
  const form = e.target as HTMLFormElement | null;
  const textInput = form?.querySelector(
    'input[type="text"]',
  ) as HTMLInputElement;
  const colorInput = form?.querySelector(
    'input[type="color"]',
  ) as HTMLInputElement;

  if (textInput.value) {
    await createCar({ name: textInput.value, color: colorInput.value });
    await updateGarage();
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
    }
  }
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
    const data = await getCars(1, 10);
    title.innerText = `Garage (${data?.count})`;
    main.innerHTML = '';
    data?.cars.map((car) =>
      GarageSlot({ car, garageSelector: mainSelector, updateGarage }),
    );
  };

  controllPanel.createForm.container.addEventListener('submit', (e) =>
    handleCreateCar(e, updateGarage),
  );
  controllPanel.updateForm.container.addEventListener('submit', (e) =>
    handleUpdateCar(e, updateGarage),
  );

  updateGarage();

  return {
    container,
    controllPanel,
    main,
    updateGarage,
  };
};

export default Garage;
