import dva, { DvaOption } from 'dva'
import router from './router'
import './index.css'
import global from './model/global'
import { IGlobalState } from './model/type'
const initialGLobalState = () => {
  const globalLocal = JSON.parse(localStorage.getItem('global') || "{}")
  return {
    ...global.state,
    ...globalLocal
  }
}

const app = dva({
  onStateChange(state: { global: IGlobalState} ) {
    localStorage.setItem('global', JSON.stringify(state.global))
  },

  initialState: {
    global: initialGLobalState()
  }
} as unknown as DvaOption)

app.router(router)

app.model(global)

app.start('#root')