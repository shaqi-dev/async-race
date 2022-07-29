import render from '../../../utils/render';
import getCarSVG from '../../../utils/getCarSVG';
import Button from '../../Button';
import { GarageObj } from '../Garage';
import {
  deleteCar,
  deleteWinner,
  getCar,
  setCarEngine,
  setCarEngineToDrive,
} from '../../../services/api';
import store from '../../../store';
import type { Car } from '../../../interfaces/shared';
import s from './GarageSlot.module.scss';

export interface GarageSlotObj {
  container: HTMLDivElement;
  carName: HTMLSpanElement;
  carImage: HTMLDivElement;
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  id: number;
  start: () => Promise<[number, number] | [number, null]>;
  stop: () => Promise<void>;
  animation: Animation | undefined;
}

const handleDeleteCar = async (e: MouseEvent, id: number): Promise<void> => {
  e.preventDefault();
  const error = await deleteCar(id);

  if (error) {
    console.error(error);
  } else {
    await deleteWinner(id);
    await store.garage?.update();
    await store.winners?.table.update();
  }
};

const handleSelectCar = async (e: MouseEvent, id: number): Promise<void> => {
  e.preventDefault();
  const { garageSettings } = store;

  if (garageSettings) {
    const { container, textInput, colorInput, enable } = garageSettings.updateForm;
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

const animateCar = (time: number, carImage: HTMLDivElement): Animation => {
  const carStyle = getComputedStyle(carImage);
  const parentStyle = getComputedStyle(carImage.parentElement as HTMLDivElement);
  const carWidth = parseInt(carStyle.width);
  const parentWidth = parseInt(parentStyle.width);

  const animation = carImage.animate(
    [
      { transform: 'translateX(0px)' },
      { transform: `translateX(calc(${parentWidth}px - ${carWidth}px))` },
    ],
    {
      duration: time,
      easing: 'ease-in-out',
    },
  );
  animation.play();
  animation.onfinish = (): void => {
    carImage.style.transform = `translateX(0px))`;
  };

  return animation;
};

const handleStartDriving = async (id: number, time: number): Promise<{ success: boolean } | Error> => {
  if (store.garage && store.garage.slots) {
    const garageSlot: GarageSlotObj = store.garage.slots.filter((slot) => slot.id === id)[0]
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
  if (store.garage && store.garage.slots) {
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
  if (store.garage && store.garage.slots) {
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

const GarageSlot = (car: Car, garage: GarageObj): GarageSlotObj => {
  const { id, name } = car;
  const container = render<HTMLDivElement>('div', s.root, garage.main);
  const main = render<HTMLDivElement>('div', s.main, container);
  const carName = render<HTMLSpanElement>('span', s.name, main, `${name}`);
  const carImage = render<HTMLDivElement>('div', s.car, main);
  const footer = render<HTMLDivElement>('div', s.footer, container);
  const selectBtn = Button({ label: 'Select', type: 'button' }, footer);
  const removeBtn = Button({ label: 'Remove', type: 'reset' }, footer);
  const startBtn = Button({ label: 'Start', type: 'button' }, footer);
  const stopBtn = Button({ label: 'Stop', type: 'reset' }, footer);
  carImage.innerHTML += getCarSVG(car.color);

  const start = (): Promise<[number, number] | [number, null]> => handleStartEngine(id);
  const stop = (): Promise<void> => handleStopEngine(id);

  return {
    container,
    carName,
    carImage,
    selectBtn,
    removeBtn,
    startBtn,
    stopBtn,
    id,
    start,
    stop,
    animation: undefined,
  };
};

const initGarageSlot = (car: Car, garage: GarageObj): GarageSlotObj => {
  const garageSlot = GarageSlot(car, garage);
  bindListeners(garageSlot);
  garageSlot.stopBtn.disabled = true;

  return garageSlot;
};

export default initGarageSlot;
