import { Meteor } from 'meteor/meteor';

var USTREAM_DATA_API_KEY = Meteor.settings.USTREAM_DATA_API_KEY;

Meteor.methods({
  ustreamVideoSearchList(query, option, page) {
    var res;
    var nextPageToken;
    // check(query, Match.Optional(String));
    this.unblock();
    requestParams = {
      limit: 100,
      key: USTREAM_DATA_API_KEY
    };


    var kindOfThingToSearch = 'channel'; // channel, user
    var sortBy = 'popular'; // live, recent
    var searchString = 'all'; //'title:like:' + query; // targetProperty:comparison:targetValue or all

    page = page || 1;

    requestParams['page'] = page;

    res = HTTP.get('http://api.ustream.tv/json/' + kindOfThingToSearch + '/' + sortBy + '/search/' + searchString, {
      params: requestParams,
      timeout: 20000
    });

    items = res.data.results;

    if (items && items.length) {
      nextPageToken = page + 1;
    } else {
      nextPageToken = 'end';
    }

    return {
      'nextPage': nextPageToken,
      'items': items
    }
  },
});
