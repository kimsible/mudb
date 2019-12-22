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
Use only before starting a server or outside of a request handler.
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
Single filter
```javascript
db.get({_id: 'EIdiizUIU828'}) // [{_id: 'EIndiizUIU828', title: 'A small json database', ... }]
```

Filter type can be a function, a string, a number or a regexp
```javascript
db.get({rate: rate => rate < 5}) // return all items with a rate lower than 5
db.get({title: /toto/}) // return all items with a title containing "toto"
db.get({active: true}) // return all items where active is true
db.get({rate: 4.5}) // return all items where rate is 4.5
```

Multiple filters
```javascript
db.get({title: /toto/}, {rate: 4.5}, {...}, ...)
```

Select specific keys
```javascript
db.get(['active', 'rate'], {title: /toto/}, {...}, ...) // [{active: true, rate: 5}, ...]
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

