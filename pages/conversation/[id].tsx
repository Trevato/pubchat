import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bwkehkcxizbwmauxqayh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2Voa2N4aXpid21hdXhxYXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4ODEzNjcsImV4cCI6MjAxNDQ1NzM2N30.gKaZcIDJewpEHCPvu6INESSR1Wr53KOlzMIaZtblTqg'
)

export default function Conversation() {
  const router = useRouter()
  const { id } = router.query
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [id])

  async function fetchMessages() {
    let { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', id)
    if (error) console.log('error', error)
    else setMessages(data || [])
  }

  return (
    <div>
      <h1>Conversation {id}</h1>
      {messages.map((message, index) => (
        <p key={index}>{message.content}</p>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )

  async function sendMessage() {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ content: newMessage, conversation_id: id, created_at: new Date() }])
    if (error) console.log('error', error)
    else {
      setNewMessage('')
      fetchMessages()
    }
  }
}