import { useSelector, useDispatch } from 'react-redux'
import { setDarkMode, setName, setAvatar } from '../store/slices/settingsSlice'

export default function Settings() {
  const dispatch = useDispatch()

  const { darkMode, name, avatar } = useSelector(s => s.settings)

  const avatars = [
    "/avatar1.png",
    "/avatar2.png",
    "/avatar3.png"
  ]

  return (
    <div
      style={{
        padding: 20,
        background: darkMode ? "#111" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh"
      }}
    >
      <h1>Settings</h1>

      {/* NAME */}
      <div style={{ marginBottom: 20 }}>
        <h3>Name</h3>
        <input
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          style={{ padding: 8, width: 200 }}
        />
      </div>

      {/* AVATAR */}
      <div style={{ marginBottom: 20 }}>
        <h3>Choose Avatar</h3>

        <div style={{ display: "flex", gap: 10 }}>
          {avatars.map((img) => (
            <img
              key={img}
              src={img}
              onClick={() => dispatch(setAvatar(img))}
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                cursor: "pointer",
                border: avatar === img ? "3px solid blue" : "2px solid transparent"
              }}
            />
          ))}
        </div>
      </div>

      {/* DARK MODE */}
      <div>
        <h3>Theme</h3>

        <button
          onClick={() => dispatch(setDarkMode(!darkMode))}
          style={{
            padding: "10px 15px",
            cursor: "pointer"
          }}
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <hr style={{ marginTop: 30 }} />

      {/* PREVIEW */}
      <h3>Preview</h3>
      <img src={avatar} width="60" style={{ borderRadius: "50%" }} />
      <p>{name}</p>
    </div>
  )
}