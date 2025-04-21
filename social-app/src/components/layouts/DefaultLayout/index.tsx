import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

	
interface IDefaultLayoutProps {
	children: React.ReactNode;
}

const DefaultLayout = ({ children }: IDefaultLayoutProps) => {
	return (
		<div className="flex flex-col">
			<Header />
			<main className='mt-8 container mx-auto px-4 min-h-screen'>{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
