import { store } from '../../../App';
import { GarageSettingsObj, GarageSlotObj } from '../../../interfaces/Garage';
import {
  SetCarEngineToDriveReturn,
  setCarEngineToDrive,
  SetCarEngineReturn,
  setCarEngine,
} from '../../../services/engineService';
import { deleteCar, GetCarReturn, getCar } from '../../../services/garageService';
import { deleteWinner } from '../../../services/winnersService';
import animateCar from '../../../utils/animateCar';

const handleDeleteCar = async (e: MouseEvent, id: number): Promise<void> => {
  e.preventDefault();

  const error: void | Error = await deleteCar(id);

  if (error) {
    console.error(error);
  } else {
    await deleteWinner(id);

    if (store.garage.update) {
      await store.garage?.update();
    }

    await store.winners?.table.update();
  }
};

const handleSelectCar = async (e: MouseEvent, id: number): Promise<void> => {
  e.preventDefault();

  const { garageSettings }: { garageSettings: GarageSettingsObj } = store;
  const { container, textInput, colorInput, enable } = garageSettings.updateForm;
  const [car, error]: Awaited<GetCarReturn> = await getCar(id);

  if (error) {
    console.error(error);
  } else {
    enable();

    textInput.value = car.name;
    colorInput.value = car.color;
    container.dataset.carId = `${id}`;
  }
};

const handleStartDriving = async (
  id: number,
  time: number,
): Promise<{ success: boolean } | Error> => {
  const { slots }: { slots: GarageSlotObj[] | undefined } = store.garage;

  if (slots) {
    const currentSlot: GarageSlotObj = slots.filter((slot) => slot.id === id)[0];
    const {
      startBtn,
      stopBtn,
      carImage,
    }: {
      startBtn: HTMLButtonElement;
      stopBtn: HTMLButtonElement;
      carImage: HTMLDivElement;
    } = slots.filter((slot) => slot.id === id)[0];

    currentSlot.animation = animateCar(time, carImage);

    const [data, error]: Awaited<SetCarEngineToDriveReturn> = await setCarEngineToDrive(id);

    stopBtn.disabled = true;
    startBtn.disabled = false;

    if (error) {
      currentSlot.animation.pause();
      console.error(error);

      return error;
    } else {
      return data;
    }
  }

  return new Error('');
};

const handleStartEngine = async (id: number): Promise<[number, number] | [number, null]> => {
  const { slots }: { slots: GarageSlotObj[] | undefined } = store.garage;

  if (slots) {
    const {
      startBtn,
      stopBtn,
      animation,
    }: {
      startBtn: HTMLButtonElement;
      stopBtn: HTMLButtonElement;
      animation: Animation | undefined;
    } = slots.filter((slot) => slot.id === id)[0];

    if (animation) {
      animation.cancel();
    }

    const [data, error]: Awaited<SetCarEngineReturn> = await setCarEngine(id, 'started');

    if (error) {
      console.error(error);
      return Promise.reject([id, null]);
    } else {
      startBtn.disabled = true;
      stopBtn.disabled = false;

      const time = Math.round(data.distance / data.velocity);

      const res = await handleStartDriving(id, time);

      if (res instanceof Error) return Promise.reject([id, null]);
      return Promise.resolve([id, time]);
    }
  }

  return Promise.reject([id, null]);
};

const handleStopEngine = async (id: number): Promise<void> => {
  const { slots }: { slots: GarageSlotObj[] | undefined } = store.garage;

  if (slots) {
    const {
      startBtn,
      stopBtn,
      animation,
    }: {
      startBtn: HTMLButtonElement;
      stopBtn: HTMLButtonElement;
      animation: Animation | undefined;
    } = slots.filter((slot) => slot.id === id)[0];

    const [, error]: Awaited<SetCarEngineReturn> = await setCarEngine(id, 'stopped');

    if (error) {
      console.error(error);
    } else {
      if (animation) {
        animation.cancel();
      }

      stopBtn.disabled = true;
      startBtn.disabled = false;
    }
  }
};

const bindListeners = (garageSlot: GarageSlotObj): void => {
  const {
    selectBtn,
    removeBtn,
    startBtn,
    stopBtn,
    id,
  }: {
    selectBtn: HTMLButtonElement;
    removeBtn: HTMLButtonElement;
    startBtn: HTMLButtonElement;
    stopBtn: HTMLButtonElement;
    id: number;
  } = garageSlot;

  selectBtn.addEventListener('click', (e) => handleSelectCar(e, id));
  removeBtn.addEventListener('click', (e) => handleDeleteCar(e, id));
  startBtn.addEventListener('click', () => handleStartEngine(id));
  stopBtn.addEventListener('click', () => handleStopEngine(id));
};

const hydrateGarageSlots = (slots: GarageSlotObj[]): GarageSlotObj[] => {
  slots.forEach((slot) => {
    bindListeners(slot);
    slot.stopBtn.disabled = true;
    slot.start = (): ReturnType<typeof handleStartEngine> => handleStartEngine(slot.id);
    slot.stop = (): ReturnType<typeof handleStopEngine> => handleStopEngine(slot.id);
  });

  return slots;
};

export default hydrateGarageSlots;
