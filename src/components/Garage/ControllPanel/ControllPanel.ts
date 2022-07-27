import appendParent from '../../../utils/appendParent';
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
  const container = appendParent(
    document.createElement('form'),
    parentSelector,
  );
  const containerSelector = `#${formId}`;
  container.classList.add(s.form || '');
  container.id = formId;

  const textInput = appendParent(
    document.createElement('input'),
    containerSelector,
  );
  textInput.classList.add(s['text-input'] || '');
  textInput.type = 'text';

  const colorInput = appendParent(
    document.createElement('input'),
    containerSelector,
  );
  colorInput.classList.add(s['color-input'] || '');
  colorInput.type = 'color';

  const submitBtn = Button(
    { label: submitButtonLabel, type: 'submit' },
    containerSelector,
  );

  return {
    container,
    textInput,
    colorInput,
    submitBtn,
  };
};

const ControllPanel = (
  parentSelector?: string,
): ControllPanelObj => {
  const container = appendParent(
    document.createElement('div'),
    parentSelector,
    'prepend',
  );
  const rootSelector = `.${s.root}`;
  container.classList.add(s.root || '');

  const createForm = ControllPanelForm(rootSelector, 'create-form', 'Create');
  const updateForm = ControllPanelForm(rootSelector, 'update-form', 'Update');

  const footer = appendParent(document.createElement('div'), rootSelector);
  const footerSelector = `.${s.footer}`;
  footer.classList.add(s.footer || '');

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
