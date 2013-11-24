# FinalFire.js

## A reusable object that collects asynchronous events and triggers it's own final event once all others have been fired. Final Fire currently uses jQuery to bind and trigger events, though it would be easy to adjust for underscore or another javascript framework.

### How to use FinalFire.

#### Create a new instance of FinalFire passing in a configuration object.
'var xyz = new FinalFire ({ subEventArray: ['cats', 'robots', 'frogs'], finalEvent: 'kittens'});'

#### Listen for the final event.
'$(xyz).on('kittens', function(e){ *... Do something amazing ...* });'

#### Trigger each event.
'$(xyz).trigger('cats');'

##### That's all folks.

Will refactor soon.