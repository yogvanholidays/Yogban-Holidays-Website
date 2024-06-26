import { Link } from "react-router-dom";

function ListPropertyComponent() {
  return (
    <section className="space-y-3 mb-12">
      <h1 className="text-3xl font-bold">List Your Property</h1>
      <div className="flex flex-wrap">
        <div className="flex-grow font-medium text-lg">
        <p>
          Maximise the Success of Your Holiday Home with Yogvan Holidays:
          <br />A Partnership of Trust
        </p>
        </div>
        <div>
          <Link to="/list-your-property" className="flex-grow-0 p-6 transition-all duration-200 hover:bg-yogvan-dark bg-yogvan text-white rounded-md">List Your Property</Link>
        </div>
      </div>
    </section>
  );
}

export default ListPropertyComponent;
