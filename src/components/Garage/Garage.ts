import render, { Parent } from '../../utils/render';
import GarageSettings, { GarageSettingsObj } from './GarageSettings';
import { GarageSlotObj } from './GarageSlot';
import s from './Garage.module.scss';
import Button from '../Button';
export interface GarageObj {
  container: HTMLDivElement;
  settings: GarageSettingsObj;
  title: HTMLParagraphElement;
  page: HTMLParagraphElement;
  main: HTMLDivElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
  hide: () => void;
  show: () => void;
  slots: GarageSlotObj[] | undefined;
  update: (() => Promise<void>) | undefined;
}

const Garage = (parent: Parent): GarageObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const settings = GarageSettings(container);
  const title = render<HTMLParagraphElement>('p', s.title, container, 'Garage');
  const page = render<HTMLParagraphElement>('p', s.page, container, `Page #`);
  const main = render<HTMLDivElement>('div', s.main, container);
  const pagination = render<HTMLDivElement>('div', s.pagination, container);
  const prev = Button({ label: 'Prev' }, pagination);
  const next = Button({ label: 'Next' }, pagination);

  const hide = (): void => {
    container.style.display = 'none';
  };

  const show = (): void => {
    container.style.display = 'flex';
  };

  return {
    container,
    settings,
    title,
    page,
    main,
    prev,
    next,
    hide,
    show,
    slots: undefined,
    update: undefined,
  };
};

export default Garage;
