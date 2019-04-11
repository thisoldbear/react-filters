import React from 'react';

const Album = ({ title, year, label }) => (
  <div>
    <p><strong>Title:</strong> {title}</p>
    <p><strong>Year:</strong> {year}</p>
    <p><strong>Label:</strong> {label}</p>
    <hr />
  </div>
);

export default Album;
