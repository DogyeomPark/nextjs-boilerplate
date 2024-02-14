'use client';

import styles from './ImageUpload.module.css';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string | undefined;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='wx8oy6f9'
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()} className={styles.container}>
            <TbPhotoPlus size={50} />
            <div className={styles.uploadLabel}>Click to upload</div>
            {value && (
              <div className={styles.imageContainer}>
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt='House'
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
