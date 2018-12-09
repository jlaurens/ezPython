/**
 * edython
 *
 * Copyright 2018 Jérôme LAURENS.
 *
 * License EUPL-1.2
 */

// import namespace from '../util/namespace'

const state = {
  tipsDisabled: false
}

// const _types = {
//   getters: [
//   ],
//   mutations: [
//     'toggleTipsDisabled'
//   ]
// }

// const types = namespace('Pref', _types)

const mutations = {
/**
 * Toggles the tips.
 * The main vue watches this value to turn on and off the tips.
 * The menu vue uses this mutator.
 * @param {*} state
 */
  toggleTipsDisabled (state) {
    state.tipsDisabled = !state.tipsDisabled
  }
}

const actions = {
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}