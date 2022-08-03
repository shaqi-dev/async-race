import { GarageObj } from '../../interfaces/Garage';
import render, { Parent } from '../../utils/render';
import s from './Garage.module.scss';

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
