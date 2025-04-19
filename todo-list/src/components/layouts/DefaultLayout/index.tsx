import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

	
interface IDefaultLayoutProps {
	children: React.ReactNode;
}

const DefaultLayout = ({ children }: IDefaultLayoutProps) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className='mt-18 flex-1'>{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
