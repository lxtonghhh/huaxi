// action types
const CREATE_SET = 'CREATE_SET'
const SELETE_SET = 'SELETE_SET'
const UPDATE_SET = 'UPDATE_SET'
const DELETE_SET = 'DELETE_SET'
const CONFIRM_SET = 'CONFIRM_SET'
const COMMIT = 'COMMIT'
// reducer
export default function (state, action) {
  if (!state) {
    state = { mode:'ready',activeIndex: -1,lastActiveIndex:-1 }
  }
  switch (action.type) {
    case CREATE_SET:
      return { mode:'create',activeIndex: action.activeIndex ,lastActiveIndex:action.lastActiveIndex}
    case SELETE_SET:
      //默认进入update模式
      return { mode:'update',activeIndex: action.activeIndex ,lastActiveIndex:action.lastActiveIndex}
    case UPDATE_SET:
      return { mode:'update',activeIndex: action.activeIndex ,lastActiveIndex:action.lastActiveIndex}
    case DELETE_SET:
      return { mode:'delete',activeIndex: action.activeIndex ,lastActiveIndex:action.lastActiveIndex}
    case CONFIRM_SET:
      return { mode:'ready',activeIndex: -1 ,lastActiveIndex:action.lastActiveIndex}  
    case COMMIT:
      return { mode:'ready',activeIndex: -1,lastActiveIndex:-1 } 
    default:
      return state
  }
}
// action creators
export const createSet = (activeIndex,lastActiveIndex) => {
  return { type: CREATE_SET, activeIndex ,lastActiveIndex}
}

export const selectSet = (activeIndex,lastActiveIndex) => {
  return { type: SELETE_SET, activeIndex ,lastActiveIndex}
}
export const updateSet = (activeIndex,lastActiveIndex) => {
  return { type: UPDATE_SET, activeIndex ,lastActiveIndex}
}
export const deleteSet = (activeIndex,lastActiveIndex) => {
  return { type: DELETE_SET, activeIndex ,lastActiveIndex}
}
export const confirmSet = (lastActiveIndex) => {
  return { type: CONFIRM_SET,lastActiveIndex }
}
export const commit = () => {
  return { type: COMMIT}
}