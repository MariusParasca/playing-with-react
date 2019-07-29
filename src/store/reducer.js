import * as actionsType from "./actions";

const initialState = {
  persons: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ADD_PERSON:
      const newPerson = {
        id: Math.random(), // not really unique but good enough here!
        name: action.personData.name,
        age: action.personData.age
      };
      return { ...state, persons: state.persons.concat(newPerson) };
    case actionsType.DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(person => person.id !== action.personId)
      };
    default:
      return state;
  }
};

export default reducer;
