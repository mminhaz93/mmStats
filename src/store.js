import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers/index'

const initializeStore = (initialState = {}) => {
  const logger = createLogger({
    /* https://github.com/evgenyrodionov/redux-logger */
    collapsed: true,
    diff: true,
  })

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, logger)),
  )

  if (module.hot)
    module.hot.accept('./reducers/index', () => {
      store.replaceReducer(reducer)
    })
  return store
}

export default initializeStore
