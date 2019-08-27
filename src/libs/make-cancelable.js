/**
 * @typedef CancelaBlePromise
 * @property {Promise} promise
 * @property {Function} cancel
 */

/**
 * Has a promise cancellable
 *
 * Based on: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 *
 * @param {Promise} promise
 *
 * @return {CancelaBlePromise}
 */
function makeCancelable(promise) {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export {
  makeCancelable as default,
}
