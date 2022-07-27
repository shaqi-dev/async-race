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

  const main = appendParent(document.createElement('div'), containerSelector);
  const mainSelector = `${containerSelector} .${s.main}`;
  if (s.main) main.classList.add(s.main);

  const carName = appendParent(document.createElement('span'), mainSelector);
  carName.innerText = `${car.name}`;

  main.innerHTML += getCarSVG(car.color);

  const footer = appendParent(document.createElement('div'), containerSelector);
  const footerSelector = `${containerSelector} .${s.footer}`;
  if (s.footer) footer.classList.add(s.footer);

  const selectBtn = Button({ label: 'Select', type: 'button' }, footerSelector);
  const removeBtn = Button({ label: 'Remove', type: 'reset' }, footerSelector);
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
