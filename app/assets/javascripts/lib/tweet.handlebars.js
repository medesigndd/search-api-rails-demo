// Generated by CoffeeScript 1.6.3
(function() {
  (function() {
    var handleIntent, height, intentRegex, width, winHeight, winWidth, windowOptions;
    handleIntent = function(e) {
      var left, m, target, top;
      e = e || window.event;
      target = e.target || e.srcElement;
      m = void 0;
      left = void 0;
      top = void 0;
      while (target && target.nodeName.toLowerCase() !== "a") {
        target = target.parentNode;
      }
      if (target && target.nodeName.toLowerCase() === "a" && target.href) {
        m = target.href.match(intentRegex);
        if (m) {
          left = Math.round((winWidth / 2) - (width / 2));
          top = 0;
          if (winHeight > height) {
            top = Math.round((winHeight / 2) - (height / 2));
          }
          window.open(target.href, "intent", windowOptions + ",width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
          e.returnValue = false;
          return e.preventDefault && e.preventDefault();
        }
      }
    };
    if (window.__twitterIntentHandler) {
      return;
    }
    intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/;
    windowOptions = "scrollbars=yes,resizable=yes,toolbar=no,location=yes";
    width = 550;
    height = 420;
    winHeight = screen.height;
    winWidth = screen.width;
    if (document.addEventListener) {
      document.addEventListener("click", handleIntent, false);
    } else {
      if (document.attachEvent) {
        document.attachEvent("onclick", handleIntent);
      }
    }
    return window.__twitterIntentHandler = true;
  })();

}).call(this);
// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function() {
    var Tweet;
    return this.Tweet = Tweet = (function() {
      function Tweet() {
        this.stringifyProfileGeo = __bind(this.stringifyProfileGeo, this);
        this.stringifyKloutTopics = __bind(this.stringifyKloutTopics, this);
        this.linkifyUserMentions = __bind(this.linkifyUserMentions, this);
        this.linkifyUrls = __bind(this.linkifyUrls, this);
        this.linkifyHashTags = __bind(this.linkifyHashTags, this);
        this.linkifyEntities = __bind(this.linkifyEntities, this);
        this.extractId = __bind(this.extractId, this);
        this.timeago = __bind(this.timeago, this);
      }

      Tweet.prototype.idRE = /\d+$/;

      Tweet.prototype.timeago = function(iso8601Str) {
        var diffInSeconds, postedDateTime;
        postedDateTime = new Date(iso8601Str);
        diffInSeconds = ((new Date()).getTime() - postedDateTime.getTime()) / 1000;
        if (diffInSeconds < 0) {
          return postedDateTime.toDateString();
        }
        if (diffInSeconds < 60) {
          return 'just now';
        }
        if (diffInSeconds < 3600) {
          return "" + (Math.floor(diffInSeconds / 60)) + "m";
        }
        if (diffInSeconds < 86400) {
          return "" + (Math.floor(diffInSeconds / 3600)) + "h";
        }
        return "" + (Math.floor(diffInSeconds / 86400)) + "d";
      };

      Tweet.prototype.extractId = function(str) {
        return this.idRE.exec(str)[0];
      };

      Tweet.prototype.linkifyEntities = function(body, twitterEntities) {
        var tweetBody;
        if (!twitterEntities) {
          return body;
        }
        tweetBody = body;
        if (twitterEntities.hashtags.length) {
          tweetBody = this.linkifyHashTags(tweetBody, twitterEntities.hashtags);
        }
        if (twitterEntities.urls.length) {
          tweetBody = this.linkifyUrls(tweetBody, twitterEntities.urls);
        }
        if (twitterEntities.user_mentions.length) {
          tweetBody = this.linkifyUserMentions(tweetBody, twitterEntities.user_mentions);
        }
        return tweetBody;
      };

      Tweet.prototype.linkifyHashTags = function(tweetBody, hashtags) {
        hashtags.forEach(function(hashtag) {
          var text;
          text = hashtag['text'];
          return tweetBody = tweetBody.replace("\#" + text, "<a href=\"https://twitter.com/search?q=" + text + "\" target=\"_blank\">\#" + text + "</a>", 'g');
        });
        return tweetBody;
      };

      Tweet.prototype.linkifyUrls = function(tweetBody, urls) {
        urls.forEach(function(urlObj) {
          var url;
          url = urlObj['url'];
          return tweetBody = tweetBody.replace(url, "<a href=\"" + url + "\" title=\"" + urlObj['expanded_url'] + "\" target=\"_blank\">" + urlObj['display_url'] + "</a>", 'g');
        });
        return tweetBody;
      };

      Tweet.prototype.linkifyUserMentions = function(tweetBody, userMentions) {
        userMentions.forEach(function(mentionObj) {
          var screenName;
          screenName = mentionObj['screen_name'];
          return tweetBody = tweetBody.replace("@" + screenName, "<a href=\"https://twitter.com/" + screenName + "\">@" + screenName + "</a>", 'g');
        });
        return tweetBody;
      };

      Tweet.prototype.stringifyKloutTopics = function(topics) {
        return topics.slice(0, 2).map(function(_) {
          return _.displayName;
        }).join(', ');
      };

      Tweet.prototype.stringifyProfileGeo = function(locations) {
        var country, locality, location, region;
        location = locations[0];
        locality = location.address.locality ? "" + location.address.locality + "," : '';
        region = location.address.region ? location.address.region : '';
        country = locality || region ? location.address.countryCode : location.address.country;
        return "" + locality + " " + region + " " + country;
      };

      return Tweet;

    })();
  })(this);

}).call(this);
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['tweet'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <span class=\"klout-score\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.gnip)),stack1 == null || stack1 === false ? stack1 : stack1.klout_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.gnip)),stack1 == null || stack1 === false ? stack1 : stack1.klout_profile)),stack1 == null || stack1 === false ? stack1 : stack1.topics)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                        <span class=\"klout-topics\">\n                            <i></i>\n                            ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.stringifyKloutTopics || (depth0 && depth0.stringifyKloutTopics)),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.gnip)),stack1 == null || stack1 === false ? stack1 : stack1.klout_profile)),stack1 == null || stack1 === false ? stack1 : stack1.topics), options) : helperMissing.call(depth0, "stringifyKloutTopics", ((stack1 = ((stack1 = (depth0 && depth0.gnip)),stack1 == null || stack1 === false ? stack1 : stack1.klout_profile)),stack1 == null || stack1 === false ? stack1 : stack1.topics), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                        </span>\n                    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                    <span class=\"profile-location\">\n                        <i></i>\n                        ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.stringifyProfileGeo || (depth0 && depth0.stringifyProfileGeo)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.gnip)),stack1 == null || stack1 === false ? stack1 : stack1.profileLocations), options) : helperMissing.call(depth0, "stringifyProfileGeo", ((stack1 = (depth0 && depth0.gnip)),stack1 == null || stack1 === false ? stack1 : stack1.profileLocations), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    </span>\n                ";
  return buffer;
  }

  buffer += "<div class=\"tweet\">\n    <div class=\"content\">\n        <header class=\"tweet-header\">\n            <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.actor)),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\" class=\"account-group\">\n                <img src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.actor)),stack1 == null || stack1 === false ? stack1 : stack1.image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"avatar\"/>\n                ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.gnip)),stack1 == null || stack1 === false ? stack1 : stack1.klout_score), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                <strong class=\"fullname\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.actor)),stack1 == null || stack1 === false ? stack1 : stack1.displayName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n                <span>&rlm;</span>\n                <span class=\"username\">@"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.actor)),stack1 == null || stack1 === false ? stack1 : stack1.preferredUsername)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </a>\n            <a href=\"https://twitter.com/intent/user?screen_name="
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.actor)),stack1 == null || stack1 === false ? stack1 : stack1.preferredUsername)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"follow-button\">\n                <i></i>\n                <span class=\"label\">Follow</span>\n            </a>\n        </header>\n        <div class=\"tweet-text\">";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.linkifyBody || (depth0 && depth0.linkifyBody)),stack1 ? stack1.call(depth0, (depth0 && depth0.body), (depth0 && depth0.twitter_entities), options) : helperMissing.call(depth0, "linkifyBody", (depth0 && depth0.body), (depth0 && depth0.twitter_entities), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</div>\n        <footer class=\"tweet-footer\">\n            <ul class=\"tweet-actions\">\n                <li class=\"action-reply-container\">\n                    <a href=\"https://twitter.com/intent/tweet?in_reply_to=";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.extractId || (depth0 && depth0.extractId)),stack1 ? stack1.call(depth0, (depth0 && depth0.id), options) : helperMissing.call(depth0, "extractId", (depth0 && depth0.id), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\" role=\"button\" class=\"with-icn js-action-reply\">\n                        <span class=\"icon sm-reply\"></span>\n                        <b>Reply</b>\n                    </a>\n                </li>\n                <li class=\"action-rt-container\">\n                    <a href=\"https://twitter.com/intent/retweet?tweet_id=";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.extractId || (depth0 && depth0.extractId)),stack1 ? stack1.call(depth0, (depth0 && depth0.id), options) : helperMissing.call(depth0, "extractId", (depth0 && depth0.id), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\" role=\"button\" class=\"with-icn retweet\">\n                        <span class=\"icon sm-rt\"></span>\n                        <b>Retweet</b>\n                    </a>\n                </li>\n                <li class=\"action-fav-container\">\n                    <a href=\"https://twitter.com/intent/favorite?tweet_id=";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.extractId || (depth0 && depth0.extractId)),stack1 ? stack1.call(depth0, (depth0 && depth0.id), options) : helperMissing.call(depth0, "extractId", (depth0 && depth0.id), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\" role=\"button\" class=\"with-icn favorite\">\n                        <span class=\"icon sm-fav\"></span>\n                        <b>Favorite</b>\n                    </a>\n                </li>\n            </ul>\n            <span class=\"time\">\n                <a target=\"_blank\" href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.object)),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.timeago || (depth0 && depth0.timeago)),stack1 ? stack1.call(depth0, (depth0 && depth0.postedTime), options) : helperMissing.call(depth0, "timeago", (depth0 && depth0.postedTime), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</a>\n                ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.gnip)),stack1 == null || stack1 === false ? stack1 : stack1.klout_profile), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.gnip)),stack1 == null || stack1 === false ? stack1 : stack1.profileLocations), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </span>\n        </footer>\n    </div>\n</div>\n";
  return buffer;
  });
})();// Generated by CoffeeScript 1.6.3
(function() {
  (function() {
    var tweet;
    tweet = new Tweet();
    Handlebars.registerHelper('timeago', tweet.timeago);
    Handlebars.registerHelper('extractId', tweet.extractId);
    Handlebars.registerHelper('stringifyKloutTopics', tweet.stringifyKloutTopics);
    Handlebars.registerHelper('stringifyProfileGeo', tweet.stringifyProfileGeo);
    return Handlebars.registerHelper('linkifyBody', function(tweetBody, tweetEntities) {
      return new Handlebars.SafeString(tweet.linkifyEntities(tweetBody, tweetEntities));
    });
  })(this);

}).call(this);