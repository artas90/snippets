class PromiseCancelError extends Error {}

export function cancelablePromise(initialPromise: Promise) {
  let rejectFn: Function;
  const cancelPromise = new Promise((resolve, reject) => rejectFn = reject);
  return {
    promise: Promise.race([initialPromise, cancelPromise]),
    cancel: () => rejectFn(new PromiseCancelError())
  };
}
