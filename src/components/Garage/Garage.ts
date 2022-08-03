import render, { Parent } from '../../utils/render';
import { GarageSlotObj } from './GarageSlot';
import s from './Garage.module.scss';
export interface GarageObj {
  container: HTMLDivElement;
  main: HTMLDivElement;
  slots: GarageSlotObj[] | undefined;
  update: (() => Promise<void>) | undefined;
}

const Garage = (parent: Parent | undefined): GarageObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const main = render<HTMLDivElement>('div', s.main, container);

  return {
    container,
    main,
    slots: undefined,
    update: undefined,
  };
};

export default Garage;
