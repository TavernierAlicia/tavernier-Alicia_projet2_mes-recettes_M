import { actionsType } from '../actions';

let recipeList = [];

const setList = (state, action) => {
  recipeList = action.list;
  return recipeList;
};

export const recipesList = (state = recipeList, action) => {
  switch (action.type) {
    case actionsType.SET_LIST:
      return setList(state, action);
    default:
      return state;
  }
};