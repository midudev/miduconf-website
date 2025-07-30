export const Plus = ({ ...props }) => {
  return (
    <svg
      width='25'
      {...props}
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='4.5' y='11' width='16' height='2' fill='black' />
      <rect x='13.5' y='4' width='16' height='2' transform='rotate(90 13.5 4)' fill='black' />
    </svg>
  )
}
