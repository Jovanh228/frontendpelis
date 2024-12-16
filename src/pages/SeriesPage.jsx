import { useEffect } from "react";
import { useSeries } from "../context/SeriesContext";
import SeriesCard from "../components/SeriesCard";

function SeriesPage() {

  const { getSeries, series } = useSeries();

  useEffect(() => {
    getSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (series.length === 0)
    return (
      <h1>
        No hay series para listar
      </h1>
    );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {
        series.map((serie) => (
          <SeriesCard series={serie} key={serie._id} />
        ))
      }
    </div>
  );
}

export default SeriesPage;
