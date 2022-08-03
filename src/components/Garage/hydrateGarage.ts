import { CarSettings } from '../../interfaces/shared';
import { createCar, getCars, GetCarsReturn, updateCar } from '../../services/api';
import { store } from '../../App';
import getRandomCars from '../../utils/getRandomCars';
import { GarageObj } from './Garage';
import GarageSlot from './GarageSlot';
import hydrateGarageSlots from './GarageSlot/hydrateGarageSlots';
import { ViewSettingsObj } from '../ViewSettings';
import { GarageSettingsFormObj } from './GarageSettings';
import getPaginatorButtonsStatus from '../../utils/getPaginatorButtonsStatus';

const update = async (): Promise<void> => {
  const {
    garage,
    viewSettings,
    garagePage,
    garagePerPage,
  }: {
    garage: GarageObj;
    viewSettings: ViewSettingsObj;
    garagePage: number;
    garagePerPage: number;
  } = store;

  const [data, error]: Awaited<GetCarsReturn> = await getCars(garagePage);

  if (error) {
    console.error(error.message);
  } else {
    viewSettings.garageTitle.innerText = `Garage (${data.count})`;
    viewSettings.garagePage.innerText = `Page #${garagePage}`;
    garage.main.innerHTML = '';

    garage.slots = data.cars.map((car) => GarageSlot(car, garage));
    hydrateGarageSlots(garage.slots);

    const [prev, next] = getPaginatorButtonsStatus(data.count, garagePage, garagePerPage);

    viewSettings.garagePrev.disabled = prev;
    viewSettings.garageNext.disabled = next;
  }
};

const handleCreateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const {
    container,
    textInput,
    colorInput,
  }: { container: HTMLFormElement; textInput: HTMLInputElement; colorInput: HTMLInputElement } =
    store.garageSettings.createForm;

  const isTextInputFilled: string = textInput.value;

  if (isTextInputFilled) {
    const error: void | Error = await createCar({ name: textInput.value, color: colorInput.value });

    if (error) {
      console.error(error);
    } else {
      if (store.garage.update) {
        await store.garage.update();
      }

      container.reset();
    }
  }
};

const handleUpdateCar = async (e: SubmitEvent): Promise<void> => {
  e.preventDefault();
  const {
    container,
    textInput,
    colorInput,
    disable,
  }: {
    container: HTMLFormElement;
    textInput: HTMLInputElement;
    colorInput: HTMLInputElement;
    disable: () => void;
  } = store.garageSettings.updateForm;

  const currentCarId: string | undefined = container.dataset.carId;
  const isTextInputFilled: string = textInput.value;

  if (currentCarId && isTextInputFilled) {
    await updateCar(+currentCarId, {
      name: textInput.value,
      color: colorInput.value,
    });

    if (store.garage.update) {
      await store.garage.update();
    }

    await store.winners.table.update();

    disable();
  }
};

const handleGenerateCars = async (): Promise<void> => {
  const cars: CarSettings[] = getRandomCars();

  const promise: Promise<void | Error>[] = cars.map((car) => createCar(car));
  await Promise.all(promise);

  if (store.garage.update) {
    await store.garage.update();
  }
};

const handleChangePage = async (value: number): Promise<void> => {
  store.garagePage = store.garagePage + value;

  if (store.garage.update) {
    await store.garage.update();
  }
};

const bindListeners = (): void => {
  const {
    createForm,
    updateForm,
    generateCarsBtn,
  }: {
    createForm: GarageSettingsFormObj;
    updateForm: GarageSettingsFormObj;
    generateCarsBtn: HTMLButtonElement;
  } = store.garageSettings;

  const { viewSettings }: { viewSettings: ViewSettingsObj } = store;

  createForm.container.addEventListener('submit', (e) => handleCreateCar(e));
  updateForm.container.addEventListener('submit', (e) => handleUpdateCar(e));
  generateCarsBtn.addEventListener('click', () => handleGenerateCars());
  viewSettings.garagePrev.addEventListener('click', () => handleChangePage(-1));
  viewSettings.garageNext.addEventListener('click', () => handleChangePage(1));
};

const hydrateGarage = async (): Promise<GarageObj> => {
  const { garage }: { garage: GarageObj } = store;

  bindListeners();

  garage.update = update;
  await garage.update();

  if (store.view !== 'garage') {
    garage.hide();
  }

  return garage;
};

export default hydrateGarage;
