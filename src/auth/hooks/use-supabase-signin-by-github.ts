import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

export const useSupabaseSignInByGitHub = () => {
  const supabase = getSupabaseBrowserClient()

  const signin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo }
    })

    if (error) {
      console.error(error)
    }
  }

  return { signin }
}

const redirectTo =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000/api/auth/callback'
    : 'https://miduconf.com/api/auth/callback'
