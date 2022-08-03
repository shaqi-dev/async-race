import render from '../../../utils/render';
import Button from '../../Button';
import type { Parent } from '../../../utils/render';
import s from './GarageSettings.module.scss';
import GarageSettingsForm from './GarageSettingsForm';
import { GarageSettingsObj } from '../../../interfaces/Garage';

const GarageSettings = (parent: Parent): GarageSettingsObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const logo = render<HTMLAnchorElement>('div', s.logo, container, 'ASYNC-RACE');
  const createForm = GarageSettingsForm(container, 'create-form', 'Create');
  const updateForm = GarageSettingsForm(container, 'update-form', 'Update');
  const footer = render<HTMLDivElement>('div', s.footer, container);
  const raceBtn = Button({ label: 'Race' }, footer);
  const resetBtn = Button({ label: 'Reset' }, footer);
  const generateCarsBtn = Button({ label: 'Generate Cars' }, footer);
  const winnerMessage = render<HTMLSpanElement>('span', s.message, container, 'Winner: ');

  logo.href = '/';

  updateForm.disable();

  winnerMessage.style.display = 'none';

  return {
    container,
    createForm,
    updateForm,
    raceBtn,
    resetBtn,
    generateCarsBtn,
    winnerMessage,
  };
};

export default GarageSettings;
