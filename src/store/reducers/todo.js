// 列表
export const todoList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.data
      ]
    case 'DEL_TODO':
      let list = [...state];
      let index = list.findIndex(item => { return item.id === action.data.id });
      list.splice(index, 1);
      return list;
    default:
      return state
  }
}
