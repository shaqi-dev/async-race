import render from '../../../utils/render';
import getCarSVG from '../../../utils/getCarSVG';
import Button from '../../Button';
import { GarageObj } from '../Garage';
import s from './GarageSlot.module.scss';
import { Car } from '../../../interfaces/shared/car';

export interface GarageSlotObj {
  container: HTMLDivElement;
  carName: HTMLSpanElement;
  carImage: HTMLDivElement;
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  id: number;
  start: (() => Promise<[number, number] | [number, null]>) | undefined;
  stop: (() => Promise<void>) | undefined;
  animation: Animation | undefined;
}

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

  return {
    container,
    carName,
    carImage,
    selectBtn,
    removeBtn,
    startBtn,
    stopBtn,
    id,
    start: undefined,
    stop: undefined,
    animation: undefined,
  };
};

export default GarageSlot;
