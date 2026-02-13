import {Button} from './ui/button';
import {ICustomButton} from '../_Types/ICustomButton';
function CustomButton({text, type = 'primary', disable = false, className, IsSubmit = false, icon}: ICustomButton) {
  return (
    <Button disabled={disable} type={IsSubmit ? 'submit' : 'button'} variant={type == 'secondary' ? 'outline' : 'default'} className={`${type == 'primary' ? 'bg-custom-primary-color' : type == 'danger' ? 'bg-[#D92D20]' : 'text-black'} ${className}`}>
      {text}
      {icon}
    </Button>
  );
}
export default CustomButton;
