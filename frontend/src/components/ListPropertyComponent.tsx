import React from "react";
import { Link } from "react-router-dom";

function ListPropertyComponent() {
  return (
    <div>
      <h1 className="text-3xl font-bold">List Your Property</h1>
      <div className="flex flex-wrap">
        <div className="flex-grow font-medium text-lg">
        <p>
          Maximise the Success of Your Holiday Home with Yogban Holidays:
          <br />A Partnership of Trust
        </p>
        </div>
        <div>
          <Link to="/list-your-property" className="flex-grow-0 p-6 bg-red-700 text-white rounded-md">List Your Property</Link>
        </div>
      </div>
    </div>
  );
}

export default ListPropertyComponent;
