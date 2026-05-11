import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMessage, resetConversation, selectMessages } from '../store/slices/messagesSlice'
import { selectUser } from '../store/slices/userSlice'
import { selectSettings } from '../store/slices/settingsSlice'
import { getAriaResponse, getTypingDelay, botInfo } from '../utils/ariaEngine'
import styles from './Chat.module.css'

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function TypingIndicator() {
  return (
    <div className={styles.typingRow} aria-live="polite">
      <span className={styles.botAvatarSmall} aria-hidden="true">🤖</span>
      <div className={styles.typingBubble}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.typingLabel}>ARIA est en train d'écrire...</span>
      </div>
    </div>
  )
}

function Message({ msg, isBot, userAvatar, userName }) {
  return (
    <div className={`${styles.msgRow} ${isBot ? styles.botRow : styles.userRow}`}>

      {/* AVATAR */}
      {isBot ? (
        <span className={styles.botAvatarSmall} aria-hidden="true">🤖</span>
      ) : (
        <img
          src={userAvatar}
          alt="user avatar"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
      )}

      {/* MESSAGE */}
      <div className={`${styles.bubble} ${isBot ? styles.botBubble : styles.userBubble}`}>

        {/* USER NAME */}
        {!isBot && (
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {userName}
          </div>
        )}

        <p className={styles.msgText}>{msg.text}</p>

        <time className={styles.msgTime} dateTime={msg.timestamp}>
          {formatTime(msg.timestamp)}
        </time>
      </div>
    </div>
  )
}

export default function Chat() {
  const dispatch = useDispatch()

  const messages = useSelector(selectMessages)
  const user = useSelector(selectUser)
  const settings = useSelector(selectSettings)

  const { name, avatar } = settings

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      dispatch(addMessage({
        id: crypto.randomUUID(),
        sender: 'bot',
        text: `Bonjour ! Je suis ARIA, votre assistante médicale intelligente chez NeoCare.`,
        timestamp: new Date().toISOString(),
      }))
    }
  }, [])

  function sendMessage() {
    const text = input.trim()
    if (!text || isTyping) return

    dispatch(addMessage({
      id: crypto.randomUUID(),
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    }))

    setInput('')
    setIsTyping(true)

    const delay = getTypingDelay()

    setTimeout(() => {
      const response = getAriaResponse(text)

      dispatch(addMessage({
        id: crypto.randomUUID(),
        sender: 'bot',
        text: response,
        timestamp: new Date().toISOString(),
      }))

      setIsTyping(false)
      inputRef.current?.focus()
    }, delay)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function handleReset() {
    if (window.confirm('Réinitialiser la conversation ?')) {
      dispatch(resetConversation())
    }
  }

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.ariaInfo}>
          <span className={styles.ariaAvatar}>🤖</span>
          <div>
            <p className={styles.ariaName}>{botInfo.name}</p>
            <p className={styles.ariaStatus}>
              En ligne · {botInfo.clinic}
            </p>
          </div>
        </div>

        <button className={styles.resetBtn} onClick={handleReset}>
          ↺ Réinitialiser
        </button>
      </header>

      {/* MESSAGES */}
      <section className={styles.messagesZone}>
        {messages.map(msg => (
          <Message
            key={msg.id}
            msg={msg}
            isBot={msg.sender === 'bot'}
            userAvatar={avatar}
            userName={name}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef} />
      </section>

      {/* INPUT */}
      <footer className={styles.inputArea}>
  <div className={styles.inputWrapper}>
    <label htmlFor="chat-input" className={styles.srOnly}>
      Saisir un message
    </label>

    <textarea
      id="chat-input"
      ref={inputRef}
      className={styles.textarea}   // ✅ your original style restored
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Écrivez votre message… (Entrée pour envoyer)"
      rows={1}
      disabled={isTyping}
    />

    <button
      className={styles.sendBtn}    // ✅ your original style restored
      onClick={sendMessage}
      disabled={!input.trim() || isTyping}
      aria-label="Envoyer le message"
    >
      ↑
    </button>
  </div>

  <p id="chat-hint" className={styles.hint}>
    Appuyez sur <kbd>Entrée</kbd> pour envoyer · <kbd>Maj+Entrée</kbd> pour aller à la ligne
  </p>
</footer>

    </div>
  )
}