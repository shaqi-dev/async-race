import render, { Parent } from '../../utils/render';
import WinnersTable, { WinnersTableObj } from './WinnersTable';
import s from './Winners.module.scss';

export interface WinnersObj {
  container: HTMLDivElement;
  table: WinnersTableObj;
}

const Winners = (parent: Parent | undefined): WinnersObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const table: WinnersTableObj = WinnersTable(container);

  return {
    container,
    table,
  };
};

export default Winners;
