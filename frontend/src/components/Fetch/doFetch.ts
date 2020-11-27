// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types
export const doFetch2 = async (
  path: ApiUrl | string,
  method: RestMethod,
  // eslint-disable-next-line @typescript-eslint/ban-types
  body: object = {},
) => {
  const response = await fetch(
    'https://localhost:44348/' + path,
    Object.assign(
      {},
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      },
      method !== RestMethod.GET ? { body: JSON.stringify(body) } : {},
    ),
  );

  return response.json();
};

export enum RestMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum ApiUrl {
  GetUserByName = '/name/',
}
