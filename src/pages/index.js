import React, { Suspense, useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { routes } from '@configs'
import { CommonContext } from '@tools'
import { withTranslation } from 'react-i18next'
import Layout from '@pages/layout'
import { Loading } from '@components'

function Routers(props) {
  const { isAuth } = useContext(CommonContext)
  return (
    <Suspense fallback={<Loading></Loading>}>
      <Switch>
        {routes
          && routes.map(route => (route.private ? (
              // Private
            <Route
              key={route.label}
              {...route}
              component={props1 => {
                  const Component = React.lazy(() => import(`./${route.component}`))
                  return isAuth ? (
                    <Layout {...props1} {...props}>
                      <Component {...props1} {...props} />
                    </Layout>
                  ) : (
                    <Redirect to="/login" />
                    )
                }}
            />
            ) : (
                // public
              <Route
                key={route.label}
                {...route}
                component={props1 => {
                    const Component = React.lazy(() => import(`./${route.component}`))
                    return !isAuth ? (
                      <Component {...props1} {...props} />
                    ) : (
                      <Redirect to="/" />
                      )
                  }}
              />
              )))}
        <Route render={() => <p>404</p>} />
      </Switch>
    </Suspense>
  )
}

const AppRouter = withTranslation()(Routers)

export { AppRouter }
