export type Parent = string | HTMLElement;

const render = <T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  className?: string | Array<string | undefined> | null,
  parent?: string | HTMLElement | undefined,
  innerText?: string,
): T => {
  const element = document.createElement(tag) as T;

  if (innerText) element.innerText = innerText;

  if (className) {
    if (typeof className === 'string') {
      element.classList.add(className);
    } else {
      const actual = className.filter((x) => x !== undefined) as string[];
      if (actual.length > 0) element.classList.add(...actual);
    }
  }

  if (parent) {
    let root: HTMLElement;

    if (typeof parent === 'string' && document.querySelector(parent)) {
      root = document.querySelector(parent) as HTMLElement;
      root.append(element);
    } else if (parent instanceof HTMLElement) {
      root = parent;
      root.append(element);
    }
  }

  return element;
};

export default render;
