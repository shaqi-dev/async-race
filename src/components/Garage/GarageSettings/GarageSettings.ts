import render from '../../../utils/render';
import Button from '../../Button';
import s from './GarageSettings.module.scss';

export interface GarageSettingsObj {
  container: HTMLDivElement;
  createForm: GarageSettingsFormObj;
  updateForm: GarageSettingsFormObj;
  raceBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  generateCarsBtn: HTMLButtonElement;
}

interface GarageSettingsFormObj {
  container: HTMLFormElement;
  textInput: HTMLInputElement;
  colorInput: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  disable: () => void;
  enable: () => void;
}

const GarageSettingsForm = (
  parentSelector: string,
  formId: string,
  submitButtonLabel: string,
): GarageSettingsFormObj => {
  const container = render<HTMLFormElement>('form', s.form, parentSelector);
  const containerSelector = `#${formId}`;
  container.id = formId;

  const textInput = render<HTMLInputElement>('input', s['text-input'], containerSelector);
  textInput.type = 'text';

  const colorInput = render<HTMLInputElement>('input', s['color-input'], containerSelector);
  colorInput.type = 'color';
  colorInput.defaultValue = '#000000';

  const submitBtn = Button({ label: submitButtonLabel, type: 'submit' }, containerSelector);

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

const GarageSettings = (parentSelector?: string): GarageSettingsObj => {
  const container = render<HTMLDivElement>('div', s.root, parentSelector);
  const rootSelector = `.${s.root}`;

  const createForm = GarageSettingsForm(rootSelector, 'create-form', 'Create');
  const updateForm = GarageSettingsForm(rootSelector, 'update-form', 'Update');

  updateForm.disable();

  render<HTMLDivElement>('div', s.footer, rootSelector);
  const footerSelector = `.${s.footer}`;

  const raceBtn = Button({ label: 'Race' }, footerSelector);
  const resetBtn = Button({ label: 'Reset' }, footerSelector);
  const generateCarsBtn = Button({ label: 'Generate Cars' }, footerSelector);

  return {
    container,
    createForm,
    updateForm,
    raceBtn,
    resetBtn,
    generateCarsBtn,
  };
};

export default GarageSettings;
