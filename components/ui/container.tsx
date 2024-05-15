interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
	const classes = `container mx-auto px-4 sm:px-6 lg:px-8 ${className}`;

	return (
		<div className={classes}>
			{children}
		</div>
	);
}

export { Container };