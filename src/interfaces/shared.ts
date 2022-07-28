export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CarSettings {
  name: string;
  color: string;
}

export interface CarEngine {
  velocity: number;
  distance: number;
}
export interface GarageData {
  cars: Car[];
  count: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnersData {
  winners: Winner[];
  count: number;
}

export interface WinnerSettings {
  wins: number;
  time: number;
}
