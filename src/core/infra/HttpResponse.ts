export type HttpResponse = {
  status: number;
  body: any;
};

export function created(): HttpResponse {
  return {
    status: 201,
    body: undefined,
  };
}

export function clientError(error: Error): HttpResponse {
  return {
    status: 400,
    body: {
      error: error.message,
    },
  };
}

export function conflict(error: Error): HttpResponse {
  return {
    status: 409,
    body: {
      error: error.message,
    },
  };
}

export function fail(error: Error): HttpResponse {
  console.log(error);

  return {
    status: 500,
    body: {
      error: error.message,
    },
  };
}
