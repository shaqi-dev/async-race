import appendParent from '../../utils/appendParent';
import s from './Button.module.scss';

export interface ButtonProps {
  label?: string;
  parentSelector?: string;
}

const Button = (
  props: ButtonProps,
  parentSelector?: string,
): HTMLButtonElement => {
  const buttonEl = appendParent(
    document.createElement('button'),
    parentSelector,
  );
  const { label } = props;

  buttonEl.classList.add(s.root);
  buttonEl.innerText = label || '';

  return buttonEl;
};

export default Button;
