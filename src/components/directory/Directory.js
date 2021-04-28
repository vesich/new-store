import React from 'react';
import ShopMen from '../../assets/mancho.jpg';
import ShopWomen from '../../assets/sophka.jpg';

import './directory.scss'

const Directory = () => {
    return (
        <div className='directory'>
            <div className="wrap">
                <div
                    className='item'
                    style={{ backgroundImage: `url(${ShopWomen})` }}
                ><a> Shop Womens</a>
                </div>
                <div
                    className='item'
                    style={{ backgroundImage: `url(${ShopMen})` }}
                >
                    <a> Shop Mens</a>
                </div>
            </div>
        </div>
    )
}

export default Directory
