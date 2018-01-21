import React from 'react';
import styles from './PrLink.css';

const PrLink = ({ prNumber, createdAt, updatedAt }) => {
  const url = `http://${prNumber}.jaacoo-front.integration.devguru.co/`;
  return (
    <li className="prLinkItem">
      <a href={url} target="_blank" className="prLink">
        <strong>PR {prNumber}</strong>
      </a>
      <br />
      <small>
        <em>published: {createdAt}</em>, <em>updated: {updatedAt}</em>
      </small>
    </li>
  );
};

export { PrLink };
