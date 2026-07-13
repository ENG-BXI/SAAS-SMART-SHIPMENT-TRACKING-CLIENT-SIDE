import {cn} from '@/lib/utils';

interface HeaderProps {
  className?: string;
}
const Header = ({className}: HeaderProps) => {
  return (
    <div className={cn('flex z-1 justify-between items-center', className)}>
      <div>Logo</div>
      <ul className='flex items-center gap-x-4'>
        <li>Home</li>
        <li>Services</li>
        <li>Company</li>
        <li>Contact</li>
        <li>Register</li>
      </ul>
      <div>Register now</div>
    </div>
  );
};

export default Header;
