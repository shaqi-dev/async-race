import render from '../../../utils/render';
import getCarSVG from '../../../utils/getCarSVG';
import Button from '../../Button';
import { GarageObj } from '../Garage';
import {
  createWinner,
  deleteCar,
  deleteWinner,
  getCar,
  getWinner,
  setCarEngine,
  setCarEngineToDrive,
  updateWinner,
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
  animate: (time: number) => Animation;
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

interface EngineHandlerProps {
  id: number;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  animate: (time: number) => Animation;
}

const handleSetWinner = async (id: number, time: number): Promise<void> => {
  const [data, error] = await getWinner(id);

  if (error) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    await updateWinner({
      id,
      wins: data.wins + 1,
      time: data.time < time ? data.time : time,
    });
  }

  store.winners?.table.update();
};

const handleStartDriving = async (
  props: EngineHandlerProps,
  animate: (time: number) => Animation,
  time: number,
): Promise<{ success: boolean } | Error> => {
  const { id, startBtn, stopBtn } = props;

  const animation = animate(time);
  const [data, error] = await setCarEngineToDrive(id);

  stopBtn.disabled = true;
  startBtn.disabled = false;

  if (error) {
    animation.pause();
    console.error(error);

    return error;
  } else {
    const seconds = +(time / 1000).toFixed(2);
    await handleSetWinner(id, seconds);

    return data;
  }
};

const handleStartEngine = async (props: EngineHandlerProps): Promise<[number, number] | [number, null]> => {
  const { id, startBtn, stopBtn, animate } = props;
  const [data, error] = await setCarEngine(id, 'started');

  if (error) {
    console.error(error);
    return new Promise((_, reject) => reject([id, null]));
  } else {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    const time = Math.round(data.distance / data.velocity);

    const res = await handleStartDriving(props, animate, time);

    if (res instanceof Error) return new Promise((_, reject) => reject([id, null]));
    return new Promise((resolve) => resolve([id, time]));
  }
};

const handleStopEngine = async (props: EngineHandlerProps): Promise<void> => {
  const { id, startBtn, stopBtn, animate } = props;
  const [, error] = await setCarEngine(id, 'stopped');

  if (error) {
    console.error(error);
  } else {
    const animation = animate(1);
    animation.pause();
    stopBtn.disabled = true;
    startBtn.disabled = false;
  }
};

const bindListeners = (garageSlot: GarageSlotObj): void => {
  const { selectBtn, removeBtn, startBtn, stopBtn, id, animate } = garageSlot;

  selectBtn.addEventListener('click', (e) => handleSelectCar(e, id));
  removeBtn.addEventListener('click', (e) => handleDeleteCar(e, id));
  startBtn.addEventListener('click', () => handleStartEngine({ id, startBtn, stopBtn, animate }));
  stopBtn.addEventListener('click', () => handleStopEngine({ id, startBtn, stopBtn, animate }));
};

const animateCar = (time: number, carImage: HTMLDivElement): Animation => {
  const carStyle = getComputedStyle(carImage);
  const parentStyle = getComputedStyle(carImage.parentElement as HTMLDivElement);
  const carWidth = parseInt(carStyle.width);
  const parentWidth = parseInt(parentStyle.width);

  const svg = carImage.querySelector('svg') as SVGElement;

  const animation = svg.animate(
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
    svg.style.transform = `translateX(0px)`;
  };

  return animation;
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

  const animate = (time: number): Animation => animateCar(time, carImage);

  const engineProps: EngineHandlerProps = {
    id,
    startBtn,
    stopBtn,
    animate,
  };

  const start = (): Promise<[number, number] | [number, null]> => handleStartEngine(engineProps);
  const stop = (): Promise<void> => handleStopEngine(engineProps);

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
    animate,
  };
};

const initGarageSlot = (car: Car, garage: GarageObj): GarageSlotObj => {
  const garageSlot = GarageSlot(car, garage);
  bindListeners(garageSlot);
  garageSlot.stopBtn.disabled = true;

  return garageSlot;
};

export default initGarageSlot;
