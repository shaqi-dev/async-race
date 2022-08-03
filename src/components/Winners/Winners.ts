import { WinnersObj, WinnersTableObj } from '../../interfaces/Winners';
import render, { Parent } from '../../utils/render';
import s from './Winners.module.scss';
import WinnersTable from './WinnersTable';

const Winners = (parent: Parent | undefined): WinnersObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const table: WinnersTableObj = WinnersTable(container);

  return {
    container,
    table,
  };
};

export default Winners;
