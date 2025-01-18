"use client";

import { QrCodeProvider } from "@/contexts/QrCode";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({
  children,
}: ProvidersProps) {
  return (
    <>
      <QrCodeProvider>
        {children}
      </QrCodeProvider>
    </>
  );
}
