import appendParent from '../../../utils/appendParent';
import getCarSVG from '../../../utils/getCarSVG';
import Button from '../../Button';
import { UpdateGarage } from '../Garage';
import { removeCar, getCar } from '../../../services/api';
import type { Car } from '../../../interfaces/shared';
import s from './GarageSlot.module.scss';

export interface GarageSlotObj {
  container: HTMLDivElement;
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
}

interface GarageSlotProps {
  car: Car;
  garageSelector: string;
  updateGarage: UpdateGarage
}

const handleRemoveCar = async (
  e: MouseEvent,
  updateGarage: UpdateGarage,
  id: number
): Promise<void> => {
  e.preventDefault();
  await removeCar(id);
  await updateGarage();
};

const handleSelectCar = async (
  e: MouseEvent,
  id: number,
): Promise<void> => {
  e.preventDefault();
  const updateForm = document.querySelector('#update-form') as HTMLFormElement | null;

  if (updateForm) {
    const textInput = updateForm.querySelector('input[type="text"]') as HTMLInputElement;
    const colorInput = updateForm.querySelector('input[type="color"]') as HTMLInputElement;
    const car = await getCar(id);

    if (car) {
      textInput.value = car.name;
      colorInput.value = car.color;
      updateForm.dataset.carId = `${id}`;
    }
  }
};

const GarageSlot = ({
  car,
  garageSelector,
  updateGarage,
}: GarageSlotProps): GarageSlotObj => {
  const container = appendParent(document.createElement('div'), garageSelector);
  container.id = `car-${car.id}`;
  container.dataset.carId = `${car.id}`;
  const containerSelector = `#car-${car.id}`;
  if (s.root) container.classList.add(s.root);

  const main = appendParent(document.createElement('div'), containerSelector);
  const mainSelector = `${containerSelector} .${s.main}`;
  if (s.main) main.classList.add(s.main);

  const carName = appendParent(document.createElement('span'), mainSelector);
  carName.innerText = `${car.name}`;
  main.innerHTML += getCarSVG(car.color);

  const footer = appendParent(document.createElement('div'), containerSelector);
  const footerSelector = `${containerSelector} .${s.footer}`;
  if (s.footer) footer.classList.add(s.footer);

  const selectBtn = Button({ label: 'Select', type: 'button' }, footerSelector);
  selectBtn.addEventListener('click', (e) => handleSelectCar(e, car.id));
  const removeBtn = Button({ label: 'Remove', type: 'reset' }, footerSelector);
  removeBtn.addEventListener('click', (e) => handleRemoveCar(e, updateGarage, car.id));
  const startBtn = Button({ label: 'Start', type: 'button' }, footerSelector);
  const stopBtn = Button({ label: 'Stop', type: 'reset' }, footerSelector);

  return {
    container,
    selectBtn,
    removeBtn,
    startBtn,
    stopBtn,
  };
};

export default GarageSlot;
