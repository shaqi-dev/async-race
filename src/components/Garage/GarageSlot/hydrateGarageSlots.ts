import { store } from '../../../App';
import {
  deleteCar,
  deleteWinner,
  getCar,
  setCarEngineToDrive,
  setCarEngine,
} from '../../../services/api';
import animateCar from '../../../utils/animateCar';
import { GarageSlotObj } from './GarageSlot';

const handleDeleteCar = async (e: MouseEvent, id: number): Promise<void> => {
  e.preventDefault();

  const error = await deleteCar(id);

  if (error) {
    console.error(error);
  } else {
    await deleteWinner(id);
    if (store.garage.update) store.garage?.update();
    await store.winners?.table.update();
  }
};

const handleSelectCar = async (e: MouseEvent, id: number): Promise<void> => {
  e.preventDefault();

  const { settings } = store.garage;

  if (settings) {
    const { container, textInput, colorInput, enable } = settings.updateForm;
    const [car, error] = await getCar(id);

    if (error) {
      console.error(error);
    } else {
      enable();
      textInput.value = car.name;
      colorInput.value = car.color;
      container.dataset.carId = `${id}`;
    }
  }
};

const handleStartDriving = async (
  id: number,
  time: number,
): Promise<{ success: boolean } | Error> => {
  if (store.garage.slots) {
    const garageSlot: GarageSlotObj = store.garage.slots.filter((slot) => slot.id === id)[0];
    const { startBtn, stopBtn, carImage } = garageSlot;

    garageSlot.animation = animateCar(time, carImage);
    const [data, error] = await setCarEngineToDrive(id);

    stopBtn.disabled = true;
    startBtn.disabled = false;

    if (error) {
      garageSlot.animation.pause();
      console.error(error);

      return error;
    } else {
      return data;
    }
  }

  return new Error('');
};

const handleStartEngine = async (id: number): Promise<[number, number] | [number, null]> => {
  if (store.garage.slots) {
    const { startBtn, stopBtn, animation } = store.garage.slots.filter((slot) => slot.id === id)[0];

    if (animation) animation.cancel();

    const [data, error] = await setCarEngine(id, 'started');

    if (error) {
      console.error(error);
      return new Promise((_, reject) => reject([id, null]));
    } else {
      startBtn.disabled = true;
      stopBtn.disabled = false;

      const time = Math.round(data.distance / data.velocity);

      const res = await handleStartDriving(id, time);

      if (res instanceof Error) return new Promise((_, reject) => reject([id, null]));
      return new Promise((resolve) => resolve([id, time]));
    }
  }

  return new Promise((_, reject) => reject([id, null]));
};

const handleStopEngine = async (id: number): Promise<void> => {
  if (store.garage.slots) {
    const { startBtn, stopBtn, animation } = store.garage.slots.filter((slot) => slot.id === id)[0];

    const [, error] = await setCarEngine(id, 'stopped');

    if (error) {
      console.error(error);
    } else {
      animation?.cancel();
      stopBtn.disabled = true;
      startBtn.disabled = false;
    }
  }
};

const bindListeners = (garageSlot: GarageSlotObj): void => {
  const { selectBtn, removeBtn, startBtn, stopBtn, id } = garageSlot;

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
