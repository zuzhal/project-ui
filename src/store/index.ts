import {createStore} from 'vuex';

import experimentConfigModule from './modules/experiment-config/experiment-config';
import experimentsModule from './modules/experiments';
import authenticationModule from '././modules/authentication';
import loaderModule from '././modules/loader';

const store = createStore({
    modules: {
        experimentConfig: experimentConfigModule,
        experiments: experimentsModule,
        authentication: authenticationModule,
        loader: loaderModule,
    }
});

export default store;