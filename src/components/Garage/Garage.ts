import render, { Parent } from '../../utils/render';
import { GarageSlotObj } from './GarageSlot';
import s from './Garage.module.scss';
export interface GarageObj {
  container: HTMLDivElement;
  main: HTMLDivElement;
  hide: () => void;
  show: () => void;
  slots: GarageSlotObj[] | undefined;
  update: (() => Promise<void>) | undefined;
}

const Garage = (parent: Parent): GarageObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const main = render<HTMLDivElement>('div', s.main, container);

  const hide = (): void => {
    container.style.display = 'none';
  };

  const show = (): void => {
    container.style.display = 'flex';
  };

  return {
    container,
    main,
    hide,
    show,
    slots: undefined,
    update: undefined,
  };
};

export default Garage;
