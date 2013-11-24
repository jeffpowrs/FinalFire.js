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

  this.wasTriggered = {}  // Keep track of the events triggered
  this.subEventArrayLen = this.config.subEventArray.length;

  this.setAllTriggered( false, true );
}

FinalFire.prototype = {
  bind: function ( eventListenerString ) {

    var _this = this;

    $(this).on( eventListenerString, function (e) {
      _this.wasTriggered[e.type] = true;
      if ( _this.wasAllTriggered(_this) )
        _this.emit( _this );
    });

  },
  setAllTriggered: function (booleanValue, bind) {
    var eventListenerString = '';

    for ( var i = 0; i < this.subEventArrayLen; i++ ) {
      this.wasTriggered[ this.config.subEventArray[i] ] = booleanValue;
      if (bind) eventListenerString += this.config.subEventArray[i] + ' ';
    }
 
    if (bind) this.bind( eventListenerString );
 
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
    if ( _this.config.reset )
      _this.setAllTriggered( false );
    else
      $(_this).off( _this.config.finalEvent );
  }
}