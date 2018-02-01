import React from 'react';
import { PrLink } from './PrLink';

export const PrsList = ({ prs }) => {
  return (
    <ul>
      {prs.map(pr => (
        <PrLink
          prNumber={pr.number}
          createdAt={pr.created_at}
          updatedAt={pr.updated_at}
          key={pr.id}
        />
      ))}

      {prs.length === 0 && (
        <li>
          No active PRs <br />(probably all translations are merged)
        </li>
      )}
    </ul>
  );
};
