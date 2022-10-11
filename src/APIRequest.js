import BaseURL from './BaseURL';
import axios from 'axios';
import EncodeUsername from './EncodeUsername';


let baseURL = BaseURL();
let encodedUserPass = EncodeUsername();
var qs = require('qs');


export const APIRequest = (type, requestType, url, fromDate, toDate, enable, pageNumber, phoneNumber, prizeId) => {

    switch (type){
        case 'GET_ALL_GIFT':
            var giftPromise = new Promise(function(resolve, reject) {
                axios({
                    method: requestType,
                    url: `${baseURL}${url}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic '+ encodedUserPass
                    },
                    data: qs.stringify({
                        'stdate': '' ,
                        'enddate': '',
                        'enable': 2
                    })
                })
                .then(response => resolve(response))
                .catch((err) => reject(err))
            
              });
            return giftPromise;

        case 'GET_ALL_TYPES':
            var giftPromise = new Promise(function(resolve, reject) {
                axios({
                    method: requestType,
                    url: `${baseURL}${url}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic '+ encodedUserPass
                    }
                })
                .then(response => resolve(response))
                .catch((err) => reject(err))
            
              });
            return giftPromise;

        case 'GET_GIFT_FROM_API':
            var giftPromise = new Promise(function(resolve, reject) {
                axios({
                    method: requestType,
                    url: `${baseURL}${url}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic '+ encodedUserPass
                    },
                    data: qs.stringify({
                        'stdate': fromDate,
                        'enddate': toDate,
                        'enable': enable,

                    })
                })
                .then(response => resolve(response))
                .catch((err) => reject(err))
            
              });
            return giftPromise;

        case 'GET_CAMPAIGN_LIST':
            var campPromise = new Promise(function(resolve, reject) {
                axios({
                    method: requestType,
                    url: `${baseURL}${url}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic '+ encodedUserPass
                    },
                    data: qs.stringify({
                        'stdate': fromDate,
                        'enddate': toDate,
                        'enable': enable
                    })
                })
                .then(response => resolve(response.data))
                .catch((err) => reject(err))
            
              });
            return campPromise;

        case 'GET_SUBSCRIBER_SCORE_LIST':
            var campPromise = new Promise(function(resolve, reject) {
                axios({
                    method: requestType,
                    url: `${baseURL}${url}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic '+ encodedUserPass
                    },
                    data: qs.stringify({
                        'page': pageNumber,
                        'stdate': fromDate,
                        'enddate': toDate,
                        'phone': phoneNumber
                    })
                })
                .then(response => resolve(response))
                .catch((err) => reject(err))
            
              });
            return campPromise;

        case 'GET_SCORES_TABLE':
            var scorePromise = new Promise(function(resolve, reject) {
                axios({
                    method: requestType,
                    url: `${baseURL}${url}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic '+ encodedUserPass
                    },
                    data: qs.stringify({
                        'page': pageNumber
                    })
                })
                .then(response => resolve(response))
                .catch((err) => reject(err))
            
              });
            return scorePromise;
        
        case 'GET_ALL_CHANCE':
            var chancePromise = new Promise(function(resolve, reject) {
                axios({
                    method: requestType,
                    url: `${baseURL}${url}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic '+ encodedUserPass
                    },
                    data: qs.stringify({
                        'page': pageNumber,
                        'prizeid': prizeId,
                        'phone': phoneNumber
                    })
                })
                .then(response => resolve(response))
                .catch((err) => reject(err))
            
              });
            return chancePromise;

        case 'GET_BALANCE_VALUE':
            var chancePromise = new Promise(function(resolve, reject) {
                axios({
                    method: requestType,
                    url: `${baseURL}${url}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic '+ encodedUserPass
                    },
                    data: qs.stringify({
                        'page': pageNumber,
                        'prizeid': prizeId,
                        'phone': phoneNumber
                    })
                })
                .then(response => resolve(response))
                .catch((err) => reject(err))
            
              });
            return chancePromise;

    }
}

export const addNewGiftAPI = (type, requestType, url, title, prizeId, cost, fromDate, toDate, fromTime, toTime) => {

    var newGiftPromise = new Promise(function(resolve, reject) {
        axios({
            method: requestType,
            url: `${baseURL}${url}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ encodedUserPass
            },
            data: qs.stringify({
                'title': title,
                'prizeid': parseInt(prizeId),
                'cost': parseInt(cost),
                'stdate': fromDate,
                'enddate': toDate,
                'sttime': fromTime,
                'endtime': toTime,
            })
        })
        .then(response => resolve(response))
        .catch((err) => reject(err))
    
        });
    return newGiftPromise;
}

export const mtnCampaignUsed = (mobile, used, page) => {

    var campaignUsed = new Promise(function(resolve, reject) {
        axios({
            method: 'POST',
            url: `${baseURL}MtnReport/campusedlist`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ encodedUserPass
            },
            data: qs.stringify({
                'used': parseInt(used),
                'page': parseInt(page),
                'phone': mobile
            })
        })
        .then(response => resolve(response))
        .catch((err) => reject(err))
    
        });
    return campaignUsed;
}

export default APIRequest