import { Car, CarSettings } from '../interfaces/shared/car';
import { GarageData } from '../interfaces/shared/garage';
import API_BASE from './apiBase';
import { unexpectedStatus, notFound } from './errors';

const API_GARAGE = `${API_BASE}/garage`;

export type GetCarsReturn = Promise<[GarageData, null] | [null, Error]>;

export const getCars = async (page = 1, limit = 7): GetCarsReturn => {
  try {
    const res = await fetch(`${API_GARAGE}?_limit=${limit}&_page=${page}`);

    if (res.status === 200) {
      const cars: Car[] = await res.json();
      const count: number = Number(res.headers.get('X-Total-Count')) || 0;

      const data: GarageData = {
        cars,
        count,
      };

      return [data, null];
    }

    return [null, unexpectedStatus('Get Cars')];
  } catch (e) {
    return [null, e as Error];
  }
};

export type GetCarReturn = Promise<[Car, null] | [null, Error]>;

export const getCar = async (id: number): GetCarReturn => {
  try {
    const res = await fetch(`${API_GARAGE}/${id}`);

    if (res.status === 200) {
      const data: Car = await res.json();

      return [data, null];
    }

    return [null, unexpectedStatus('Get Car')];
  } catch (e) {
    return [null, e as Error];
  }
};

export const createCar = async (car: CarSettings): Promise<void | Error> => {
  try {
    const res = await fetch(`${API_GARAGE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    if (res.status === 201) return;

    return unexpectedStatus('Create Car');
  } catch (e) {
    return e as Error;
  }
};

export const deleteCar = async (id: number): Promise<void | Error> => {
  try {
    const res = await fetch(`${API_GARAGE}/${id}`, {
      method: 'DELETE',
    });

    const fnName = 'Delete Car';

    if (res.status === 200) return;
    if (res.status === 404) return notFound(fnName);

    return unexpectedStatus(fnName);
  } catch (e) {
    return e as Error;
  }
};

export const updateCar = async (id: number, car: CarSettings): Promise<void | Error> => {
  try {
    const res = await fetch(`${API_GARAGE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    const fnName = 'Update Car';

    if (res.status === 200) return;
    if (res.status === 404) return notFound(fnName);

    return unexpectedStatus(fnName);
  } catch (e) {
    return e as Error;
  }
};
