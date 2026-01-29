import { useState, useEffect, useRef } from 'react';
import { Box, Skeleton } from '@mui/material';

interface LazyImageProps {
	src: string;
	alt: string;
	className: string;
	variant?: 'rectangular' | 'circular';
}

export const LazyImage = ({ src, alt, className, variant = 'rectangular' }: LazyImageProps) => {
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
			className={className} 
			style={{ 
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{!isLoaded && (
				<Skeleton 
					variant={variant}
					width="100%" 
					height="100%" 
					style={{ 
						position: 'absolute', 
						top: 0, 
						left: 0,
					}}
				/>
			)}
			{isInView && (
				<img
					src={src}
					alt={alt}
					onLoad={() => setIsLoaded(true)}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						opacity: isLoaded ? 1 : 0,
						transition: 'opacity 0.3s ease-in-out',
						borderRadius: isCircular ? '50%' : undefined,
					}}
				/>
			)}
		</Box>
	);
};
