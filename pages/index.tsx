import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  'https://bwkehkcxizbwmauxqayh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2Voa2N4aXpid21hdXhxYXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4ODEzNjcsImV4cCI6MjAxNDQ1NzM2N30.gKaZcIDJewpEHCPvu6INESSR1Wr53KOlzMIaZtblTqg'
)

export default function Home() {
  const [conversations, setConversations] = useState<any[]>([])

  useEffect(() => {
    fetchConversations()
  }, [])

  async function fetchConversations() {
    let { data, error } = await supabase.from('conversations').select('*')
    if (error) console.log('error', error)
    else setConversations(data || [])
  }

  return (
    <div>
      <h1>Conversations</h1>
      {conversations.map((conversation) => (
        <Link key={conversation.id} href={`/conversation/${conversation.id}`}>
          <a>Conversation {conversation.id}</a>
        </Link>
      ))}
      <button onClick={createConversation}>New Conversation</button>
    </div>
  )

  async function createConversation() {
    const { data, error } = await supabase
      .from('conversations')
      .insert([{ created_at: new Date() }])
    if (error) console.log('error', error)
    else fetchConversations()
  }
}