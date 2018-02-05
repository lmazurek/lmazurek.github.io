const prWatch = (state, action) => {
  switch (action.type) {
    case 'TOKEN_FETCH':
      return {
        ...state,
        token: action.token
      };

    default:
      return state;
  }
};

export default prWatch;
