import { createRoutine } from "redux-saga-routines";

export const GET_WEATHER = "GET_WEATHER";
export const getWeather = createRoutine(GET_WEATHER);

export const GET_SHOP_NEWS = "GET_SHOP_NEWS";
export const getShopNews = createRoutine(GET_SHOP_NEWS);

export const GET_CMS_NEWS = "GET_CMS_NEWS";
export const getCMSNews = createRoutine(GET_CMS_NEWS);
