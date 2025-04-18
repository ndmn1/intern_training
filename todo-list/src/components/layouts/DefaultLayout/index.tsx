import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

	
interface IDefaultLayoutProps {
	children: React.ReactNode;
}

const DefaultLayout = ({ children }: IDefaultLayoutProps) => {
	return (
		<div >
			<Header />
			<main >{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
