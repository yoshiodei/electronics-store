import React from 'react';
import { useParams } from 'react-router-dom';

export default function PaymentHeaderBox() {
  const { purpose } = useParams();
  return (
    <div className="search-info-box">
      <h4>
        Process Payment for
        {' '}
        {purpose}
      </h4>
    </div>
  );
}
