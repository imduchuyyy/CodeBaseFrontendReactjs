# Code Base Front-end React, Webpack, Babel, Eslint
## Setting:
1. Connect to Backend
    - Setting in 2 file ```.env.development.local``` and ```.env.production.local```
2. Setting router
    - Setting in ```src/configs/routers/index.js```
3. Setting Provider
    - Setting in ```src/utils/provider/index.js```

## Usage:
1. Running with command:
    - Start
    > npm run start
    - Build
    > npm run build
2. Catching error from backend
```javascript
import { DecodeError } from '@utils'

try {
  ...
} catch (e => {
  console.log(DecodeError(e))
})
```
3. Using alias
    - Đối với các thư mục cấp 0 từ ```src```, vui lòng tạo file ```index.js``` để ```export``` các component ở trong thư mục cấp 0 đó.
    - Sau khi ```export``` các bạn có thể ```import``` theo cách sau.
```javascript
import { ... } from '@components'
import { ... } from '@configs'
import { ... } from '@pages'
import { ... } from '@tools'
import { ... } from '@utils'
```
4. Support Dynamic Import
```javascript
import('@pages/login').then(({ default: Component }) => {
  return <Component />
})
```
5. Support i18next
    - Edit file ```index``` in folder ```config/i18n``` to translate
6. Support Code-splitting 
    - Edit file ```index``` in folder ```config/routes``` to add route
7. Support Apollo, Graphql