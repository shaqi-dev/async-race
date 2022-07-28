import handleError from '../utils/handleError';
import type {
  GarageData,
  Car,
  CarSettings,
  CarEngine,
  Winner,
  WinnersData,
  WinnerSettings,
} from '../interfaces/shared';

const API_BASE = 'http://localhost:3000';

const API_GARAGE = `${API_BASE}/garage`;
const API_ENGINE = `${API_BASE}/engine`;
const API_WINNERS = `${API_BASE}/winners`;

export const getCars = async (page = 1, limit = 7): Promise<GarageData | null | void> => {
  try {
    const res = await fetch(`${API_GARAGE}?_limit=${limit}&_page=${page}`);

    if (res.status === 200) {
      const cars: Car[] = await res.json();
      const count = Number(res.headers.get('X-Total-Count')) || 0;

      return {
        cars,
        count,
      };
    }

    return null;
  } catch (e) {
    handleError(e, 'Cannot get garage data from server');
  }
};

export const getCar = async (id: number): Promise<Car | null | void> => {
  try {
    const res = await fetch(`${API_GARAGE}/${id}`);

    if (res.status === 200) {
      const car: Car = await res.json();
      return car;
    }

    return null;
  } catch (e) {
    handleError(e, `Cannot get car (id: ${id}) data from server`);
  }
};

export const createCar = async (car: CarSettings): Promise<void> => {
  try {
    await fetch(`${API_GARAGE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  } catch (e) {
    handleError(e, 'Cannot create new car');
  }
};

export const removeCar = async (id: number): Promise<void> => {
  try {
    await fetch(`${API_GARAGE}/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    handleError(e, 'Cannot create new car');
  }
};

export const updateCar = async (id: number, car: CarSettings): Promise<void> => {
  try {
    await fetch(`${API_BASE}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  } catch (e) {
    handleError(e, `Cannot update car (id: ${id})`);
  }
};

export const setCarEngine = async (
  id: number,
  status: 'started' | 'stopped',
): Promise<CarEngine | null | void> => {
  try {
    const res = await fetch(`${API_ENGINE}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });

    if (res.status === 200) {
      const data: CarEngine = await res.json();
      return data;
    }

    return null;
  } catch (e) {
    handleError(e, 'Cannot set car engine');
  }
};

export const setCarEngineToDrive = async (
  id: number,
): Promise<{ success: boolean } | null | void> => {
  try {
    const res = await fetch(`${API_ENGINE}?id=${id}&status=drive`, {
      method: 'PATCH',
    });

    if (res.status === 200) {
      const data: { success: boolean } = await res.json();
      return data;
    }

    return null;
  } catch (e) {
    handleError(e, 'Cannot start driving');
  }
};

export const getWinners = async (page = 1, limit = 10): Promise<WinnersData | null | void> => {
  try {
    const res = await fetch(`${API_WINNERS}?_limit=${limit}&_page=${page}`);

    if (res.status === 200) {
      const winners: Winner[] = await res.json();
      const count = Number(res.headers.get('X-Total-Count')) || 0;

      return {
        winners,
        count,
      };
    }

    return null;
  } catch (e) {
    handleError(e, 'Cannot get winners data from server');
  }
};

export const getWinner = async (id: number): Promise<Winner | null | void> => {
  try {
    const res = await fetch(`${API_WINNERS}/${id}`);

    if (res.status === 200) {
      const winner: Winner = await res.json();
      return winner;
    }

    return null;
  } catch (e) {
    handleError(e, `Cannot get winner (id: ${id}) data from server`);
  }
};

export const createWinner = async (winner: Winner): Promise<void> => {
  try {
    await fetch(`${API_WINNERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  } catch (e) {
    handleError(e, 'Cannot create new winner');
  }
};

export const removeWinner = async (id: number): Promise<void> => {
  try {
    await fetch(`${API_WINNERS}/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    handleError(e, `Cannot delete winner ${id}`);
  }
};

export const updateWinner = async (id: number, settings: WinnerSettings): Promise<void> => {
  try {
    await fetch(`${API_WINNERS}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
  } catch (e) {
    handleError(e, `Cannot delete winner ${id}`);
  }
};
