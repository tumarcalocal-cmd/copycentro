import { useState, useEffect, useCallback } from 'react';

/**
 * Checks if the current environment is the development/editor environment.
 * Development URLs are: 'ais-dev-*', 'localhost', '127.0.0.1'.
 * The public shared app URL is: 'ais-pre-*' or external custom domains.
 */
export function isDevHost(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const hostname = window.location.hostname;
    const search = window.location.search;
    const isExplicitAdmin = search.includes('admin=1') || search.includes('editor=1') || search.includes('edit=1');
    return (
      hostname.includes('ais-dev') || 
      hostname.includes('localhost') || 
      hostname === '127.0.0.1' || 
      hostname.includes('webcontainer') ||
      isExplicitAdmin
    );
  } catch {
    return false;
  }
}

/**
 * Hook to determine if the user is in private editor mode.
 * GUARANTEE: In the public shared app ('ais-pre' or public production URL),
 * this returns FALSE unconditionally, ensuring NO public visitor can see
 * upload buttons, camera controls, or change any photos.
 */
export function useEditorMode(): boolean {
  const [isEditor, setIsEditor] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const isDev = isDevHost();
      const params = new URLSearchParams(window.location.search);
      const isExplicitAdmin = params.get('admin') === '1' || params.get('editor') === '1' || params.get('edit') === '1';

      if (isExplicitAdmin) return true;

      // On public/shared hosts ('ais-pre' etc.), ALWAYS false unless explicitly admin/editor
      if (!isDev) {
        return false;
      }

      // In dev host, check if user is testing client preview
      const previewAsClient = localStorage.getItem('pdp_preview_as_client') === 'true';
      if (previewAsClient) return false;

      return true;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleStorage = () => {
      const isDev = isDevHost();
      const params = new URLSearchParams(window.location.search);
      const isExplicitAdmin = params.get('admin') === '1' || params.get('editor') === '1' || params.get('edit') === '1';

      if (isExplicitAdmin) {
        setIsEditor(true);
        return;
      }

      if (!isDev) {
        setIsEditor(false);
        return;
      }

      const previewAsClient = localStorage.getItem('pdp_preview_as_client') === 'true';
      setIsEditor(!previewAsClient);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('pdp_editor_mode_toggle', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('pdp_editor_mode_toggle', handleStorage);
    };
  }, []);

  return isEditor;
}

/**
 * Allows the owner in development to toggle between Editor Mode and Client Preview Mode
 * to verify with 100% confidence how visitors will see the site.
 */
export function toggleClientPreview(forcePreview?: boolean) {
  if (typeof window === 'undefined') return;
  const current = localStorage.getItem('pdp_preview_as_client') === 'true';
  const next = forcePreview !== undefined ? forcePreview : !current;
  if (next) {
    localStorage.setItem('pdp_preview_as_client', 'true');
  } else {
    localStorage.removeItem('pdp_preview_as_client');
  }
  window.dispatchEvent(new Event('pdp_editor_mode_toggle'));
}

export function enableEditorMode() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('pdp_preview_as_client');
  window.dispatchEvent(new Event('pdp_editor_mode_toggle'));
}
