# mudb

mudb is a small JSON database with a very simple API

### API

### open()
```javascript
const mudb = require('mudb')

async () => {
  const db = await mudb.open('path/to/json')
  ...
}
```

### openSync()
Use it only before starting a server or outside of a request handler.
```javascript
const mudb = require('mudb')

const db =  mudb.openSync('path/to/json')

async () => {
  ...
}
```

- #### put()
```javascript
await db.put({_id: 'EIndiizUIU828', title: 'A small json database', ... }).save()
```

- #### get()
Single query
```javascript
db.get({_id: 'EIdiizUIU828'}) // [{_id: 'EIndiizUIU828', title: 'A small json database', ... }]
```
Multiple queries with regexp

```javascript
db.get({title: /small json database/}, {description: /small json database/}) // [{_id: 'EIndiizUIU828', title: 'A small json database', ... }, {...}, ...]
```

- #### del()
```javascript
await db.del({_id: 'EIdiizUIU828'}).save()
```

- #### size
```javascript
db.size // 1
```

- #### dump
```javascript
db.dump // ['item1', { _id: 'item2'}, ['item3'], ...]
```


### drop()
```javascript
const mudb = require('mudb')

async () => {
  await mudb.drop('path/to/json')
}
```

