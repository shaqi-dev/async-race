import render from '../../../utils/render';
import Button from '../../Button';
import type { Parent } from '../../../utils/render';
import s from './GarageSettings.module.scss';

interface GarageSettingsFormObj {
  container: HTMLFormElement;
  textInput: HTMLInputElement;
  colorInput: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  disable: () => void;
  enable: () => void;
}

export interface GarageSettingsObj {
  container: HTMLDivElement;
  createForm: GarageSettingsFormObj;
  updateForm: GarageSettingsFormObj;
  raceBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  generateCarsBtn: HTMLButtonElement;
  winnerMessage: HTMLSpanElement;
}

const GarageSettingsForm = (
  parent: Parent,
  formId: string,
  buttonLabel: string,
): GarageSettingsFormObj => {
  const container = render<HTMLFormElement>('form', s.form, parent);
  const textInput = render<HTMLInputElement>('input', s['text-input'], container);
  const colorInput = render<HTMLInputElement>('input', s['color-input'], container);
  const submitBtn = Button({ label: buttonLabel, type: 'submit' }, container);

  container.id = formId;
  textInput.type = 'text';
  colorInput.type = 'color';
  colorInput.defaultValue = '#000000';

  const disable = (): void => {
    container.reset();
    textInput.disabled = true;
    colorInput.disabled = true;
    submitBtn.disabled = true;
  };

  const enable = (): void => {
    container.reset();
    textInput.disabled = false;
    colorInput.disabled = false;
    submitBtn.disabled = false;
  };

  return {
    container,
    textInput,
    colorInput,
    submitBtn,
    disable,
    enable,
  };
};

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
