'use client';

import {useRef, useState} from 'react';
import {FileImage, XIcon} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import {Attachment as AttachmentItem, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle} from '@/components/ui/attachment';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import {Input} from '@/components/ui/input';
import Image from 'next/image';
import 'yet-another-react-lightbox/styles.css';

type Props = {
  value?: File;
  onChange: (file?: File) => void;
  accept?: string;
  disabled?: boolean;
  uploadLabel: string;
  removeLabel: string;
};

export default function Attachment({value, onChange, accept = 'image/*', disabled, uploadLabel, removeLabel}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const imageUrl = value ? URL.createObjectURL(value) : '';

  return (
    <div
      className='space-y-3 cursor-pointer'
      onClick={() => {
        if (value) setOpen(true);
      }}
    >
      <Input
        ref={inputRef}
        type='file'
        accept={accept}
        disabled={disabled}
        className='hidden'
        onChange={e => {
          const file = e.target.files?.[0];
          onChange(file);
        }}
      />

      {!value ? (
        <button
          type='button'
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className='
            w-full rounded-lg border border-dashed
            p-6 flex flex-col items-center
            justify-center cursor-pointer
            hover:bg-muted
          '
        >
          <FileImage className='h-8 w-8 mb-2' />
          <span className='text-sm'>{uploadLabel}</span>
        </button>
      ) : (
        <>
          <AttachmentItem className='w-full'>
            <AttachmentMedia variant='image'>
              <Image src={imageUrl} alt={value.name} fill className='h-full w-full object-cover' />
            </AttachmentMedia>

            <AttachmentContent>
              <AttachmentTitle>{value.name}</AttachmentTitle>

              <AttachmentDescription>{(value.size / 1024).toFixed(1)} KB</AttachmentDescription>
            </AttachmentContent>

            <AttachmentActions>
              <AttachmentAction
                type='button'
                aria-label={removeLabel}
                onClick={() => {
                  onChange(undefined);

                  if (inputRef.current) {
                    inputRef.current.value = '';
                  }
                }}
                disabled={disabled}
              >
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </AttachmentItem>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[
              {
                src: imageUrl
              }
            ]}
            plugins={[Zoom]}
            zoom={{
              maxZoomPixelRatio: 4,
              scrollToZoom: true,
              zoomInMultiplier: 1.5
            }}
          />
        </>
      )}
    </div>
  );
}
