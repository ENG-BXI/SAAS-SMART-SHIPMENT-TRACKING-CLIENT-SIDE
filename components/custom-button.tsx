import {Button} from './ui/button';
import {ICustomButton} from '../Interfaces/custom-button';
import {cn} from '@/lib/utils';
function CustomButton({text, type = 'primary', disable = false, className, IsSubmit = false, icon, onClick}: ICustomButton) {
  return (
    <Button onClick={onClick} disabled={disable} type={IsSubmit ? 'submit' : 'button'} variant={type == 'secondary' ? 'outline' : 'default'} className={cn('rounded-[3.5px]', type == 'primary' && 'bg-custom-primary-color dark:border dark:border-gray-700', type == 'danger' && 'bg-[#D92D20]', type == 'secondary' && 'text-black dark:text-white', className)}>
      {text}
      {icon}
    </Button>
  );
}
export default CustomButton;
