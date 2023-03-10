export const customMiddleware =
  () =>
  (state) =>
  (next) =>
  (action) => {
    next(action)
  };