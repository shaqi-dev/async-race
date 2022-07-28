import render from '../../../utils/render';
import Button from '../../Button';
import s from './ControllPanel.module.scss';

export interface ControllPanelObj {
  container: HTMLDivElement;
  createForm: ControllPanelFormObj;
  updateForm: ControllPanelFormObj;
  raceBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  generateCarsBtn: HTMLButtonElement;
}

interface ControllPanelFormObj {
  container: HTMLFormElement;
  textInput: HTMLInputElement;
  colorInput: HTMLInputElement;
  submitBtn: HTMLButtonElement;
}

const ControllPanelForm = (
  parentSelector: string,
  formId: string,
  submitButtonLabel: string,
): ControllPanelFormObj => {
  const container = render<HTMLFormElement>('form', s.form, parentSelector);
  const containerSelector = `#${formId}`;
  container.id = formId;

  const textInput = render<HTMLInputElement>('input', s['text-input'], containerSelector);
  textInput.type = 'text';

  const colorInput = render<HTMLInputElement>('input', s['color-input'], containerSelector);
  colorInput.type = 'color';

  const submitBtn = Button({ label: submitButtonLabel, type: 'submit' }, containerSelector);

  return {
    container,
    textInput,
    colorInput,
    submitBtn,
  };
};

const ControllPanel = (parentSelector?: string): ControllPanelObj => {
  const container = render<HTMLDivElement>('div', s.root, parentSelector);
  const rootSelector = `.${s.root}`;

  const createForm = ControllPanelForm(rootSelector, 'create-form', 'Create');
  const updateForm = ControllPanelForm(rootSelector, 'update-form', 'Update');

  const footer = render<HTMLDivElement>('div', s.footer, rootSelector);
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

export default ControllPanel;
