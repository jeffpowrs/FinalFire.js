# FinalFire.js

A light-weight reusable object that collects asynchronous events and triggers it's own final event once all others have been fired. Final Fire currently uses jQuery to bind and trigger events, though it would be easy to adjust for underscore or another javascript framework. The minified version is only 1,133 bytes.

## How to use FinalFire.

#### Create a new instance of FinalFire passing in a configuration object.
```javascript
var xyz = new FinalFire ({ subEventArray: ['cats', 'robots', 'frogs'], finalEvent: 'kittens'});
```

#### Listen for the final event.
```javascript
$(xyz).on('kittens', function(e){ *... Do something amazing ...* });
```

#### Trigger each event.
```javascript
$(xyz).trigger('cats');
```
##### That's all folks.