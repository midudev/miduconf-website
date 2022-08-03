import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^1.33.2'

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
  const { record } = await req.json()
  const { user_name: userName } = record ?? {}

  if (!userName) {
    console.error('userName is required')
    return json({ message: 'Error querying database' }, { status: 400 })
  }

  const res = await fetch(`https://miduconf.com/.netlify/functions/image?username=${userName}`)

  if (!res.ok) {
    console.error('Error generating image')
    return json({ message: 'Error generating image' }, { status: 400 })
  }

  const arrayBuffer = await res.arrayBuffer()

  const { data: uploadedImage, error: errorUploadingImage } = await supabase.storage
    .from('tickets')
    .upload(`ticket_${userName}.png`, arrayBuffer, {
      contentType: 'image/png',
      upsert: true
    })

  console.log(uploadedImage)

  if (errorUploadingImage) {
    console.error('Error uploading image')
    console.error(errorUploadingImage)
    return json({ message: 'Error uploading image' }, { status: 400 })
  }

  const { error: errorUpdating } = await supabase
    .from('ticket')
    .update({ image: 'todotodoaaaaa.png' })
    .match({ user_name: userName })

  if (errorUpdating) {
    return json({ message: 'Error querying database' }, { status: 400 })
  }

  return json({ message: `Image generated for ${userName}` }, { status: 200 })
})
