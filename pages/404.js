import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className='error-container'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <Link href="">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default Custom404;
