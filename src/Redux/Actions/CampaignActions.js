import {
     SET_CAMPAIGN_NAME, SET_CAMPAIGN_SERVICE_TYPE, SET_CAMPAIGN_CHARGE_TYPE,
     RESET_CAMPAIGN, SET_CAMPAIGN_CHARGE_AMOUNT, SET_CAMPAIGN_INTERNET_TYPE,
     SET_CAMPAIGN_CHANCE_AMOUNT, SET_CAMPAIGN_CHANCE_TYPE, SET_CAMPAIGN_SCORE_AMOUNT, 
     SET_CAMPAIGN_FROM_TIME, SET_CAMPAIGN_TO_TIME, SET_CAMPAIGN_FROM_DATE, SET_CAMPAIGN_TO_DATE,
     SET_CAMPAIGN_SMSTEXT, SET_CAMPAIGN_RECEIVER_TYPE, SET_CAMPAIGN_ACTION_SERVICE_TYPE,
     REMOVE_CAMPAIGN_ACTION_SERVICE_TYPE, SET_CAMPAIGN_ACTION_CHARGE_TYPE, REMOVE_CAMPAIGN_ACTION_CHARGE_TYPE,
     RESET_CAMPAIGN_ACTION_CHARGE_TYPE, SET_CAMPAIGN_ACTION_CHARGE_AMOUNT, REMOVE_CAMPAIGN_ACTION_CHARGE_AMOUNT
} from '../../Common/Const/ActionConst';


export const setCampaignNameFunc = (data) => ({
    type: SET_CAMPAIGN_NAME,
    data
});
export const setCampaignServiceType = (data) => ({
    type: SET_CAMPAIGN_SERVICE_TYPE,
    data
});
export const setCampaignChargeType = (data) => ({
    type: SET_CAMPAIGN_CHARGE_TYPE,
    data
});
export const setCampaignChargeAmount = (data) => ({
    type: SET_CAMPAIGN_CHARGE_AMOUNT,
    data
});
export const setCampaignInternetType = (data) => ({
    type: SET_CAMPAIGN_INTERNET_TYPE,
    data
});
export const setCampaignChanceType = (data) => ({
    type: SET_CAMPAIGN_CHANCE_TYPE,
    data
});
export const setCampaignReceiverType = (data) => ({
    type: SET_CAMPAIGN_RECEIVER_TYPE,
    data
});
export const setCampaignChanceAmount = (data) => ({
    type: SET_CAMPAIGN_CHANCE_AMOUNT,
    data
});
export const setCampaignScoreAmount = (data) => ({
    type: SET_CAMPAIGN_SCORE_AMOUNT,
    data
});
export const setFromTime = (data) => ({
    type: SET_CAMPAIGN_FROM_TIME,
    data
});
export const setToTime = (data) => ({
    type: SET_CAMPAIGN_TO_TIME,
    data
});
export const setFromDateFunc = (data) => ({
    type: SET_CAMPAIGN_FROM_DATE,
    data
});
export const setToDateFunc = (data) => ({
    type: SET_CAMPAIGN_TO_DATE,
    data
});
export const setSMSTextFunc = (data) => ({
    type: SET_CAMPAIGN_SMSTEXT,
    data
});
export const setServiceOfActionCampaign = (data) => ({
    type: SET_CAMPAIGN_ACTION_SERVICE_TYPE,
    data
});
export const removeServiceOfActionCampaign = (data) => ({
    type: REMOVE_CAMPAIGN_ACTION_SERVICE_TYPE,
    data
});
export const resetCampaign = () => ({
    type: RESET_CAMPAIGN
});

export const setActionChargeType = (data) => ({
    type: SET_CAMPAIGN_ACTION_CHARGE_TYPE,
    data
});
export const removeActionChargeType = (data) => ({
    type: REMOVE_CAMPAIGN_ACTION_CHARGE_TYPE,
    data
});

export const setActionChargeAmount = (data) => ({
    type: SET_CAMPAIGN_ACTION_CHARGE_AMOUNT,
    data
});
export const removeActionChargeAmount = (data) => ({
    type: REMOVE_CAMPAIGN_ACTION_CHARGE_AMOUNT,
    data
});
export const resetActionChargeType = () => ({
    type: RESET_CAMPAIGN_ACTION_CHARGE_TYPE
});

