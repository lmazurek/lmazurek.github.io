export const fetchToken = () =>
  ({
    type: 'TOKEN_FETCH',
    token: localStorage.getItem('token')
  }); 
