import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const ScrollArea = ({
	ref,
	className,
	children,
	showFadeEffects = false,
	shadowColor = 'card',
	...props
}: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
	ref?: React.RefObject<React.ComponentRef<typeof ScrollAreaPrimitive.Root>>;
	showFadeEffects?: boolean;
	shadowColor?: string;
}) => {
	const [isClient, setIsClient] = useState(false);
	const [canScrollUp, setCanScrollUp] = useState(false);
	const [canScrollDown, setCanScrollDown] = useState(false);
	const viewportRef = useRef<HTMLDivElement>(null);

	// Ensure we're on the client
	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!showFadeEffects || !isClient) return;

		const viewport = viewportRef.current;
		if (!viewport) return;

		const checkScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = viewport;
			setCanScrollUp(scrollTop > 10);
			setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10);
		};

		checkScroll();
		viewport.addEventListener('scroll', checkScroll);

		const resizeObserver = new ResizeObserver(checkScroll);
		resizeObserver.observe(viewport);

		return () => {
			viewport.removeEventListener('scroll', checkScroll);
			resizeObserver.disconnect();
		};
	}, [showFadeEffects, isClient]);

	// SSR fallback - render a simple div during server rendering
	if (!isClient) return <div className={cn('relative overflow-hidden', className)}>{children}</div>;

	return (
		<ScrollAreaPrimitive.Root ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
			{showFadeEffects && (
				<>
					<div
						className={cn(
							'absolute top-0 left-0 right-0 h-16 pointer-events-none z-10 transition-opacity duration-300',
							`bg-gradient-to-b from-${shadowColor} to-transparent`,
							canScrollUp ? 'opacity-100' : 'opacity-0'
						)}
					/>
					<div
						className={cn(
							'absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10 transition-opacity duration-300',
							`bg-gradient-to-t from-${shadowColor} to-transparent`,
							canScrollDown ? 'opacity-100' : 'opacity-0'
						)}
					/>
				</>
			)}
			<ScrollAreaPrimitive.Viewport ref={viewportRef} className='h-full w-full rounded-[inherit]'>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
};
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = ({
	ref,
	className,
	orientation = 'vertical',
	...props
}: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
	ref?: React.RefObject<React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;
}) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			'flex touch-none select-none transition-opacity duration-300',
			orientation === 'vertical' && 'h-full w-1.5 border-l border-l-transparent p-[1px] hover:w-2',
			orientation === 'horizontal' && 'h-1.5 flex-col border-t border-t-transparent p-[1px] hover:h-2',
			'opacity-0 data-[state=visible]:opacity-100 data-[state=visible]:animate-fade-in data-[state=hidden]:animate-fade-out',
			className
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb className='relative flex-1 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/40 transition-colors duration-200' />
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
