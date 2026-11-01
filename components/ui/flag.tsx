import Image from 'next/image';

type FlagProps = {
  locale: 'sk' | 'en' | 'hu';
  size?: number;
};

export default function Flag({ locale, size }: FlagProps) {
  return (
    <Image
      src={`/svg/${locale}.svg`}
      alt={`${locale.toUpperCase()} flag`}
      width={size}
      height={size}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: '1.333333em',
        height: '1em',
        objectFit: 'contain',
        objectPosition: '50%',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    />
  );
}
