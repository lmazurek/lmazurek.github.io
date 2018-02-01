import React from 'react';
import { MaskedToken } from './MaskedToken';

export const ActionsBar = ({ token, handleOpenTokenForm, fetchPrs }) => {
  return (
    <div>
      Using Token ending with <MaskedToken token={token} />{' '}
      <button
        onClick={handleOpenTokenForm}
        style={{ backgroundColor: 'red', color: 'white' }}
      >
        Change token
      </button>
      <button onClick={fetchPrs}>Fetch PRs</button>
    </div>
  );
};
