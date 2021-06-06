import Link from 'next/link'


const Logo = ({ image, classOption }) => {
    return (
        <Link className={`${classOption}`} href={process.env.PUBLIC_URL + "/"}>
            <img
                className="sticky-img"
                src={process.env.PUBLIC_URL + image}
                alt="Logo"
            />
        </Link>
    );
};


export default Logo;
