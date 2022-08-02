import { useChangeFlavour } from "@hooks/useChangeFlavour";
import { useShowNeededOptions } from '@hooks/useShowNeededOptions';

export default function ClientSideEffects ({ userName }) {
  useShowNeededOptions({ userName })
  useChangeFlavour()

  return <div />
}