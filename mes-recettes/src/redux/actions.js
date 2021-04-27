export const actionsType = {
  SET_LIST: 'SET_LIST'
};

export const setList = list => ({
  type: actionsType.SET_LIST,
  list: list
});
