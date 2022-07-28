import render from '../../../utils/render';
import getCarSVG from '../../../utils/getCarSVG';
import Button from '../../Button';
import { GarageObj } from '../Garage';
import { removeCar, getCar } from '../../../services/api';
import store from '../../../store';
import type { Car } from '../../../interfaces/shared';
import s from './GarageSlot.module.scss';

export interface GarageSlotObj {
  container: HTMLDivElement;
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
}

interface GarageSlotProps {
  car: Car;
  garageSelector: string;
  garage: GarageObj;
}

const handleRemoveCar = async (e: MouseEvent, id: number): Promise<void> => {
  e.preventDefault();
  await removeCar(id);
  await store.garage?.update();
};

const handleSelectCar = async (e: MouseEvent, id: number): Promise<void> => {
  e.preventDefault();
  const { controllPanel } = store;

  if (controllPanel) {
    const { container, textInput, colorInput, enable } = controllPanel.updateForm;

    const car = await getCar(id);

    if (car) {
      enable();
      textInput.value = car.name;
      colorInput.value = car.color;
      container.dataset.carId = `${id}`;
    }
  }
};

const GarageSlot = ({ car, garageSelector }: GarageSlotProps): GarageSlotObj => {
  const container = render<HTMLDivElement>('div', s.root, garageSelector);
  const containerSelector = `#car-${car.id}`;
  container.id = `car-${car.id}`;
  container.dataset.carId = `${car.id}`;

  const main = render<HTMLDivElement>('div', s.main, containerSelector);
  const mainSelector = `${containerSelector} .${s.main}`;
  if (s.main) main.classList.add(s.main);

  const carName = render<HTMLSpanElement>('span', s.name, mainSelector);
  carName.innerText = `${car.name}`;
  main.innerHTML += getCarSVG(car.color);

  render<HTMLDivElement>('div', s.footer, containerSelector);
  const footerSelector = `${containerSelector} .${s.footer}`;

  const selectBtn = Button({ label: 'Select', type: 'button' }, footerSelector);
  selectBtn.addEventListener('click', (e) => handleSelectCar(e, car.id));

  const removeBtn = Button({ label: 'Remove', type: 'reset' }, footerSelector);
  removeBtn.addEventListener('click', (e) => handleRemoveCar(e, car.id));

  const startBtn = Button({ label: 'Start', type: 'button' }, footerSelector);
  const stopBtn = Button({ label: 'Stop', type: 'reset' }, footerSelector);

  return {
    container,
    selectBtn,
    removeBtn,
    startBtn,
    stopBtn,
  };
};

export default GarageSlot;
