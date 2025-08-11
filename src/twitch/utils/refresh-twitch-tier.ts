interface RefreshTwitchTierSuccessResponse {
  twitchTier: '1' | '2' | '3' | null
  error: null
}

interface RefreshTwitchTierErrorResponse {
  twitchTier: null
  error: string
}

type RefreshTwitchTierResponse = RefreshTwitchTierSuccessResponse | RefreshTwitchTierErrorResponse

export const refreshTwitchTier = async (): Promise<RefreshTwitchTierResponse> => {
  try {
    const response = await fetch('/api/twitch/refresh-tier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    
    return {
      twitchTier: data.twitchTier || null,
      error: null
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to refresh Twitch tier'
    console.error('Error refreshing Twitch tier:', error)
    
    return {
      twitchTier: null,
      error: message
    }
  }
}