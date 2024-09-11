import { ImagePlus } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "~/components/ui/button"

/**
 * アイコン画像をアップロードする
 * @returns
 */
export function ImageUploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative">
      {!imageSrc && (
        <Button variant={"ghost"} className="rounded-full">
          <ImagePlus className="w-4" />
        </Button>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          className="flex h-20 w-full flex-col items-center justify-center rounded-lg"
        />
      )}
      <input
        title="Image Upload"
        ref={fileInputRef}
        type="file"
        accept=".webp,.png,.jpeg,.jpg,.gif,.svg,.bmp,.ico,.tiff,.tif,.svgz,.apng,.avif,.jfif,.pjpeg,.pjp,.jpgv,.hdp,.jpe,.jpeg2000,.jxr,.wdp,.jng,.jif,.jfi"
        onChange={onFileChange}
        className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  )
}
