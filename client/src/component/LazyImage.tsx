import { useState, useEffect, useRef } from 'react';
import { Box, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
	container: {
		position: 'relative',
		overflow: 'hidden'
	},
	skeleton: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%'
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		transition: 'opacity 0.3s ease-in-out'
	},
	imageCircular: {
		borderRadius: '50%'
	},
	imageLoaded: {
		opacity: 1
	},
	imageLoading: {
		opacity: 0
	}
});

interface LazyImageProps {
	src: string;
	alt: string;
	className: string;
	variant?: 'rectangular' | 'circular';
}

export const LazyImage = ({ src, alt, className, variant = 'rectangular' }: LazyImageProps) => {
	const classes = useStyles();
	const [isLoaded, setIsLoaded] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const imgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: '100px' }
		);

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const isCircular = variant === 'circular';

	return (
		<Box 
			ref={imgRef} 
			className={classNames(className, classes.container)}
		>
			{!isLoaded && (
				<Skeleton 
					variant={variant}
					className={classes.skeleton}
				/>
			)}
			{isInView && (
				<img
					src={src}
					alt={alt}
					onLoad={() => setIsLoaded(true)}
					className={classNames(classes.image, {
						[classes.imageCircular]: isCircular,
						[classes.imageLoaded]: isLoaded,
						[classes.imageLoading]: !isLoaded
					})}
				/>
			)}
		</Box>
	);
};
