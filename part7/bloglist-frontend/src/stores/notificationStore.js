import { create } from "zustand"

const useNotificationStore = create((set) => ({
  notification: null,

  setNotification: (message, type = "info", time = 5) => {
    set({ notification: { message, type } })

    setTimeout(() => {
      set({ notification: null })
    }, time * 1000)
  },
}))

export default useNotificationStore
