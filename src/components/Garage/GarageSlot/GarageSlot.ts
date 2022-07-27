import appendParent from '../../../utils/appendParent';
import getCarSVG from '../../../utils/getCarSVG';
import Button from '../../Button';
import type { Car } from '../../../interfaces/shared';
import s from './GarageSlot.module.scss';

interface GarageSlotObj {
  container: HTMLDivElement;
  selectBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
}

const GarageSlot = (car: Car, garageSelector: string): GarageSlotObj => {
  const container = appendParent(document.createElement('div'), garageSelector);
  container.id = `car-${car.id}`;
  const containerSelector = `#car-${car.id}`;
  if (s.root) container.classList.add(s.root);

  const header = appendParent(document.createElement('div'), containerSelector);
  const headerSelector = `${containerSelector} .${s.header}`;
  console.log(headerSelector);
  if (s.header) header.classList.add(s.header);

  const selectBtn = Button({ label: 'Select', type: 'button' }, headerSelector);
  const resetBtn = Button({ label: 'Reset', type: 'reset' }, headerSelector);
  const startBtn = Button({ label: 'Start', type: 'button' }, headerSelector);
  const stopBtn = Button({ label: 'Stop', type: 'reset' }, headerSelector);

  const main = appendParent(document.createElement('div'), containerSelector);
  if (s.main) main.classList.add(s.main);
  main.innerHTML = getCarSVG(car.color);

  return {
    container,
    selectBtn,
    resetBtn,
    startBtn,
    stopBtn,
  };
};

export default GarageSlot;
