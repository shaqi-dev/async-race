export const unexpectedStatus = (fnName: string): Error =>
  new Error(`Cannot ${fnName}, get: UNEXPECTED_RESPONSE_STATUS`);

export const notFound = (fnName: string): Error => new Error(`Cannot ${fnName}, get: NOT_FOUND`);

export const badRequest = (fnName: string): Error =>
  new Error(`Cannot ${fnName}, get: BAD_REQUEST`);

export const tooManyRequests = (fnName: string): Error =>
  new Error(`Cannot ${fnName}, get: TOO_MANY_REQUESTS`);

export const internalError = (fnName: string): Error =>
  new Error(`Cannot ${fnName}, get: INTERNAL_SERVER_ERROR`);
