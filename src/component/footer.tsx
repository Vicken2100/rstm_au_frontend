import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon

export const Footer = () => {
    return (
        <div>
            <div className="bg-[#174A04] w-full px-16 py-16">
                <p className="text-white text-2xl mb-2">PT. Rekan Tani Sukses Makmur</p>
                <p className="text-white mb-2 mt-9">
                    Citraland, Kel. Winangun Satu, Kec. Malalayang, Kota Manado 95161, Provinsi Sulawesi Utara
                </p>
                <div className="flex items-center gap-2">
                    <FaWhatsapp className="text-green-500 text-lg" /> {/* WhatsApp Icon */}
                    <p className="text-white text-sm">082299248801</p>
                </div>
            </div>
        </div>
    );
};
