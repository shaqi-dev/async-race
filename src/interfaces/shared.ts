export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface PostCar {
  name: string;
  color: string;
}
export interface GarageData {
  cars: Car[];
  count: string;
}
