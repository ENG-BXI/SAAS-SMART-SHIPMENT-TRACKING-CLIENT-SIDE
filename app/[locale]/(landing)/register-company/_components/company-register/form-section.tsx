import {ReactNode} from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export default function FormSection({title, children}: FormSectionProps) {
  return (
    <section className='space-y-6'>
      <h2 className='text-2xl font-semibold'>{title}</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5'>{children}</div>
    </section>
  );
}
