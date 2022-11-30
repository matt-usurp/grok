import { createHttpTransport, HttpTransport } from './transport';

describe('createHttpTransport()', (): void => {
  it('with transport, barebones', (): void => {
    type Transport = HttpTransport<200, undefined, undefined>;

    expect(
      createHttpTransport<Transport>({
        status: 200,
      }),
    ).toStrictEqual<Transport>({
      status: 200,
      headers: undefined,
      body: undefined,
    });
  });

  it('with transport, with body', (): void => {
    type Transport = HttpTransport<200, 'something', undefined>;

    expect(
      createHttpTransport<Transport>({
        status: 200,
        body: 'something',
      }),
    ).toStrictEqual<Transport>({
      status: 200,
      headers: undefined,
      body: 'something',
    });
  });
});
