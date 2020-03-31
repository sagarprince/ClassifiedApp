export default function reducer(state, action) {
  if (action.payload) {
    return {...state, ...action.payload};
  }
  return state;
}
