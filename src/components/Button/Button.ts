import s from './Button.module.scss';

export interface ButtonProps {
  label?: string;
  parentSelector?: string;
}

const Button = (props: ButtonProps, parentSelector?: string): HTMLButtonElement => {
  const buttonEl = document.createElement('button');
  const { label } = props;

  buttonEl.innerText = label || '';
  buttonEl.classList.add(s.root);

  if (parentSelector) {
    document.querySelector(parentSelector)?.append(buttonEl);
  }

  return buttonEl;
};

export default Button;
