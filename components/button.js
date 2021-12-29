import Link from 'next/link';

export default function Button({ color, className, children, link, ...props }) {
  if (!color) {
    color = 'yellow';
  }
  const buttonClasses = 'rounded-lg px-8 py-2 border-b-[3px] border-l-[3px] font-bold duration-200';
  let colorClasses = '';

  switch (color) {
    case 'green':
      colorClasses = `bg-green-600 text-white border-green-700 hover:bg-green-700`;
      break;
    case 'gray':
      colorClasses = `bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300`;
      break;
    default:
      colorClasses = `bg-yellow-400 text-gray-800 border-yellow-500 hover:bg-yellow-500`;
  }

  return !link || !link.length ? (
    <button className={`${buttonClasses}  ${colorClasses} ${className}`} {...props}>
      {children}
    </button>
  ) : (
    <Link href={link} passHref>
      <a className={`${buttonClasses} inline-block text-center ${colorClasses} ${className}`} {...props}>
        {children}
      </a>
    </Link>
  );
}
