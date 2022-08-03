export const UserTicketInfo = ({ userName, userFullName }) => {
	return (
		<div class='flex items-center space-x-4'>
			<img class='rounded-full w-14 h-14' src={`https://unavatar.io/github/${userName}`} alt='' />
			<div class=''>
				<div class='font-mono font-bold text-blue-800'>{`@${userName ?? ''}`}</div>
				<div class='text-2xl font-bold text-slate-900'>{userFullName}</div>
			</div>
		</div>
	)
}
