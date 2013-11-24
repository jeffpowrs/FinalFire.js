// -------------------------------------------------------------------------
//  Final Fire
//  Author: @jeff Powers
//  Git: github.com/jeffpowrs/finalfire.js
//  Date: 2013.11
//  License: MIT/GPLv2
// -------------------------------------------------------------------------


function FinalFire ( config ) {

  this.config = $.extend( {}, true, 
    { subEventArray: [],                          // Events to listen for -- Array of Strings
      finalEvent: 'complete',                     // Event to trigger at the end -- String
      reset: false                                // Reset at the end for multiple firings -- Boolean
    }, config 
  );

  this.wasTriggered = {}
  this.subEventArrayLen = this.config.subEventArray.length;

  this.prepareEvents( this.config.subEventArray );

}

FinalFire.prototype = {
  prepareEvents: function (subEventArray) {
    // For each event we want to listen to create a listener and
    // boolean for it in the wasTrigger object.
    
    var _this = this
      , eventsToListenString = '';

    for ( var i = 0; i < this.subEventArrayLen; i++ ) {
      this.wasTriggered[ subEventArray[i] ] = false;
      eventsToListenString += subEventArray[i] + ' ';
    }
    
    $(this).on( eventsToListenString, function (e) {
      _this.wasTriggered[e.type] = true;
      if ( _this.wasAllTriggered(_this) )
        _this.emit( _this );
    });

  },
  resetAllTriggered: function () {
    for ( var i = 0; i < this.subEventArrayLen; i++ ) {
      this.wasTriggered[ this.config.subEventArray[i] ] = false;
    }
  },
  wasAllTriggered: function (_this) {
    for ( var i = 0; i < _this.subEventArrayLen; i++ ) {
      if ( ! _this.wasTriggered[ _this.config.subEventArray[i] ] )
        // An event we are waiting for did not get triggered
        return false;
      if ( i === _this.subEventArrayLen-1 )
        // All events have been triggered
        return true;
    }
  },
  emit: function (_this) {
    $(_this).trigger( _this.config.finalEvent );
    if (_this.config.reset)
      _this.resetAllTriggered();
    else
      $(_this).off(_this.config.finalEvent);
  }
}