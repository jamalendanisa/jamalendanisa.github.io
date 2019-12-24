import { put, takeEvery, call } from "redux-saga/effects";
import { getShopNews } from "../actions";
import "../services/shopNews";

export function getShopNewsAPI() {
  const url = '/datascraped';

  var http = new XMLHttpRequest();                   
  http.open("get", url, false, 'idealump', 'idealump');
  http.withCredentials = true;
  http.send("");
  if (http.status === 200) {
      return JSON.parse(http.response);
  } else {
      console.log("Authentication failed.");
  }
}

export function* getShopNewsRequest() {
  try {
    //const response = yield call(getShopNewsAPI);
    let response = window.SeedShopNews.data;
    //console.log(response)
    if (response) {
      yield put(
        getShopNews.success({
          shopNews: response
        }),
      );
    };
  } catch (error) {
    yield put(getShopNews.failure(error.message));
  }
}

export default function* ShopNewsSaga() {
  yield takeEvery(getShopNews.REQUEST, getShopNewsRequest);
}