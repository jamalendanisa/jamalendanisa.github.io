import { put, takeEvery, call } from "redux-saga/effects";
import { getWeather } from "../actions";
import axios from "axios";

export function getWeatherAPI() {
  
  const url = '/weather';
  
  const config = {
    auth: {
      username: 'idealump',
      password: 'idealump'
    } 
  };

  return axios.get(url, config)
}

export function* getWeatherRequest() {
  try {
    const response = yield call(getWeatherAPI);

    if (response) {
      yield put(
        getWeather.success({
          weather: response.data
        }),
      );
    };
  } catch (error) {
    yield put(getWeather.failure(error.message));
  }
}

export default function* WeatherSaga() {
  yield takeEvery(getWeather.REQUEST, getWeatherRequest);
}