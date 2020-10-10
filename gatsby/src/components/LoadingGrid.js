import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function LoadingGrid({ count = 8 }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles key={`loading${i}`}>
          <p className="mark">Loading..</p>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP88utXPQAJOwNppZR+FQAAAABJRU5ErkJggg=="
            className="loading"
            alt="loading"
            width="500"
            height="400"
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
