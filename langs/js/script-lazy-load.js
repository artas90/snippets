// make sure we don't redefine the api if already present
if (!window.$Someapp) {
  $Someapp = (function() {
    // delegate status
    var delegateLoaded = false;
    
    // queue to store un-delegated calls
    var callQueue = [];
    
    // util methods
    function getDelegateScriptUrl() {
      // load the delegate script based on stored version (got from aura nonce) or get latest version
      var url = "/someapp/someapp.out.delegate.js?v=" + getDelegateScriptVersion();
      
      // Extract the base path from our own <script> include to adjust for LC4VF/Communities/Sites
      var scripts = document.getElementsByTagName("script");
      for (var m = 0; m < scripts.length; m++) {
        var script = scripts[m].src;
        var i = script.indexOf("/someapp/someapp.out.js");
        if (i >= 0) {
          var basePath = script.substring(0, i);
          url = basePath + url;
          break;
        }
      }
      
      return url;
    }
    
    function getDelegateScriptVersion(){
      try {
        if(localStorage.someappOutDelegateVersion){
          return localStorage.someappOutDelegateVersion;
        }
      } catch (e) {}
      return (new Date()).getTime();
    }
    
    function loadDelegateScript() {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.src = getDelegateScriptUrl();
      script.onload = function() {
        delegateLoaded = true;
        while(callQueue.length) {
          $Someapp._delegate.use.apply(this, callQueue.shift());
        }
      }
      document.head.appendChild(script);
    }
    
    // load delegate
    loadDelegateScript();
    
    return {
      use: function() {
        var args = Array.prototype.slice.call(arguments);
        if (delegateLoaded) {
          return $Someapp._delegate.use.apply(this, args);
        } else {
          // queue the request
          return callQueue.push(args);
        }
      },
      createComponent: function() {
        return $Someapp._delegate.createComponent.apply(this, Array.prototype.slice.call(arguments));
      },
      getApplication: function() {
        return $Someapp._delegate.getApplication.apply(this, Array.prototype.slice.call(arguments));
      },
      someappLoaded: function() {
        return $Someapp._delegate.someappLoaded.apply(this, Array.prototype.slice.call(arguments));
      },
      ready: function() {
        return $Someapp._delegate.ready.apply(this, Array.prototype.slice.call(arguments));
      }
    }
  })();
}