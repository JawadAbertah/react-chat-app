import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../store/slices/userSlice'
import { selectTotalMessages, selectSessionStart } from '../store/slices/messagesSlice'
import { botInfo } from '../utils/ariaEngine'
import styles from './Dashboard.module.css'

function formatTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className={`${styles.statCard} ${accent ? styles.accent : ''}`}>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      {sub && <p className={styles.statSub}>{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const user = useSelector(selectUser)
  const totalMessages = useSelector(selectTotalMessages)
  const sessionStart = useSelector(selectSessionStart)
  const navigate = useNavigate()

  const now = new Date()
  const dateStr = now.toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <p className={styles.date}>{dateStr}</p>
          <h1 className={styles.greeting}>
            Bonjour, <span className={styles.accentText}>{user.name}</span> {user.avatar}
          </h1>
          <p className={styles.subtitle}>Bienvenue sur le tableau de bord NeoCare</p>
        </div>
        <div className={styles.ariaBadge}>
          <span className={styles.ariaAvatar}>🤖</span>
          <div>
            <p className={styles.ariaName}>{botInfo.name}</p>
            <p className={styles.ariaVersion}>v{botInfo.version} · En ligne</p>
          </div>
          <span className={styles.onlinePulse} aria-hidden="true" />
        </div>
      </header>

      {/* Stats */}
      <section className={styles.statsGrid} aria-label="Statistiques de session">
        <StatCard
          label="Messages échangés"
          value={totalMessages}
          sub="cette session"
          accent
        />
        <StatCard
          label="Session démarrée"
          value={formatTime(sessionStart)}
          sub={sessionStart ? 'heure locale' : 'Pas encore démarrée'}
        />
        <StatCard
          label="Statut ARIA"
          value="Opérationnelle"
          sub={`Version ${botInfo.version}`}
        />
        <StatCard
          label="Clinique"
          value="NeoCare"
          sub="Medical Hub"
        />
      </section>

      {/* Quick actions */}
      <section className={styles.actionsSection} aria-label="Actions rapides">
        <h2 className={styles.sectionTitle}>Accès rapide</h2>
        <div className={styles.actionsGrid}>
          <button
            className={styles.actionCard}
            onClick={() => navigate('/chat')}
            aria-label="Ouvrir le chat avec ARIA"
          >
            <span className={styles.actionIcon} aria-hidden="true">💬</span>
            <div>
              <p className={styles.actionTitle}>Démarrer une conversation</p>
              <p className={styles.actionDesc}>Discuter avec ARIA maintenant</p>
            </div>
            <span className={styles.actionArrow} aria-hidden="true">→</span>
          </button>

          <button
            className={styles.actionCard}
            onClick={() => navigate('/settings')}
            aria-label="Ouvrir les paramètres"
          >
            <span className={styles.actionIcon} aria-hidden="true">⚙️</span>
            <div>
              <p className={styles.actionTitle}>Paramètres du profil</p>
              <p className={styles.actionDesc}>Modifier nom, avatar, thème</p>
            </div>
            <span className={styles.actionArrow} aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* About ARIA */}
      <section className={styles.aboutSection} aria-label="À propos d'ARIA">
        <h2 className={styles.sectionTitle}>À propos d'ARIA</h2>
        <div className={styles.aboutCard}>
          <p className={styles.aboutText}>
            <strong>{botInfo.fullName}</strong> est l'assistante conversationnelle médicale de NeoCare.
            Elle peut vous aider à gérer des rendez-vous, consulter des résultats d'examens, 
            obtenir des informations sur la clinique et orienter vos questions médicales.
          </p>
          <div className={styles.capabilities}>
            {['Rendez-vous', 'Résultats', 'Symptômes', 'Urgences', 'Informations', 'Bien-être'].map(cap => (
              <span key={cap} className={styles.capTag}>{cap}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
