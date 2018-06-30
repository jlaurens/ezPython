const state = {
  undoCount: 0,
  redoCount: 0,
  undoStage: 0,
  selected: undefined, // the selected block
  panelsVisible: true,
  panelsWidth: '100%'
}

const mutations = {
  UI_SET_UNDO_COUNT (state, n) {
    state.undoCount = n
  },
  UI_SET_REDO_COUNT (state, n) {
    state.redoCount = n
  },
  UI_SET_UNDO_STAGE (state, n) {
    state.undoStage = n
  },
  UI_STAGE_UNDO (state) {
    state.undoCount = eYo.App.workspace.undoStack_.length
  },
  UI_SET_SELECTED (state, block) {
    if (!block.isInFlyout) {
      state.selected = block
    }
  },
  UI_SET_PANELS_VISIBLE (state, yorn) {
    state.panelsVisible = yorn
  },
  UI_SET_PANELS_WIDTH (state, newWidth) {
    state.panelsWidth = newWidth
  }
}

const actions = {
}

const getters = {
  isDocumentEdited: state => {
    return state.undoCount === state.undoStage
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}