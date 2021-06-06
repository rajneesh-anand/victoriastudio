import Link from 'next/link';
import React from "react";

const Button = ({ classOption, text, path }) => {
    return (
        <React.Fragment>
            <Link
                href={`${process.env.PUBLIC_URL + path}`}
               
            >
               <a  className={`${classOption}`}>{text}</a> 
            </Link>
        </React.Fragment>
    );
};


export default Button;
