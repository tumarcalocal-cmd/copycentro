import { useCallback } from 'react';
import { EmpastadoConfig } from '../types';

export const useFileUpload = (
  setConfig: React.Dispatch<React.SetStateAction<EmpastadoConfig>>
) => {
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
        const estimatedPages = Math.min(250, Math.max(25, Math.round(file.size / 45000)));
        setConfig(prev => ({
          ...prev,
          uploadedFileName: file.name,
          uploadedFileSize: `${sizeMB} MB`,
          detectedPages: estimatedPages,
          pages: estimatedPages,
        }));
      }
    },
    [setConfig]
  );

  return { handleFileUpload };
};
