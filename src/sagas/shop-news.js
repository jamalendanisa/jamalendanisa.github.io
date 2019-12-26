import { put, takeEvery, call } from "redux-saga/effects";
import { getShopNews } from "../actions";
import moment from "moment"
import axios from "axios";

export function getShopNewsAPI() {
  const url = '/datascraped';

  const config = {
    auth: {
      username: 'idealump',
      password: 'idealump'
    } 
   };

  return axios.get(url, config)
}

export function* getShopNewsRequest() {
  try {
    const response = yield call(getShopNewsAPI);
    let data = JSON.parse(response.data[0].data);
    data.sort((a, b) => (moment(a.date) < moment(b.date)) ? 1 : -1);
    
    if (response) {
      yield put(
        getShopNews.success({
          shopNews: data
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