import render from '../../utils/render';
import s from './ViewTitle.module.scss';

const ViewTitle = (title: string, parent: string | HTMLElement): HTMLParagraphElement => {
  const viewTitle = render<HTMLParagraphElement>('p', s.root, parent, title);

  return viewTitle;
};

export default ViewTitle;
