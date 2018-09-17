import { connect } from 'connector';
import { App } from './App';

export default connect(App, ({ culture }, actions) => ({
    culture,
    changeCultureTo(cultureCode) { actions.REQUEST_CULTURE(cultureCode); }
}));
