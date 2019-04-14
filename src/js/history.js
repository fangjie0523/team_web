// history.js
import qs from 'qs'
// import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from 'history'

function addQuery(history) {
  // console.log(history,'---------',history.location)
  const location = history.location
  history.location = {
    ...location,
    query: qs.parse(location.search, { ignoreQueryPrefix: true }),
  }
}

// const history = createHistory()
const history = createBrowserHistory()

addQuery(history)

export const unlisten = history.listen(() => {
  // 每次页面跳转都会执行
  addQuery(history)
})

export default history
