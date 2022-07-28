import render from '../../utils/render';
import s from './Button.module.scss';

export interface ButtonProps {
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  parentSelector?: string;
}

const Button = (props: ButtonProps, parentSelector?: string): HTMLButtonElement => {
  const { label, type } = props;

  const button = render<HTMLButtonElement>('button', s.root, parentSelector);

  button.type = type || 'button';
  button.innerText = label || '';

  return button;
};

export default Button;
