const handleError = (e: unknown, message: string): void => {
  if (e instanceof Error) {
    throw new Error(e.message);
  } else if (typeof e === 'string') {
    throw new Error(e);
  } else {
    throw new Error(message);
  }
};

export default handleError;