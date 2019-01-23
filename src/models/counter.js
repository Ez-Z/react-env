export default {
  namespace: 'counter',
  state: {
    num: 0
  },
  effects: {
    *add({ payload }, { put }) {
      yield put({
        type: 'addNum',
        payload
      })
    },
    *minus({ payload }, { put }) {
      yield put({
        type: 'minusNum',
        payload
      })
    },
    *asyncAdd({ payload }, { put }) {
      yield put({
        type: 'addNum',
        payload
      })
    },
  },
  reducers: {
    addNum(state) {
      return {
        ...state,
        num: state.num + 1
      }
    },
    minusNum(state) {
      return {
        ...state,
        num: state.num - 1
      }
    },
  }
}