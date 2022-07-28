const appendParent = <T extends HTMLElement>(
  element: T,
  parentSelector?: string,
): T => {
  let parent: HTMLElement;

  if (parentSelector && document.querySelector(parentSelector)) {
    parent = document.querySelector(parentSelector) as HTMLElement;
  } else {
    parent = document.querySelector('body') as HTMLElement;
  }

  parent.append(element);

  return element;
};

export default appendParent;
