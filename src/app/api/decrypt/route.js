import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET_SALT = "IniAdalahGaramRahasiaAplikasiKitaYangSangatPanjang";

const generateHourlyKey = () => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const day = now.getUTCDate();
    const hour = now.getUTCHours();
    const sourceString = `${SECRET_SALT}-${year}-${month}-${day}-${hour}`;
    const key = crypto.createHash('sha256').update(sourceString).digest('hex').replace(/[^a-zA-Z]/g, '').substring(0, 16);
    return key;
};

const vigenereCipher = (text, key, isEncrypt) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    let keyIndex = 0;
    const lowerKey = key.toLowerCase();

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const lowerChar = char.toLowerCase();
        const charIndex = alphabet.indexOf(lowerChar);

        if (charIndex !== -1) {
            const keyChar = lowerKey[keyIndex % lowerKey.length];
            const keyCharIndex = alphabet.indexOf(keyChar);
            
            let newIndex;
            if (isEncrypt) {
                newIndex = (charIndex + keyCharIndex) % 26;
            } else {
                newIndex = (charIndex - keyCharIndex + 26) % 26;
            }
            const newChar = char === lowerChar ? alphabet[newIndex] : alphabet[newIndex].toUpperCase();
            result += newChar;
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
};

export async function POST(request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
    }
    const key = generateHourlyKey();
    const decryptedText = vigenereCipher(text, key, false);
    return NextResponse.json({ result: decryptedText });
  } catch (error) {
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}