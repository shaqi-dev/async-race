import { createWinner, getCar, getWinner, updateWinner } from '../../../services/api';
import store from '../../../store';
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
  winnerMessage: HTMLSpanElement;
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
  parent: string | HTMLElement,
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

const handleSetWinner = async (id: number, time: number): Promise<void> => {
  const [data, error] = await getWinner(id);

  if (error) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    await updateWinner({
      id,
      wins: data.wins + 1,
      time: data.time < time ? data.time : time,
    });
  }

  store.winners?.table.update();
};

const handleRace = async (): Promise<void> => {
  const { garage } = store;

  if (garage) {
    const { slots } = garage;

    if (slots) {
      const promise = slots.map((slot) => slot.start());
      const [id, time] = await Promise.any(promise);

      if (time) {
        const [data, error] = await getCar(id);
        if (error) {
          console.error(error);
        } else {
          const seconds = +(time / 1000).toFixed(2);
          const { garageSettings } = store;

          await handleSetWinner(id, seconds);

          if (garageSettings) {
            garageSettings.winnerMessage.innerText = `Winner: ${data.name}, time: ${seconds}s.`;
            garageSettings.winnerMessage.style.display = 'block';

            setTimeout(() => {
              garageSettings.winnerMessage.style.display = 'none';
            }, 5000);
          }
        }
      }
    }
  }
};

const handleReset = async (): Promise<void> => {
  const { garage } = store;

  if (garage) {
    const { slots } = garage;

    if (slots) {
      const promise = slots.map((slot) => slot.stop());
      await Promise.all(promise);
    }
  }
};

const bindListeners = (garageSettings: GarageSettingsObj): void => {
  const { raceBtn, resetBtn } = garageSettings;

  raceBtn.addEventListener('click', handleRace);
  resetBtn.addEventListener('click', handleReset);
};

const GarageSettings = (parent: string | HTMLElement): GarageSettingsObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const createForm = GarageSettingsForm(container, 'create-form', 'Create');
  const updateForm = GarageSettingsForm(container, 'update-form', 'Update');
  const footer = render<HTMLDivElement>('div', s.footer, container);
  const raceBtn = Button({ label: 'Race' }, footer);
  const resetBtn = Button({ label: 'Reset' }, footer);
  const generateCarsBtn = Button({ label: 'Generate Cars' }, footer);
  const winnerMessage = render<HTMLSpanElement>('span', s.message, container, 'Winner: ');

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

const initGarageSettings = (parent: string | HTMLElement): GarageSettingsObj => {
  store.garageSettings = GarageSettings(parent);
  bindListeners(store.garageSettings);
  store.garageSettings.updateForm.disable();
  store.garageSettings.winnerMessage.style.display = 'none';

  return store.garageSettings;
};

export default initGarageSettings;
