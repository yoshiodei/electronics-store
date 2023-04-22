import React from 'react';

export default function SectionHeader({ children }) {
  return (
    <div className="section-header d-flex align-items-end">
      <div className="section-header__div d-flex align-items-center">
        <h6>{ children }</h6>
      </div>
      <div className="section-header__line" />
    </div>
  );
}
