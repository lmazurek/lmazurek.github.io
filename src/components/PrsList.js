import React from 'react';
import { PrLink } from './PrLink';

export const PrsList = ({ username, prs }) => {
  return (
    <div>
      <p>
        <strong>{username}</strong> pull requests:
      </p>
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
    </div>
  );
};
