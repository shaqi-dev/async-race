const render = <T extends HTMLElement>(
  tag: string,
  className?: string | Array<string | undefined> | null,
  parent?: string | HTMLElement,
  innerText?: string,
): T => {
  const element = document.createElement(tag) as T;
  if (className) {
    if (typeof className === 'string') {
      element.classList.add(className);
    } else {
      const actual = className.filter((x) => x !== undefined) as string[];
      if (actual.length > 0) element.classList.add(...actual);
    }
  }
  if (innerText) element.innerText = innerText;

  let root: HTMLElement;

  if (parent) {
    if (typeof parent === 'string' && document.querySelector(parent)) {
      root = document.querySelector(parent) as HTMLElement;
    } else if (parent instanceof HTMLElement) {
      root = parent;
    } else {
      root = document.querySelector('body') as HTMLElement;
    }
  } else {
    root = document.querySelector('body') as HTMLElement;
  }

  root.append(element);

  return element;
};

export default render;
