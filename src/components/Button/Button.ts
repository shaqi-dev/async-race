import render from '../../utils/render';
import s from './Button.module.scss';

export interface ButtonProps {
  label?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = (props: ButtonProps, parent: string | HTMLElement): HTMLButtonElement => {
  const { label, type } = props;

  const button = render<HTMLButtonElement>('button', s.root, parent, label);
  button.type = type || 'button';

  return button;
};

export default Button;
