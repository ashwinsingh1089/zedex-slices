import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ slicemasters, loading }) {
  if (loading) {
    return <LoadingGrid />;
  }
  if (!slicemasters || !slicemasters.length) {
    return <p>No active slicemasters</p>;
  }
  return (
    <div>
      <h2>
        <span className="mark tilt">SliceMasters ON</span>
      </h2>
      <ItemGrid items={slicemasters} />
    </div>
  );
}
function HotSlices({ hotSlices, loading }) {
  if (loading) {
    return <LoadingGrid count={4} />;
  }
  if (!hotSlices || !hotSlices.length) {
    return <p>No HotSlices available</p>;
  }
  return <ItemGrid items={hotSlices} />;
}
export default function HomePage() {
  const { hotSlices, slicemasters, loading } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza DownTown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing loading={loading} slicemasters={slicemasters} />
        <HotSlices loading={loading} hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
