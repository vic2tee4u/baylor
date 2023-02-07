import { all } from 'redux-saga/effects';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './root-reducer';

import authenticationSaga from './authentication/saga';

const errorMiddleWare = (store: any) => (next: any) => (action: any) => {
    if (action.meta && action.meta.errorStatus && action.meta.errorStatus === 401) {
        const { refreshingToken } = store.getState().tokenRefresh;
        if (action.type === 'REFRESH_TOKEN' && refreshingToken) {
            return;
        }
        if (action.type !== 'REFRESH_TOKEN' && !refreshingToken) {
            store.dispatch({ type: 'REFRESH_TOKEN' });
        }
        return;
    }
    next(action);
};

const effectsMiddleware = (next: any) => (effect: any) => {
    if (effect.type === 'PUT') {
        const { action } = effect.payload;
        const status = action.payload && action.payload.status;
        if (status === 401) {
            const effect401 = {
                ...effect,
                payload: {
                    ...effect.payload,
                    action: {
                        ...action,
                        meta: { errorStatus: 401 },
                    },
                },
            };
            return next(effect401);
        }
        return next(effect);
    }
    return next(effect);
};

const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25,
});

const sagaMiddleWare = createSagaMiddleware({
    effectMiddlewares: [effectsMiddleware],
});

const store: any = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleWare, errorMiddleWare)));

export default function* rootSaga() {
    yield all([authenticationSaga()]);
}

sagaMiddleWare.run(rootSaga);

export { store };
