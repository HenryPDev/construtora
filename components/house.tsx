import Image from 'next/image';

interface HouseProps {
    image: string;
    title: string;
    description: string;
    price?: string;
    location?: string;
}

export default function House({ image, title, description, price, location }: HouseProps) {
    return (
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-4 h-75">
            <div className="md:w-1/2 relative">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>
            <div className="p-4 flex items-center ">
                <div>
                    <h2 className="text-2xl poppins-bold mb-1">{title}</h2>
                    {location && <p className="text-gray-600 mb-2">Localização: {location}</p>}
                    <p className="text-gray-800 mb-2">{description}</p>
                    {price && <p className="text-lg poppins-semibold text-green-600">Preço: {price}</p>}
                </div>
            </div>
        </div>
    )
}