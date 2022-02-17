const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.notification
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeId = 0

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: { notification: notification }
    })

    clearTimeout(timeId)

    timeId = setTimeout(() =>
      dispatch(removeNotification()),
      1000 * time)

  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer