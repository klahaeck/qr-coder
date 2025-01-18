/* eslint-disable @next/next/no-img-element */
"use client";

// import { useEffect } from "react";
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
  const { setUrl, dataUrl } = useQrCode();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // mode: 'onChange', // Validate on every input change
  });

  // const watchUrl = watch("url");

  // useEffect(() => {
  //   if (watchUrl) {
  //     setUrl(watchUrl);
  //   }
  // }, [watchUrl, setUrl]);

  // useEffect(() => {
  //   if (dataUrl) {      
  //     saveDataUrl(dataUrl);
  //   }
  // }, [dataUrl]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setUrl(data.url);
    // console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 sm:p-20">
      <main className="flex flex-col gap-8 items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex items-center justify-center w-full">
            <div className="w-full grow">
              <label className="hidden">Color</label>
              <input {...register("url")} autoFocus className="text-lg bg-transparent py-1 outline-0 border-b border-white w-full" />
            </div>
            <button type="submit" className="text-lg lowercase py-1 pl-4 outline-0 border-b border-white disabled:text-white/50" disabled={!!errors.url}>Generate</button>
          </div>
          {errors.url && <p className="text-red-500">{errors.url.message}</p>}
        </form>

        {dataUrl && (
          <div className="flex flex-col gap-4">
            {/* <h2>QR Code</h2> */}
            <img src={dataUrl} alt="QR Code" />
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
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
