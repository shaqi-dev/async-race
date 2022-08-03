import { store } from '../../../App';
import {
  createWinner,
  getWinner,
  GetWinnerReturn,
  updateWinner,
} from '../../../services/winnersService';
import { GetCarReturn, getCar } from '../../../services/garageService';
import { GarageSlotObj, GarageSettingsObj } from '../../../interfaces/Garage';

const handleSetWinner = async (id: number, time: number): Promise<void> => {
  const [data, error]: Awaited<GetWinnerReturn> = await getWinner(id);

  if (error) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const updatedWins: number = data.wins + 1;
    const shortestTime: number = data.time < time ? data.time : time;

    await updateWinner({
      id,
      wins: updatedWins,
      time: shortestTime,
    });
  }

  await store.winners.table.update();
};

const handleRace = async (): Promise<void> => {
  const { slots }: { slots: GarageSlotObj[] | undefined } = store.garage;

  if (slots) {
    const promise: (Promise<[number, number] | [number, null]> | undefined)[] = slots.map(
      (slot) => {
        if (slot.start) return slot.start();
      },
    );

    const res: [number, number] | [number, null] | undefined = await Promise.any(promise);

    if (res && res[0] && res[1]) {
      const [id, time]: [number, number] = res;
      const [data, error]: Awaited<GetCarReturn> = await getCar(id);

      if (error) {
        console.error(error);
      } else {
        const seconds: number = +(time / 1000).toFixed(2);
        const { winnerMessage }: { winnerMessage: HTMLSpanElement } = store.garageSettings;

        await handleSetWinner(id, seconds);

        winnerMessage.innerText = `Winner: ${data.name}, time: ${seconds}s.`;
        winnerMessage.style.display = 'block';

        const messageVisibleTime = 5000;

        setTimeout(() => {
          winnerMessage.style.display = 'none';
        }, messageVisibleTime);
      }
    }
  }
};

const handleReset = async (): Promise<void> => {
  const { slots }: { slots: GarageSlotObj[] | undefined } = store.garage;

  if (slots) {
    const promise: (Promise<void> | undefined)[] = slots.map((slot) => {
      if (slot.stop) {
        return slot.stop();
      }
    });

    await Promise.all(promise);
  }
};

const bindListeners = (): void => {
  const { raceBtn, resetBtn }: { raceBtn: HTMLButtonElement; resetBtn: HTMLButtonElement } =
    store.garageSettings;

  raceBtn.addEventListener('click', handleRace);
  resetBtn.addEventListener('click', handleReset);
};

const hydrateGarageSettings = (): GarageSettingsObj => {
  bindListeners();

  return store.garageSettings;
};

export default hydrateGarageSettings;
