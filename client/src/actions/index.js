import axios from 'axios';
import types from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: types.FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: types.FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: types.FETCH_SURVEYS, payload: res.data });
};

export const submitSurvey = (vals, history) => async dispatch => {
    const res = await axios.post('/api/surveys', vals);
    history.push('/surveys');
    dispatch({ type: types.SEND_SURVEY, payload: res.data });
};
