import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import reducer from '@store/reducer'

const initializeStore = (initialState = {}) => {
  const logger = createLogger({
    /* https://github.com/evgenyrodionov/redux-logger */
    collapsed: true,
    diff: true,
  })

  // const composeEnhancers = composeWithDevTools({
  //   // options like actionSanitizer, stateSanitizer
  // })
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(logger)),
  )
  // Make reducers hot reloadable
  if (module.hot)
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducer)
    })
  return store
}

export default initializeStore
