export const copytoClipboard = (content: string) => {
  navigator.clipboard.writeText(content);
};
