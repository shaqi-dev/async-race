import appendParent from '../../../utils/appendParent';
import getCarSVG from '../../../utils/getCarSVG';
import Button from '../../Button';
import type { Car } from '../../../interfaces/shared';
import s from './GarageSlot.module.scss';

export interface GarageSlotObj {
  container: HTMLDivElement;
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
}

const GarageSlot = (car: Car, garageSelector: string): GarageSlotObj => {
  const container = appendParent(document.createElement('div'), garageSelector);
  container.id = `car-${car.id}`;
  container.dataset.carId = `${car.id}`;
  const containerSelector = `#car-${car.id}`;
  if (s.root) container.classList.add(s.root);

  const header = appendParent(document.createElement('div'), containerSelector);
  const headerSelector = `${containerSelector} .${s.header}`;
  if (s.header) header.classList.add(s.header);

  const selectBtn = Button({ label: 'Select', type: 'button' }, headerSelector);
  const removeBtn = Button({ label: 'Remove', type: 'reset' }, headerSelector);
  const startBtn = Button({ label: 'Start', type: 'button' }, headerSelector);
  const stopBtn = Button({ label: 'Stop', type: 'reset' }, headerSelector);

  const main = appendParent(document.createElement('div'), containerSelector);
  const mainSelector = `${containerSelector} .${s.main}`;
  if (s.main) main.classList.add(s.main);

  const carName = appendParent(document.createElement('span'), mainSelector);
  carName.innerText = `${car.name}`;

  main.innerHTML += getCarSVG(car.color);

  return {
    container,
    selectBtn,
    removeBtn,
    startBtn,
    stopBtn,
  };
};

export default GarageSlot;
