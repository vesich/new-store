import React from 'react';
import './authwrapper.scss';

const AuthWrapper = ({ headline, children }) => {
    return (
        <div>
            <div className='authWrapper'>
                <div className="wrap">
                    {headline && <h2>{headline}</h2>}
                    <div className="children">
                        {children && children}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AuthWrapper
