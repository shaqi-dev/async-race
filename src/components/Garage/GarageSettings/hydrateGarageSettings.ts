import { getWinner, createWinner, updateWinner, getCar } from '../../../services/api';
import { store } from '../../../App';
import { GarageSettingsObj } from './GarageSettings';

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
  const { slots } = store.garage;

  if (slots) {
    const promise = slots.map((slot) => {
      if (slot.start) return slot.start();
    });
    const res = await Promise.any(promise);

    if (res) {
      const [id, time] = res;

      if (time) {
        const [data, error] = await getCar(id);

        if (error) {
          console.error(error);
        } else {
          const seconds = +(time / 1000).toFixed(2);
          const { garageSettings } = store;

          await handleSetWinner(id, seconds);

          garageSettings.winnerMessage.innerText = `Winner: ${data.name}, time: ${seconds}s.`;
          garageSettings.winnerMessage.style.display = 'block';

          setTimeout(() => {
            garageSettings.winnerMessage.style.display = 'none';
          }, 5000);
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
      const promise = slots.map((slot) => {
        if (slot.stop) return slot.stop();
      });

      await Promise.all(promise);
    }
  }
};

const bindListeners = (): void => {
  const { raceBtn, resetBtn } = store.garageSettings;

  raceBtn.addEventListener('click', handleRace);
  resetBtn.addEventListener('click', handleReset);
};

const hydrateGarageSettings = (): GarageSettingsObj => {
  const { garageSettings } = store;
  bindListeners();
  garageSettings.updateForm.disable();
  garageSettings.winnerMessage.style.display = 'none';

  return garageSettings;
};

export default hydrateGarageSettings;
