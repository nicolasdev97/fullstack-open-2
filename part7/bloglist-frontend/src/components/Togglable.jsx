import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef(({ children }, ref) => {
  const [visible, setVisible] = useState(false)
  const buttonLabel = "create new blog"

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  return (
    <div className="mb-4">
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="btn btn-primary">
          {buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility} className="btn btn-secondary">
          cancel
        </button>
      </div>
    </div>
  )
})

export default Togglable
