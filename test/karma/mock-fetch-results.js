let originalFetch = window.fetch;

/**
 * Mocks fetch requests.
 * @param {Array} results - an array of fetch response descriptions, each item
 *  of which is an array with the RegExp URL as the first item and the response
 *  JSON object as the second. Non-mocked requests are passed to the original
 *  fetch function and an error message is printed containing the result
 *  returned from the server, which can be used when developing tests for
 *  mocking these requests.
 */
function mockFetchResults(results) {
  window.fetch =
    (url, ...otherParams) => new Promise((resolve, _) => {
      const mockedItem = results?.find(
        r => r[0] instanceof RegExp ? r[0].test(url) : url.indexOf(r[0]) !== -1
      );
      const okResult = mockedItem?.[1];
      const badResult = mockedItem?.[2];

      if(okResult) {
        resolve({ json: () => okResult, ok: true });
      } else if(badResult) {
        resolve({ json: () => badResult, ok: false });
      } else {
        resolve(originalFetch.call(window, url, ...otherParams)
          .then(r => r.json())
          .then(bundle => {
            console.error(`"${url}" is not mocked and returns:\n${JSON.stringify(bundle, null, 2)}`);
            return {
              json: () => bundle
            };
          }));
      }
    });
}

/**
 * Restores the original fetch function.
 */
function restoreOriginalFetch() {
  window.fetch = originalFetch;
}

