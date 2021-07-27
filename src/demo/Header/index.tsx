import React, { useState } from 'react';

const Header = (props) => {

    const { handleClick1 } = props;
    const [name, setName] = useState(0);
    const handleClick = () => {
        setName(666);
    }
    return <div className="test" data-test='div' onClick={handleClick}>
        {[
            <div data-test="div1" key="1" onClick={handleClick1}>{name}</div>,
            <div key="2">2</div>,
            <div key="3">3</div>
        ]}
    </div>
}

export default Header;
