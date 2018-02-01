import React from 'react';

export const TokenForm = ({tokenInput, handleChange, save}) => {
  return (
    <div>
      <input
        type="text"
        value={tokenInput}
        onChange={handleChange}
      />
      <button onClick={save}>Set token</button>
    </div>
  );
};
