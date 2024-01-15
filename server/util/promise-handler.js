/**
 * The function `handlePromisesSequentially` takes an array of items and a function, and executes the
 * function on each item sequentially, returning an array of results, errors, and failed items.
 * @param items - The `items` parameter is an array of items that you want to process sequentially
 * using the provided function `fn`. Each item in the array will be passed as an argument to the
 * function `fn`.
 * @param fn - The `fn` parameter is a function that will be called for each item in the `items` array.
 * It is expected to return a promise.
 * @returns The function `handlePromisesSequentially` returns an array containing three elements:
 * `results`, `errors`, and `failedItems`.
 */
async function handlePromisesSequentially(items, fn, options = null) {
  const results = [];
  const errors = [];
  const failedItems = [];

  for (let item of items) {
    try {
      const result = !options ? await fn(item) : await fn(item, options);
      results.push(result);
    } catch (error) {
      errors.push(error);

      failedItems.push(item);
    }
  }

  return [errors, results, failedItems];
}

module.exports = {
  handlePromisesSequentially,
};
