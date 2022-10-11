import {
    SET_CAMPAIGN_NAME, SET_CAMPAIGN_SERVICE_TYPE, SET_CAMPAIGN_CHARGE_TYPE,
    RESET_CAMPAIGN, SET_CAMPAIGN_CHARGE_AMOUNT, SET_CAMPAIGN_INTERNET_TYPE,
    SET_CAMPAIGN_CHANCE_AMOUNT, SET_CAMPAIGN_CHANCE_TYPE, SET_CAMPAIGN_SCORE_AMOUNT,
    SET_CAMPAIGN_FROM_TIME, SET_CAMPAIGN_FROM_DATE, SET_CAMPAIGN_TO_TIME, SET_CAMPAIGN_TO_DATE,
    SET_CAMPAIGN_SMSTEXT, SET_CAMPAIGN_RECEIVER_TYPE, SET_CAMPAIGN_ACTION_SERVICE_TYPE,
    REMOVE_CAMPAIGN_ACTION_SERVICE_TYPE, SET_CAMPAIGN_ACTION_CHARGE_TYPE, REMOVE_CAMPAIGN_ACTION_CHARGE_TYPE,
    RESET_CAMPAIGN_ACTION_CHARGE_TYPE, SET_CAMPAIGN_ACTION_CHARGE_AMOUNT, REMOVE_CAMPAIGN_ACTION_CHARGE_AMOUNT
} from '../../Common/Const/ActionConst';

let initialState;
if (localStorage.getItem('state') !== null ){
    initialState = JSON.parse(localStorage.getItem('state')).CampaignReducer;
}
else{
    initialState = {
        'campaignName': null,
        'serviceType': null,
        'chargeType': null,
        'chargeAmount': null,
        'internetType': null,
        'scoreAmount': null,
        'chanceType': null,
        'chanceAmount': null,
        'startTime': null,
        'endTime': null,
        'startDate': null,
        'endDate': null,
        'receiverType': null,
        'smsText': null,
        'actionServiceType': [],
        'actionChargeType': [],
        'actionChargePrice': []
    };
}

function CampaignReducer(state = initialState , action) {

    switch (action.type) {
    
        case SET_CAMPAIGN_NAME:
            return Object.assign({}, state, {
                campaignName: action.data
            });
        case SET_CAMPAIGN_SERVICE_TYPE:
            return Object.assign({}, state, {
                serviceType: action.data
            });
        case SET_CAMPAIGN_CHARGE_TYPE:
            return Object.assign({}, state, {
                chargeType: action.data
            });
        case SET_CAMPAIGN_CHARGE_AMOUNT:
            return Object.assign({}, state, {
                chargeAmount: action.data
            });

        case SET_CAMPAIGN_INTERNET_TYPE:
            return Object.assign({}, state, {
                internetType: action.data
            });

        case SET_CAMPAIGN_CHANCE_TYPE:
            return Object.assign({}, state, {
                chanceType: action.data
            });
        case SET_CAMPAIGN_CHANCE_AMOUNT:
            return Object.assign({}, state, {
                chanceAmount: action.data
            });
        case SET_CAMPAIGN_SCORE_AMOUNT:
            return Object.assign({}, state, {
                scoreAmount: action.data
            });

        case SET_CAMPAIGN_FROM_TIME:
            return Object.assign({}, state, {
                startTime: action.data
            });
        case SET_CAMPAIGN_TO_TIME:
            return Object.assign({}, state, {
                endTime: action.data
            });
        case SET_CAMPAIGN_FROM_DATE:
            return Object.assign({}, state, {
                startDate: action.data
            });
        case SET_CAMPAIGN_TO_DATE:
            return Object.assign({}, state, {
                endDate: action.data
            });

        case SET_CAMPAIGN_SMSTEXT:
            return Object.assign({}, state, {
                smsText: action.data
            });
        case SET_CAMPAIGN_RECEIVER_TYPE:
            return Object.assign({}, state, {
                receiverType: action.data
            });
        case RESET_CAMPAIGN:
            return Object.assign({}, state, {
                campaignName: null,
                serviceType: null,
                chargeType: null,
                chargeAmount: null,
                internetType: null,
                scoreAmount: null,
                chanceType: null,
                chanceAmount: null,
                startTime: null,
                endTime: null,
                startDate: null,
                endDate: null,
                receiverType: null,
                smsText: null,
                actionServiceType: [],
                actionChargeType: [],
                actionChargePrice: []
            });


            // Action Functions
        case SET_CAMPAIGN_ACTION_SERVICE_TYPE :
            return { 
                ...state,
                actionServiceType: [...state.actionServiceType, action.data]
            }
        case REMOVE_CAMPAIGN_ACTION_SERVICE_TYPE :
            return {
                ...state,
                actionServiceType: state.actionServiceType.filter(obj => obj !== action.data)
            }
        case SET_CAMPAIGN_ACTION_CHARGE_TYPE :
            return { 
                ...state,
                actionChargeType: [...state.actionChargeType, action.data]
            }
        case REMOVE_CAMPAIGN_ACTION_CHARGE_TYPE :
            return {
                ...state,
                actionChargeType: state.actionChargeType.filter(obj => obj !== action.data)
            }
        case RESET_CAMPAIGN_ACTION_CHARGE_TYPE :
            return {
                ...state,
                actionChargeType: []
            }
        case SET_CAMPAIGN_ACTION_CHARGE_AMOUNT :
            return { 
                ...state,
                actionChargePrice: [...state.actionChargePrice, action.data]
            }
        case REMOVE_CAMPAIGN_ACTION_CHARGE_AMOUNT :
            return {
                ...state,
                actionChargePrice: state.actionChargePrice.filter(obj => obj !== action.data)
            }

        default:
            return state;
    }
}

export default CampaignReducer;
