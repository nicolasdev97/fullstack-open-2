import useNotification from './useNotification'

const useNotify = () => {
  const [, dispatch] = useNotification()

  const showNotification = (message, seconds = 5) => {
    dispatch({
      type: 'SHOW',
      payload: message,
    })

    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, seconds * 1000)
  }

  return showNotification
}

export default useNotify
