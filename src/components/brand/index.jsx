import Link from 'next/link';


const Brand = ({ data }) => {
    return (
        <div className="brand-logo-item">
            <Link href="/">
                <img
                    src={process.env.PUBLIC_URL + data.image}
                    alt="hope-Brand-Logo"
                />
            </Link>
        </div>
    );
};


export default Brand;
