import {createStore} from 'vuex';

import experimentConfigModule from './modules/experiment-config/index';

const store = createStore({
    modules: {
        experimentConfig: experimentConfigModule,
    }
});

export default store;