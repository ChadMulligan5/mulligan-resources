const API_KEY = 'AIzaSyApCqkF_N_JGftOcidAv5at9iIJ_trTBns';
const BASE    = 'https://www.googleapis.com/drive/v3/files';

export function cleanName(name) {
  return name.replace(/\.(pdf|docx|doc|html|htm|pptx|xlsx)$/i, '').trim();
}

export function getFileType(file) {
  const mime = file.mimeType || '';
  const name = file.name    || '';
  if (mime.includes('pdf')          || name.match(/\.pdf$/i))  return 'pdf';
  if (mime.includes('word')         || name.match(/\.docx?$/i)) return 'docx';
  if (mime.includes('html')         || name.match(/\.html?$/i)) return 'html';
  if (mime.includes('presentation') || name.match(/\.pptx?$/i)) return 'pptx';
  if (mime.includes('spreadsheet')  || name.match(/\.xlsx?$/i)) return 'xlsx';
  return 'file';
}

export function previewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function downloadUrl(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function viewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

async function driveQuery(q, fields = 'files(id,name,mimeType,size,modifiedTime)') {
  const url = `${BASE}?q=${encodeURIComponent(q)}&key=${API_KEY}&fields=${fields}&orderBy=name`;
  const res  = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Drive API error ${res.status}`);
  }
  const data = await res.json();
  return data.files || [];
}

export async function listSubFolders(folderId) {
  return driveQuery(
    `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    'files(id,name,mimeType)'
  );
}

export async function listFiles(folderId) {
  return driveQuery(
    `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`
  );
}
