import Image from 'next/image';

const ModalImage = ({ src, name, width, height }: { src: string; name: string; width: number; height: number }) => {
  return <Image src={src} alt={name} width={width} height={height} />;
};

export default ModalImage;
