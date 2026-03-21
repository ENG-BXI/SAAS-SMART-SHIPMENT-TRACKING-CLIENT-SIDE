import {Button} from './ui/button';
import {ICustomButton} from '../Interfaces/custom-button';
import {cn} from '@/lib/utils';
function CustomButton({text, type = 'primary', disable = false, className, IsSubmit = false, icon}: ICustomButton) {
  return (
    <Button disabled={disable} type={IsSubmit ? 'submit' : 'button'} variant={type == 'secondary' ? 'outline' : 'default'} className={cn(type == 'primary' && 'bg-custom-primary-color', type == 'danger' && 'bg-[#D92D20]', type == 'secondary' && 'text-black', className)}>
      {text}
      {icon}
    </Button>
  );
}
export default CustomButton;
