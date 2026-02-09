import {Button} from './ui/button';
import {ICustomButton} from '../_Types/ICustomButton';
function CustomButton({text, type = 'primary', className, icon}: ICustomButton) {
  return (
    <Button variant={type == 'primary' ? 'default' : 'outline'} className={`${type == 'primary' ? 'bg-custom-primary-color' : 'text-black'} ${className}`}>
      {text}
      {icon}
    </Button>
  );
}
export default CustomButton;
