import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Header from '../../components/Header'
import Link from 'next/link'

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
    <div className="flex h-screen flex-col">
      <Header />
      <Link href="/">
        <p className="text-blue-500">Back</p>
      </Link>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="my-2 w-max rounded bg-blue-100 p-2">
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex-none">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            className="w-full rounded border p-2 text-black"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase
      .from('messages')
      .insert([
        { content: newMessage, conversation_id: id, created_at: new Date() }
      ])
    if (error) console.log('error', error)
    else {
      setNewMessage('')
      fetchMessages()
    }
  }
}
