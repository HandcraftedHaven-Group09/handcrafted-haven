import Link from 'next/link';

export interface ButtonConfig {
  text: string;
  imagePath?: string;
  href: string;
}

export default async function NavButton({ config }: { config: ButtonConfig }) {
  return (
    <Link href={config.href}>
      {config.imagePath ? <img src={config.imagePath}></img> : ''} {config.text}
    </Link>
  );
}
