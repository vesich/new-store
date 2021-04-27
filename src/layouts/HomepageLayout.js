import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';

const HomepageLayout = (props) => {
    return (
        <div className='fullHeight'>
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}

export default HomepageLayout;
