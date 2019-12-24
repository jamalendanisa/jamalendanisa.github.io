import { handleActions } from "redux-actions";

import { getShopNews, getCMSNews, getWeather } from "../actions";

const INITIAL_STATE = {
    weather: [],
    shopNews: [],
    cmsNews: [],
    weatherPending: true,
    weatherError: false,
    shopPending: true,
    shopError: false,
    cmsPending: true,
    csmError: false,
}

const news = handleActions(
  {
    [getWeather.REQUEST]: state => ({
        ...state
    }),
    [getWeather.SUCCESS]: (state, { payload }) => ({
      ...state,
      weather: payload.weather,
      weatherPending: false
    }),
    [getWeather.FAILURE]: state => ({
      ...state,
      weatherError: true,
      weatherPending: false
    }),
    [getShopNews.REQUEST]: state => ({
        ...state
    }),
    [getShopNews.SUCCESS]: (state, { payload }) => ({
      ...state,
      shopNews: payload.shopNews,
      shopPending: false
    }),
    [getShopNews.FAILURE]: state => ({
      ...state,
      shopError: true,
      shopPending: false
    }),
    [getCMSNews.REQUEST]: state => ({
        ...state
    }),
    [getCMSNews.SUCCESS]: (state, { payload }) => ({
      ...state,
      cmsNews: payload.cmsNews,
      cmsPending: false
    }),
    [getCMSNews.FAILURE]: state => ({
      ...state,
      cmsError: true,
      cmsPending: false
    }),
  },
  INITIAL_STATE,
);

export default news;