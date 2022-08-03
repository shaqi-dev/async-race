const getPaginatorButtonsStatus = (
  totalItems: number,
  currentPage: number,
  perPage: number,
): [boolean, boolean] => {
  const isFirstPage: boolean = currentPage === 1;
  const isLastPage: boolean = totalItems / (currentPage * perPage) <= 1;

  let prevDisabled: boolean;
  let nextDisabled: boolean;

  if (isFirstPage) {
    prevDisabled = true;
  } else {
    prevDisabled = false;
  }

  if (isLastPage) {
    nextDisabled = true;
  } else {
    nextDisabled = false;
  }

  return [prevDisabled, nextDisabled];
};

export default getPaginatorButtonsStatus;
