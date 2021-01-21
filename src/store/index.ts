import { createStore, Store, useStore as baseUseStore } from 'vuex'
import globalLoading, { IGlobalLoadingState } from './global-loading'
import { InjectionKey } from 'vue'

export interface IRootStateTypes {
  num: number;
}

export interface IAllStoreTypes extends IRootStateTypes {
  globalLoading: IGlobalLoadingState;
}

export const key: InjectionKey<Store<IRootStateTypes>> = Symbol('vuexKey')

export default createStore<IRootStateTypes>({
  state: {
    num: 1
  },
  mutations: {
    changeNum (state, data: number) {
      state.num += data
    }
  },
  actions: {

  },
  modules: {
    globalLoading
  }
})

export function useStore<T = IAllStoreTypes> () {
  return baseUseStore<IAllStoreTypes>(key)
}
