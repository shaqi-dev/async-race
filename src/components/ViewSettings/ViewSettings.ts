import Button from '../Button';
import render from '../../utils/render';
import s from './ViewSettings.module.scss';

export interface ViewSettingsObj {
  container: HTMLDivElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
}

const ViewSettings = (parent: string | HTMLElement): ViewSettingsObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const garageBtn = Button({ label: 'Garage' }, container);
  const winnersBtn = Button({ label: 'Winners' }, container);

  return {
    container,
    garageBtn,
    winnersBtn,
  };
};

export default ViewSettings;
