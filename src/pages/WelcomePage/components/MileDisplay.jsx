import React from 'react';

export default function MileDisplay({ miles }) {
  if (miles > 60) {
    return (<h5>Find all items</h5>);
  }

  if (miles < 10) {
    return (<h5>Find all items within a mile</h5>);
  }

  return (
    <h5>
      Find all items within
      {' '}
      {miles}
      {' '}
      miles
    </h5>
  );
}
