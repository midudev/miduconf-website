export const Plus = ({ className = '', ...props }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <rect x='9' y='2' width='2' height='16' fill='#EFF4FF' />
      <rect x='2' y='9' width='16' height='2' fill='#EFF4FF' />
    </svg>
  )
}
