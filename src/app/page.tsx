"use client";

import Image from "next/image";
import { useQrCode } from "@/contexts/QrCode";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { saveQrCode } from "@/lib/directus";

const schema = z.object({
  url: z.string().url('Please enter a valid URL'), // URL validation
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const { url, setUrl, dataUrl } = useQrCode();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit', // Validate only on form submission
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { url } = data;
    setUrl(url);
    reset();
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full p-6 sm:p-14">
      <main className="w-full flex flex-col gap-8 items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex items-center justify-center w-full">
            <div className="w-full grow">
              <label className="hidden">Color</label>
              <input {...register("url")} autoFocus className="text-lg bg-transparent py-1 outline-0 border-b border-white w-full" />
            </div>
            <button type="submit" className="text-lg lowercase py-1 pl-4 outline-0 border-b border-white disabled:text-white/50" disabled={!!errors.url}>Generate</button>
          </div>
          {isSubmitted && errors.url && <p className="text-red-500">{errors.url.message}</p>}
        </form>

        {url && dataUrl && (
          <div className="border border-black">
            <a href={url} target="_blank"><h2 className="text-center text-md mb-2 w-auto">{url}</h2></a>
            <Image src={dataUrl} alt="QR Code" width={512} height={512} />
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 text-xs uppercase flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://thesion.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          /> */}
          Thesion Tools
        </a>
      </footer>
    </div>
  );
}
