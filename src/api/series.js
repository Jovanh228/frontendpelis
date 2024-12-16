import axios from './axios';

export const getSeriesRequest = () => axios.get('/series');

export const getSerieRequest = (id) => axios.get(`/series/${id}`);

export const createSeriesRequest = (series) => axios.post('/series', series, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const deleteSeriesRequest = (id) => axios.delete('/series/' + id);

export const updateSeriesRequest = (id, series) => axios.put('/series/' + id, series, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export const updateSeriesRequestNoUpdateImage = (id, series) => axios.put('/seriesupdatenoimage/' + id, series);
