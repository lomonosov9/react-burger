export const customMiddleware =
  () =>
  (state) =>
  (next) =>
  (action) => {
    console.log("previous state: ", state.getState())
    console.log("will dispatch action: ", action.type)
    console.log("next :", next)
    next(action)
  };