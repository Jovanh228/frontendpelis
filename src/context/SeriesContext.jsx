import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import {
    createSeriesRequest,
    getSeriesRequest,
    deleteSeriesRequest,
    getSerieRequest,
    updateSeriesRequest,
    updateSeriesRequestNoUpdateImage
} from "../api/series";

const SeriesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSeries = () => {
    const context = useContext(SeriesContext);

    if (!context) {
        throw new Error('useSeries debe estar definido dentro de un SeriesProvider');
    }
    return context;
};

export function SeriesProvider({ children }) {
    const [series, setSeries] = useState([]);

    const createSeries = async (serie) => {
        try {
            await createSeriesRequest(serie);
            getSeries();
        } catch (error) {
            console.log(error);
        }
    };

    const getSeries = async () => {
        try {
            const res = await getSeriesRequest();
            setSeries(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteSeries = async (id) => {
        try {
            const res = await deleteSeriesRequest(id);
            if (res.status === 200) {
                setSeries(series.filter((serie) => serie._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSerie = async (id) => {
        try {
            const res = await getSerieRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateSeries = async (id, serie) => {
        try {
            const res = await updateSeriesRequest(id, serie);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const updateSeriesNoUpdateImage = async (id, serie) => {
        try {
            const res = await updateSeriesRequestNoUpdateImage(id, serie);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SeriesContext.Provider
            value={{
                series,
                createSeries,
                getSeries,
                deleteSeries,
                getSerie,
                updateSeries,
                updateSeriesNoUpdateImage
            }}
        >
            {children}
        </SeriesContext.Provider>
    );
}

SeriesProvider.propTypes = {
    children: PropTypes.any,
};
