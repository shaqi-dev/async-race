import render from '../../utils/render';
import s from './ViewTitle.module.scss';

const ViewTitle = (title: string, parentSelector: string): HTMLParagraphElement => {
  const viewTitle = render<HTMLParagraphElement>('p', s.root, parentSelector);
  viewTitle.innerText = title;
  
  return viewTitle;
};

export default ViewTitle;