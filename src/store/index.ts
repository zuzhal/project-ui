import {createStore} from 'vuex';

import experimentConfigModule from './modules/experiment-config';
import experimentsModule from './modules/experiments';
import authenticationModule from '././modules/authentication';
import loaderModule from '././modules/loader';
import experimentLogging from './modules/experiment-logging';

const store = createStore({
    modules: {
        experimentConfig: experimentConfigModule,
        experiments: experimentsModule,
        authentication: authenticationModule,
        loader: loaderModule,
        experimentLogger: experimentLogging,
    }
});

export default store;