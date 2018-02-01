import React from 'react';

export const MaskedToken = ({token}) => {
  const maskedToken = token ? token.replace(/.+([\w]{4})$/i, '$1') : '';
  return <span>****{maskedToken}</span>;
};
