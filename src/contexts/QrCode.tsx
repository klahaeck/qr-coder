import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import QRCode from 'qrcode';

type QrCodeContextProviderProps = {
  children: ReactNode
}

type QrCodeContext = {
  url: string | null
  dataUrl: string | null
  setUrl: (url: string) => void
}

const QrCodeContext = createContext<QrCodeContext | null>(null)

export function QrCodeProvider({ children }: QrCodeContextProviderProps) {
  const [ url, setUrl ] = useState<string | null>(null);
  const [ dataUrl, setDataUrl ] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      QRCode.toDataURL(url, {
        width: 512,
        // maskPattern: 2,
        margin: 1,
      }, (err, result) => {
        if (err) console.error(err);
        setDataUrl(result);
      });
    }
  }, [url]);

  return (
    <QrCodeContext.Provider value={{
      url,
      setUrl,
      dataUrl,
    }}>
      {children}
    </QrCodeContext.Provider>
  )
}

export function useQrCode() {
  const context = useContext(QrCodeContext)
  if (!context) {
    throw new Error('useQrCode must be used within a QrCodeProvider')
  }
  return context
}