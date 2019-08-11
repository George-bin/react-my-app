export const addTodo = data => {
  return {
    type: 'ADD_TODO',
    data
  };
}

export const delTodo = data => {
  return {
    type: 'DEL_TODO',
    data
  }
}
