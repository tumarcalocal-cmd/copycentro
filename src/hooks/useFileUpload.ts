import { useCallback } from 'react';
import { EmpastadoConfig } from '../types';
import { addAttachments, removeAttachment } from '../utils/attachmentStore';

const summarize = (files: File[]) => {
  const totalMB = files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
  const doc = files.find(f => /pdf|word|officedocument/i.test(f.type) || /\.(pdf|docx?)$/i.test(f.name));
  const estimatedPages = doc ? Math.min(250, Math.max(25, Math.round(doc.size / 45000))) : null;
  return {
    uploadedFileNames: files.map(f => f.name),
    uploadedFileName: files.length ? files.map(f => f.name).join(', ') : null,
    uploadedFileSize: files.length ? `${totalMB.toFixed(1)} MB` : null,
    detectedPages: estimatedPages,
  };
};

export const useFileUpload = (
  setConfig: React.Dispatch<React.SetStateAction<EmpastadoConfig>>
) => {
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const picked = Array.from(e.target.files || []);
      e.target.value = '';
      if (!picked.length) return;
      const all = addAttachments('empastado', picked);
      const info = summarize(all);
      setConfig(prev => ({
        ...prev,
        ...info,
        pages: info.detectedPages ?? prev.pages,
      }));
    },
    [setConfig]
  );

  const handleRemoveFile = useCallback(
    (index: number) => {
      const all = removeAttachment('empastado', index);
      setConfig(prev => ({ ...prev, ...summarize(all) }));
    },
    [setConfig]
  );

  return { handleFileUpload, handleRemoveFile };
};
