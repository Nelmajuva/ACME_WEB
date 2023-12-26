/**
 * Download document of type Blob.
 *
 * @param data - Blob
 * @param name - String
 */
export const downloadBlobElement = (data: Blob, name: string) => {
  const url = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('download', name ? name + '.pdf' : 'file.pdf');
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
};
