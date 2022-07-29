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
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  id: number;
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

const handleStartDriving = async (props: EngineHandlerProps, time: number): Promise<void> => {
  const { id, startBtn, stopBtn } = props;
  const [data, error] = await setCarEngineToDrive(id);

  console.log(data);

  if (error) {
    console.error(error);
  } else {
    await handleSetWinner(id, +(time / 1000).toFixed(2));
  }

  stopBtn.disabled = true;
  startBtn.disabled = false;
};

const handleStartEngine = async (props: EngineHandlerProps): Promise<void> => {
  const { id, startBtn, stopBtn } = props;
  const [data, error] = await setCarEngine(id, 'started');

  if (error) {
    console.error(error);
  } else {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    const time = Math.round(data.distance / data.velocity);

    await handleStartDriving(props, time);
  }
};

const handleStopEngine = async (props: EngineHandlerProps): Promise<void> => {
  const { id, startBtn, stopBtn } = props;
  const [, error] = await setCarEngine(id, 'stopped');

  if (error) {
    console.error(error);
  } else {
    stopBtn.disabled = true;
    startBtn.disabled = false;
  }
};

const bindListeners = (garageSlot: GarageSlotObj): void => {
  const { selectBtn, removeBtn, startBtn, stopBtn, id } = garageSlot;

  selectBtn.addEventListener('click', (e) => handleSelectCar(e, id));
  removeBtn.addEventListener('click', (e) => handleDeleteCar(e, id));
  startBtn.addEventListener('click', () => handleStartEngine({ id, startBtn, stopBtn }));
  stopBtn.addEventListener('click', () => handleStopEngine({ id, startBtn, stopBtn }));
};

const GarageSlot = (car: Car, garage: GarageObj): GarageSlotObj => {
  const container = render<HTMLDivElement>('div', s.root, garage.main);
  const main = render<HTMLDivElement>('div', s.main, container);
  const footer = render<HTMLDivElement>('div', s.footer, container);
  const carName = render<HTMLSpanElement>('span', s.name, main, `${car.name}`);
  const selectBtn = Button({ label: 'Select', type: 'button' }, footer);
  const removeBtn = Button({ label: 'Remove', type: 'reset' }, footer);
  const startBtn = Button({ label: 'Start', type: 'button' }, footer);
  const stopBtn = Button({ label: 'Stop', type: 'reset' }, footer);

  main.innerHTML += getCarSVG(car.color);

  return {
    container,
    carName,
    selectBtn,
    removeBtn,
    startBtn,
    stopBtn,
    id: car.id,
  };
};

const initGarageSlot = (car: Car, garage: GarageObj): GarageSlotObj => {
  const garageSlot = GarageSlot(car, garage);
  bindListeners(garageSlot);
  garageSlot.stopBtn.disabled = true;

  return garageSlot;
};

export default initGarageSlot;
