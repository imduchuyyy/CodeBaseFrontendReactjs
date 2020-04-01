# Webpack source tree

## Cài đặt:
1. Kết nối Bankend
    - Cài đặt trong 2 file ```.env.development.local``` và ```.env.production.local```
2. Cài đặt router
    - Cài đặt trong ```src/configs/routers/index.js```
3. Cài đặt Provider
    - Cài đặt trong ```src/utils/provider/index.js```
4. Cài đặt microservice
    - Cài đặt trong ```src/utils/provider/index.js```, thêm props ```basename='/appName'``` vào component ```BrowserRouter```
   - Cài đặt trong ```config/default.config.js```, chỉnh sửa biến ```staticPath``` thành ```staticPath = 'appName/static'```

## Sử dụng:
1. Lệnh chạy cơ bản
    - Start
    > PORT=12345 yarn start
    - Build
    > yarn build
2. Bắt lỗi phía Backend trả về
```javascript
import { DecodeError } from '@utils'

try {
  ...
} catch (e => {
  console.log(DecodeError(e))
})
```
3. Sử dụng các HOC để truy vấn backend
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
4. Sử dụng alias
    - Đối với các thư mục cấp 0 từ ```src```, vui lòng tạo file ```index.js``` để ```export``` các component ở trong thư mục cấp 0 đó.
    - Sau khi ```export``` các bạn có thể ```import``` theo cách sau.
```javascript
import { ... } from '@components'
import { ... } from '@configs'
import { ... } from '@pages'
import { ... } from '@tools'
import { ... } from '@utils'
```
5. Sử dụng cú pháp Optional Chaining
    - Đối với các object cần kiểm tra nó khác null hoặc undefied thì mới có thể lấy giá trị, ta làm theo cách sau.
```javascript
// Cách thường làm
if (!!a) {
  if (!!a.b) {
    if (!!a.b.c) {
      a.b.c()
    }
  }
}
// Hoặc như này
if (!!a && !!a.b && !!a.b.c) {
  a.b.c()
}

// Cách mà codebase mới cho phép các bạn code như này
a?.b?.c()
```
6. Hỗ trợ Dynamic Import
```javascript
import('@pages/login').then(({ default: Component }) => {
  return <Component />
})
```

## Chú ý:
- Khi muốn thay đổi rules của Eslint các bạn nên liên hệ ```TeamLeader```.
- Các component dùng chung nên để vào thư mục ```components```.
- Các page được chia theo route nên để vào thư mục ```pages```.
- Sử dụng các hook, vui lòng sử dụng thông qua thư viện ```react-use```.