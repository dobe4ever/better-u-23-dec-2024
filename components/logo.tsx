import Image from 'next/image'

export function LogoWhite() {
  return (
    <div className="flex items-center">
      <Image
        src="/assets/logos/logo-symbol-white.svg"
        alt="Better You everyday Logo"
        width={28}
        height={28}
        // className="w-full h-full"
        priority
      />
    </div>
  )
}

export function LogoOrange() {
  return (
    <div className="flex items-center">
      <Image
        src="/assets/logos/logo-symbol-orange.svg"
        alt="Better You everyday Logo"
        width={28}
        height={28}
        // className="w-full h-full"
        priority
      />
    </div>
  )
}