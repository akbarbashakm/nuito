/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
interface ImageMarqueeSectionProps {
    images: string[];
    speed?: number;
    id?: string;
}

const ImageMarqueeSection: React.FC<ImageMarqueeSectionProps> = ({
    images,
    speed = 50,
    id
}) => {
    return (
        <section id={id} className="w-full overflow-hidden bg-lightbeige">
// ... rest of the code ...
        </section>
    );
};

export default ImageMarqueeSection; 