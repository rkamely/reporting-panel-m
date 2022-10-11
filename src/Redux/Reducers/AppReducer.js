import {
    IS_AUTHENTICATED, IS_LOGIN_PENDING, GET_USER_INFORMATION,
    GET_ERROR_FROM_API, CALCULATE_LOADING, CHANGE_OPERATOR_TYPE, ACTIVE_NIGHT_MODE
} from '../../Common/Const/ActionConst';

let initialState;
if (localStorage.getItem('state') !== null ){
    initialState = JSON.parse(localStorage.getItem('state')).AppReducer;
}
else{
    initialState = {
        isLoginSuccess: false,
        isLoginPending: false,
        hasAuthenticated: false,
        userInfo: {},
        operatorType: 'MTN',
        campaignInfo: {
            'campaignName': null,
            'serviceType': null,
            'chargeType': null,
            'chargeAmount': null,
            'internetType': null,
            'scoreAmount': null,
            'lottaryType': null,
            'chanceAmount': null,
            'startTime': null,
            'endTime': null,
            'startDate': null,
            'endDate': null,
            'receiverType': null,
            'smsText': null,
            'actionServiceType': [],
            'actionChargeType': null,
            'actionChargePrice': null
        }
    };
}

function AppReducer(state = initialState , action) {

    switch (action.type) {
        case IS_LOGIN_PENDING:
            return Object.assign({}, state, {
                isLoginPending: action.isLoginPending
            });
        case IS_AUTHENTICATED:
            return Object.assign({}, state, {
                hasAuthenticated: action.authenStatus
            });
        case GET_USER_INFORMATION:
            return Object.assign({}, state, {
                userInfo: action.data
            });

        case GET_ERROR_FROM_API:
            return Object.assign({}, state, {
                getErrors: action.data
            });
        case CALCULATE_LOADING:
            return Object.assign({}, state, {
                calculateLoading: action.data
            });

        case CHANGE_OPERATOR_TYPE:
            return Object.assign({}, state, {
                operatorType: action.data
            })
        case ACTIVE_NIGHT_MODE:
            return Object.assign({}, state, {
                nightMode: action.data
            });
        
        default:
            return state;
    }
}

export default AppReducer;
