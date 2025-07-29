export const Burger = ({...props}) => {
	return (
		<svg width="24" height="14" {...props} viewBox="0 0 24 14" fill="none">
			<rect className="line-top" width="24" height="3" y="0" fill="#EFF4FF"/>
			<rect className="line-bottom" width="24" height="3" y="11" fill="#EFF4FF"/>
		</svg>
	)
}
