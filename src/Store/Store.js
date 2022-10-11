
import { createStore,combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AppReducer from "../Redux/Reducers/AppReducer";
import CampaignReducer from "../Redux/Reducers/CampaignReducer";

const composeenhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(combineReducers({
            AppReducer: AppReducer,
            CampaignReducer: CampaignReducer

        }),
        composeenhance(applyMiddleware(ReduxThunk))
    );
    return store;
}
