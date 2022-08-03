import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from "https://deno.land/x/supabase/mod.ts";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const json = (data: object, {status = 200} = {}) => {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status
 })
}

serve(async (req) => {
  const { username } = await req.json()

  const { error, data: ticketInfo } = await supabase
    .from('ticket')
    .select('*')
    .eq('user_name', username)

  if (error) {
    return json({ message: 'Error querying database' }, { status: 400 })
  }

  if (ticketInfo.length === 0) {
    return json({ message: 'User does not exist' }, { status: 400 })
  }


  const res = await fetch('https://miduconf.com/.netlify/functions/image?username=midudev&skipCache=true')

  if (!res.ok) {
    return json({ message: 'Error generating image' }, { status: 400 })
  }

  const arrayBuffer = await res.arrayBuffer()

  const { data: uploadedImage, error: errorUploadingImage } = await supabase.storage
    .from('tickets')
    .upload(`ticket_${username}.png`, arrayBuffer, {
      contentType: 'image/png',
    })

  console.log(uploadedImage)

  if (errorUploadingImage) {
    return json({ message: 'Error uploading image' }, { status: 400 })
  }

  const { error: errorUpdating } = await supabase
    .from('ticket')
    .update({ image: 'aaaaa' })
    .match({ user_name: username })

  if (errorUpdating) {
    return json({ message: 'Error querying database' }, { status: 400 })
  }

  return json({ message: `Image generated for ${username}` }, { status: 200 })
})
