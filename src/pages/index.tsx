import { LinkGenerator } from '@modules/LinkGenerator';
import Head from 'next/head';

import type { NextPage, NextPageContext } from 'next';

type HomePageProps = {
	host: string;
};

const HomePage: NextPage<HomePageProps> = ({ host }: HomePageProps) => {
	return (
		<>
			<Head>
				<title>Link shorter</title>
				<meta name='description' content='Link shortener' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto flex min-h-screen flex-col items-center justify-center p-4'>
				<LinkGenerator host={host} />
			</main>
		</>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	let protocol = 'https';
	if (process.env.NODE_ENV == 'development') {
		protocol = 'http';
	}

	return {
		props: {
			host: `${protocol}://${context.req?.headers.host}`
		}
	};
}

export default HomePage;
