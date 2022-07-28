const render = <T extends HTMLElement>(
  tag: string,
  className?: string,
  parentSelector?: string,
): T => {
  const element = document.createElement(tag) as T;
  let parent: HTMLElement;

  if (className) element.classList.add(className);

  if (parentSelector && document.querySelector(parentSelector)) {
    parent = document.querySelector(parentSelector) as HTMLElement;
  } else {
    parent = document.querySelector('body') as HTMLElement;
  }

  parent.append(element);

  return element;
};

export default render;
