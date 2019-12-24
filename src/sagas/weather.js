import { put, takeEvery, call } from "redux-saga/effects";
import { getWeather } from "../actions";

export function getWeatherAPI() {
  
  const url = '/weather';

  let http = new XMLHttpRequest();                   
  http.open("get", url, false, 'idealump', 'idealump');
  http.withCredentials = true;
  http.send("");
  if (http.status === 200) {
      return JSON.parse(http.response);
  } else {
      console.log("Authentication failed.");
  }
}

export function* getWeatherRequest() {
  try {
    const response = yield call(getWeatherAPI);

    if (response) {
      yield put(
        getWeather.success({
          weather: response
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