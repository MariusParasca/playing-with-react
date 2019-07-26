const initialState = {
  counter: 0,
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
        const newState = Object.assign({}, state);
        newState.counter = state.counter + 1;
        return newState;
      return {
        counter: state.counter + 1
      };
    case "DECREMENT":
      return {
        counter: state.counter + -1
      };
    case "ADD":
      return {
        counter: state.counter + action.val
      };
    case "SUBTRACT":
      return {
        counter: state.counter - action.val
      };
    case "STORE_RESULT":
        return {

        }
    default:
      return state;
  }
};

export default reducer;
