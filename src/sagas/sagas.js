import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import axios from 'axios';

function getWeather(location) {
  const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"${location}")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
  return axios.get(url)
    .then(res => res.data);
}

// one api call
function* callGetWeathger({ location, resolve, reject }) {
  const result = yield call(getWeather, location);
  console.log(result);
  if (result.query.results) {
    yield put({ type: 'FETCH_WEATHER_DONE', result });
    yield call(resolve);
  } else {
    yield call(reject, { location: 'No data for that location' });
  }
}

function* getWeatherSaga() {
  yield* takeEvery('FETCH_WEATHER', callGetWeathger);
}

export default function* root() {
  yield [
    fork(getWeatherSaga),
  ];
}

/*
function something() {
  // call api
}

function* callSomething(action) {
  const result = yield call(something, action.param);
  yield put({ type: '', result });
}

function* somethingSaga() {
  yield takeEvery('MY_ACTION', callSomething);
}
*/
