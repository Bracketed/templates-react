import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { ArrowLeft, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

const errors: Array<{ code: string; message: string; title: string }> = [
	{ code: '400', title: 'Bad Request', message: "Something's off with your request. Maybe check your spelling?" },
	{
		code: '401',
		title: 'Content Unauthorised',
		message: 'You need to be logged in or have special powers to see this page.',
	},
	{
		code: '402',
		title: 'Payment Required',
		message: "This page costs money. Sadly, we don't accept Monopoly money.",
	},
	{ code: '403', title: 'Forbidden', message: "Nice try, but you don't have permission to access this." },
	{
		code: '404',
		title: 'Page Not Found',
		message: "The page you're looking for doesn't exist or has been moved. Or maybe it's hiding.",
	},
	{ code: '405', title: 'Method Not Allowed', message: "You can't do that here. Try a different approach!" },
	{
		code: '406',
		title: 'Not Acceptable',
		message: "We can't serve the content in the way you want. Picky, aren't you?",
	},
	{
		code: '407',
		title: 'Proxy Authentication Required',
		message: 'You need to prove yourself to the proxy before proceeding.',
	},
	{ code: '408', title: 'Request Timeout', message: 'That took too long. The server got bored and left.' },
	{
		code: '409',
		title: 'Conflict',
		message: "There's a conflict. Maybe the server and your request need to talk it out.",
	},
	{ code: '410', title: 'Gone', message: "This page used to be here, but now it's gone. Like your missing socks." },
	{
		code: '411',
		title: 'Length Required',
		message: 'You forgot to tell us how long your request is. Details matter!',
	},
	{ code: '412', title: 'Precondition Failed', message: "Your request didn't meet our expectations. Try again?" },
	{ code: '413', title: 'Payload Too Large', message: "That's a big request! Try sending something smaller." },
	{ code: '414', title: 'URI Too Long', message: 'Your link is way too long. Maybe shorten it a bit?' },
	{
		code: '415',
		title: 'Unsupported Media Type',
		message: "We can't handle that type of file. Try something more mainstream.",
	},
	{ code: '416', title: 'Range Not Satisfiable', message: "You asked for a range that's out of bounds. Try again?" },
	{ code: '417', title: 'Expectation Failed', message: 'We expected something else. Disappointment all around.' },
	{ code: '418', title: "I'm a Teapot", message: "I'm a teapot, not a coffee machine. Yes, this is a real error." },
	{ code: '421', title: 'Misdirected Request', message: 'This request went to the wrong place. GPS malfunction?' },
	{
		code: '422',
		title: 'Unprocessable Entity',
		message: "We understood your request, but can't process it. Try again?",
	},
	{ code: '423', title: 'Locked', message: 'This resource is locked. Maybe try the secret handshake?' },
	{
		code: '424',
		title: 'Failed Dependency',
		message: "Something else failed, so this can't work either. Blame the other guy.",
	},
	{ code: '425', title: 'Too Early', message: "You're too early. Come back later!" },
	{ code: '426', title: 'Upgrade Required', message: 'You need to upgrade your request. New and shiny is better!' },
	{ code: '428', title: 'Precondition Required', message: 'You need to set some conditions before proceeding.' },
	{ code: '429', title: 'Too Many Requests', message: "Slow down! You're sending too many requests." },
	{ code: '431', title: 'Request Header Fields Too Large', message: 'Your headers are too big. Trim them down!' },
	{
		code: '451',
		title: 'Unavailable For Legal Reasons',
		message: 'This page is blocked for legal reasons. The lawyers said no.',
	},
];

export default function Page() {
	const { abortStatusCode, is404 } = usePageContext();
	const [content, setContent] = useState<{
		code: string;
		message: string;
		title: string;
	}>({ code: '', message: 'Loading error message...', title: 'Loading' });

	useEffect(() => {
		if (is404) {
			const c = errors.find((e) => e.code === '404');
			if (!c) return;
			else return setContent(c);
		}
		if (abortStatusCode) {
			const c = errors.find((e) => e.code === abortStatusCode.toString());
			if (!c) return;
			else return setContent(c);
		}

		return setContent({
			code: '</>',
			title: 'Internal Programming Error',
			message:
				'A part of the website did not function as intended resulting in a client error, this page may be broken, we strongly advise contacting a member of the Bracketed Softworks development team to notify them or opening a ticket with support.',
		});
	}, [is404, abortStatusCode]);

	return (
		<div
			className='text-center flex gap-7 items-center justify-center px-8'
			style={{ height: 'calc(100vh - 4.5rem)' }}
		>
			<span className='text-[17rem] flex-1 font-black text-white'>{content.code}</span>

			<div className='gap-4 flex-1 justify-center'>
				<div>
					<h2 className='text-3xl text-start font-semibold text-foreground mb-4'>{content.title}</h2>
					<p className='text-lg text-start text-muted-foreground mb-8'>{content.message}</p>
				</div>
				<div className='flex gap-4'>
					<Button asChild className='bg-primary hover:bg-primary/90 text-primary-foreground'>
						<Link to='/'>
							<Home className='w-4 h-4 mr-2' />
							Go Home
						</Link>
					</Button>
					<Button
						variant='outline'
						onClick={() => globalThis.history.back()}
						className='text-foreground hover:bg-muted'
					>
						<ArrowLeft className='w-4 h-4 mr-2' />
						Go Back
					</Button>
				</div>
			</div>
		</div>
	);
}
