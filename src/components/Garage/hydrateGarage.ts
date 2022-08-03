import { store } from '../../App';
import getRandomCars from '../../utils/getRandomCars';
import GarageSlot from './GarageSlot';
import hydrateGarageSlots from './GarageSlot/hydrateGarageSlots';
import getPaginatorButtonsStatus from '../../utils/getPaginatorButtonsStatus';
import { GetCarsReturn, getCars, createCar, updateCar } from '../../services/garageService';
import { CarSettings } from '../../interfaces/shared/car';
import { GarageObj, GarageSettingsFormObj } from '../../interfaces/Garage';
import { ViewSettingsObj } from '../../interfaces/ViewSettings';

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
    store.garageViewTitle = `Garage (${data.count})`;
    store.garagePageTitle = `Page #${garagePage}`;

    garage.main.innerHTML = '';
    garage.slots = data.cars.map((car) => GarageSlot(car, garage));
    hydrateGarageSlots(garage.slots);

    const [prev, next] = getPaginatorButtonsStatus(data.count, garagePage, garagePerPage);

    store.garagePrevBtnStatus = prev;
    store.garageNextBtnStatus = next;

    if (viewSettings.update) {
      viewSettings.update();
    }
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

  createForm.container.addEventListener('submit', (e) => handleCreateCar(e));
  updateForm.container.addEventListener('submit', (e) => handleUpdateCar(e));
  generateCarsBtn.addEventListener('click', () => handleGenerateCars());
};

const hydrateGarage = async (): Promise<GarageObj> => {
  bindListeners();

  store.garage.update = update;
  await store.garage.update();

  return store.garage;
};

export default hydrateGarage;
