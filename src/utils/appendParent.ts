const appendParent = <T extends HTMLElement | HTMLElement[]>(
  element: T,
  parentSelector?: string,
  type: 'append' | 'prepend' = 'append',
): T => {
  let parent: HTMLElement;

  if (parentSelector && document.querySelector(parentSelector)) {
    parent = document.querySelector(parentSelector) as HTMLElement;
  } else {
    parent = document.querySelector('body') as HTMLElement;
  }

  if (element instanceof Array) {
    if (type === 'append') element.forEach((el) => parent.append(el));
    if (type === 'prepend') element.forEach((el) => parent.prepend(el));
  } else {
    if (type === 'append') parent.append(element);
    if (type === 'prepend') parent.prepend(element);
  }

  return element;
};

export default appendParent;
