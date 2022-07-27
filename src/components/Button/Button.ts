import appendParent from '../../utils/appendParent';
import s from './Button.module.scss';

export interface ButtonProps {
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  parentSelector?: string;
}

const Button = (
  props: ButtonProps,
  parentSelector?: string,
): HTMLButtonElement => {
  const button = appendParent(document.createElement('button'), parentSelector);
  const { label, type } = props;

  button.classList.add(s.root || '');
  button.type = type || 'button';
  button.innerText = label || '';

  return button;
};

export default Button;
