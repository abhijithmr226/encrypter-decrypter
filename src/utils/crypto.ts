import CryptoJS from 'crypto-js';

export const encrypt = (text: string, key: string): string => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decrypt = (encryptedText: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};