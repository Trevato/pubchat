import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import Header from '../components/Header'

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
      <Header />
      <table className="mt-8 w-full text-center">
        <thead>
          <tr>
            <th>Conversation ID</th>
          </tr>
        </thead>
        <tbody>
          {conversations.map(conversation => (
            <tr key={conversation.id}>
              <td>
                <Link href={`/conversation/${conversation.id}`}>
                  Conversation {conversation.id}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 w-full rounded bg-blue-500 py-2 text-white"
        onClick={createConversation}
      >
        New Chat
      </button>
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
