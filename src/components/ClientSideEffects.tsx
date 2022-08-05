import { useChangeFlavour } from '@hooks/useChangeFlavour'
import { useShowNeededOptions } from '@hooks/useShowNeededOptions'
import { useForceImage } from '@hooks/useForceImage'

export default function ClientSideEffects ({ image, userName }) {
	useShowNeededOptions({ userName })
	useChangeFlavour()
	useForceImage({ image })

	return <div />
}
