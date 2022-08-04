import { queryGraphQL } from '../utils/graphql'

export const getAllSpeakers = async () => {
	const query = `{
    speakers {
      id
      name
      description
      avatar {
        url
      }
    }
  }`

	const { data } = await queryGraphQL({ query })
	const { speakers } = data
	return speakers
}
