import { GarageSettingsFormObj } from '../../../../interfaces/Garage';
import render, { Parent } from '../../../../utils/render';
import Button from '../../../Button';
import s from './GarageSettingsForm.module.scss';

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

export default GarageSettingsForm;
