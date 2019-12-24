import { all, fork } from "redux-saga/effects";

import WeatherSaga from "./weather";
import ShopNewsSaga from "./shop-news";
import CMSNewsSaga from "./cms-news";

export default function* rootSaga() {
  yield all([
    fork(WeatherSaga),
    fork(ShopNewsSaga),
    fork(CMSNewsSaga)
  ])
}