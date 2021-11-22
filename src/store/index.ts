import {createStore} from 'vuex';

import experimentConfigModule from './modules/experiment-config/experiment-config';
import experimentsModule from './modules/experiments';

const store = createStore({
    modules: {
        experimentConfig: experimentConfigModule,
        experiments: experimentsModule
    }
});

export default store;