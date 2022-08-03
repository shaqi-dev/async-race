import render from '../../utils/render';
import WinnersTable, { WinnersTableObj } from './WinnersTable';
import type { Parent } from '../../utils/render';
import s from './Winners.module.scss';

export interface WinnersObj {
  container: HTMLDivElement;
  table: WinnersTableObj;

  hide: () => void;
  show: () => void;
}

const Winners = (parent: Parent): WinnersObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const table: WinnersTableObj = WinnersTable(container);

  const hide = (): void => {
    container.style.display = 'none';
  };

  const show = (): void => {
    container.style.display = 'flex';
  };

  return {
    container,
    table,
    hide,
    show,
  };
};

export default Winners;
