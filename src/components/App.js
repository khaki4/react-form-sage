import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Main from './Main';

const App = connect(
  (state) => ({
    weather: state.weather,
    form: state.form,
  }),
  { ...actionCreators },
  )(Main);

export default App;
