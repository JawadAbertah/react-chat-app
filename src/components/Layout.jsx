import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/slices/userSlice'
import { selectSettings } from '../store/slices/settingsSlice'
import { selectTotalMessages } from '../store/slices/messagesSlice'
import styles from './Layout.module.css'

export default function Layout() {
  const user = useSelector(selectUser)
  const { darkMode } = useSelector(selectSettings)
  const totalMessages = useSelector(selectTotalMessages)

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>N</span>
          <div>
            <p className={styles.logoName}>NeoCare</p>
            <p className={styles.logoSub}>Medical Hub</p>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Navigation principale">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.navIcon} aria-hidden="true">⊞</span>
            <span>Tableau de bord</span>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.navIcon} aria-hidden="true">◎</span>
            <span>Chat ARIA</span>
            {totalMessages > 0 && (
              <span className={styles.badge} aria-label={`${totalMessages} messages`}>
                {totalMessages > 99 ? '99+' : totalMessages}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.navIcon} aria-hidden="true">⚙</span>
            <span>Paramètres</span>
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <span className={styles.userAvatar} role="img" aria-label="Avatar agent">
              {user.avatar}
            </span>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userRole}>Agent connecté</p>
            </div>
            <span className={styles.onlineDot} aria-label="En ligne" title="En ligne" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main} id="main-content">
        <Outlet />
      </main>
    </div>
  )
}
