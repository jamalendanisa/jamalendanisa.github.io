import { put, takeEvery, call } from "redux-saga/effects";
import { getCMSNews } from "../actions";

export function getCMSNewsAPI() {
 
  const url = '/news/?page=0&limit=10';

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
 
export function* getCMSNewsRequest() {
  try {
    const response = yield call(getCMSNewsAPI);
 
    if (response) {
      yield put(
        getCMSNews.success({
          cmsNews: response.rows
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