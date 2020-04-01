# Code Base Front-end React, Webpack, Babel, Eslint
## Setting:
1. Connect to Bankend
    - Setting in 2 file ```.env.development.local``` and ```.env.production.local```
2. Setting router
    - Setting in ```src/configs/routers/index.js```
3. Setting Provider
    - Setting in ```src/utils/provider/index.js```

## Usage:
1. Running with command:
    - Start
    > npm start
    - Build
    > npm build
2. Catching error from backend
```javascript
import { DecodeError } from '@utils'

try {
  ...
} catch (e => {
  console.log(DecodeError(e))
})
```
3. Using hoock
```javascript
import { withQuery, withMutation, withApollo } from '@utils'

/* Chỉ 1 câu truy vấn là query */
export default withQuery(App)({
  query: `
    query getItem ($ID: ID!) {
      getItem (ID: $ID) {
        _id
      }
    }
  `,
  options: props => ({
    variables: {
      ID: props.id
    },
    fetchPolicy: 'no-cache'
  })
})
// Nhận props là:
const App = ({
  data: { refetch, getItem } // <===
}) => {
  return (
    <div>App</div>
  )
}

/* Chỉ 1 câu truy vấn là mutation */
export default withMutation(App)({
  mutation: `
    mutation setItem ($ID: ID!, $context: String!) {
      setItem (ID: $ID, context: $context)
    }
  `,
  name: 'setItem'
})
// Nhận props là:
const App = ({
  mutation: { setItem } // <===
}) => {
  return (
    <div>App</div>
  )
}

/* Câu truy vấn là query và mutation */
export default withApollo(App)([
  {
    query: `
      query getItem ($ID: ID!) {
        getItem (ID: $ID) {
          _id
        }
      }
    `,
    options: props => ({
      variables: {
        ID: props.id
      },
      fetchPolicy: 'no-cache'
    })
  },
  {
    mutation: `
      mutation setItem ($ID: ID!, $context: String!) {
        setItem (ID: $ID, context: $context)
      }
    `,
    name: 'setItem'
  }
])
// Nhận props là:
const App = ({
  data: { refetch, getItem }, // <===
  mutation: { setItem } // <===
}) => {
  return (
    <div>App</div>
  )
}

/* Muốn lấy Client để tùy biến cách lấy data */
export default withQuery(App, true)(...)
export default withMutation(App, true)(...)
export default withApollo(App, true)(...)
// Nhận props là:
// Nhận props là:
const App = ({
  client
}) => {
  return (
    <div>App</div>
  )
}
```
4. Using alias
    - Đối với các thư mục cấp 0 từ ```src```, vui lòng tạo file ```index.js``` để ```export``` các component ở trong thư mục cấp 0 đó.
    - Sau khi ```export``` các bạn có thể ```import``` theo cách sau.
```javascript
import { ... } from '@components'
import { ... } from '@configs'
import { ... } from '@pages'
import { ... } from '@tools'
import { ... } from '@utils'
```
5. Support Dynamic Import
```javascript
import('@pages/login').then(({ default: Component }) => {
  return <Component />
})
```