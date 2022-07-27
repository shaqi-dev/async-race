import appendParent from '../../utils/appendParent';
import ControllPanel, { ControllPanelObj } from './ControllPanel';
import GarageSlot from './GarageSlot';
import { getCars, createCar, removeCar } from '../../services/api';
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

const handleRemoveCar = async (
  e: MouseEvent,
  updateGarage: UpdateGarage,
): Promise<void> => {
  e.preventDefault();
  let target = e.target as HTMLElement | null | undefined;
  let id: string | undefined;

  while (target && !id) {    
    target = target?.parentElement;
    id = target?.dataset.carId;
  }

  if (id) {
    await removeCar(+id);
    await updateGarage();
  }
};

const Garage = async (parentSelector?: string): Promise<GarageObj> => {
  const container = appendParent(document.createElement('div'), parentSelector);
  const rootSelector = `.${s.root}`;
  container.classList.add(s.root || '');

  const title = appendParent(document.createElement('h2'), rootSelector);
  title.classList.add(s.title || '');

  const main = appendParent(document.createElement('div'), rootSelector);
  const mainSelector = `.${s.main}`;
  main.classList.add(s.main || '');

  const updateGarage = async (): Promise<void> => {
    const data = await getCars(1, 20);
    title.innerText = `Garage (${data?.count})`;
    main.innerHTML = '';

    const garageSlots = data?.cars.map((car) => GarageSlot(car, mainSelector));
    garageSlots?.forEach((slot) =>
      slot.removeBtn.addEventListener('click', (e) =>
        handleRemoveCar(e, updateGarage),
      ),
    );
  };

  const controllPanel = ControllPanel(rootSelector);
  controllPanel.createForm.container.addEventListener('submit', (e) =>
    handleCreateCar(e, updateGarage),
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
