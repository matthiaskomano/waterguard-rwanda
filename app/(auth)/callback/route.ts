import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // This looks for the exact redirect_to parameter we added to the email link
  const next = searchParams.get('redirect_to') ?? searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successfully verified! Send the client to the setup page (or dashboard)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If the link is expired or invalid, send them back to the homepage
  return NextResponse.redirect(`${origin}/`)
}