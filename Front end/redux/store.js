import { legacy_createStore as createStore } from 'redux';

import reducerUser from './reducer';

const store = createStore(reducerUser);

export default store;
