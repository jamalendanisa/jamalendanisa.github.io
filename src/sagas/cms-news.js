import { put, takeEvery, call } from "redux-saga/effects";
import { getCMSNews } from "../actions";
import axios from "axios";

export function getCMSNewsAPI() {
 
  const url = '/news/?page=0&limit=10';

  const config = {
    auth: {
      username: 'idealump',
      password: 'idealump'
    } 
  };

  return axios.get(url, config)
} 
 
export function* getCMSNewsRequest() {
  try {
    const response = yield call(getCMSNewsAPI);
 
    if (response) {
      yield put(
        getCMSNews.success({
          cmsNews: response.data.rows
        }),
      );
    };
  } catch (error) {
    yield put(getCMSNews.failure(error.message));
  }
}

export default function* CMSNewsSaga() {
  yield takeEvery(getCMSNews.REQUEST, getCMSNewsRequest);
}