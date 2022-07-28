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
  count: string;
}
