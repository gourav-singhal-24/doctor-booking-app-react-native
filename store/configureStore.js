import { createStore,applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const logger = createLogger();
const store = compose( applyMiddleware(logger, promise, thunk), autoRehydrate() )(createStore)(rootReducer);

export default store; 