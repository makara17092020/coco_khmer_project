import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
    <footer className="bg-green-100 text-black px-6 pt-10 pb-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Left Side: Logo and Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start">
            {/* Logo */}
            <div className="flex-shrink-0 -mt-6">
              <Image
                src="/images/logo.png"
                alt="Coco Khmer Logo"
                width={100}
                height={40}
                className="object-contain"
              />
            </div>

            {/* Grid links */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-sm sm:text-base">
              <div>
                <h3 className="font-bold mb-2">SHOP</h3>
                <ul className="space-y-1">
                  <li className="hover:text-green-700 transition duration-200 hover:scale-105 cursor-pointer">FACE CARE</li>
                  <li className="hover:text-green-700 transition duration-200 hover:scale-105 cursor-pointer">BODY CARE</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">HELP</h3>
                <ul className="space-y-1">
                  <li className="hover:text-green-700 transition duration-200 hover:scale-105 cursor-pointer">SHIPPING & RETURNS</li>
                  <li className="hover:text-green-700 transition duration-200 hover:scale-105 cursor-pointer">PAYMENT</li>
                  <li className="hover:text-green-700 transition duration-200 hover:scale-105 cursor-pointer">FAQ</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">COCO KHMER</h3>
                <ul className="space-y-1">
                  <li className="hover:text-green-700 transition duration-200 hover:scale-105 cursor-pointer">OUR STORY</li>
                  <li className="hover:text-green-700 transition duration-200 hover:scale-105 cursor-pointer">CONTACT US</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">CONTACT US</h3>
                <p className="hover:text-green-700 transition-colors cursor-pointer">+855 92 534 669</p>
                <p className="hover:text-green-700 transition-colors cursor-pointer">INFO@COCOKHMER.COM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Map and Social */}
        <div className="flex-1 flex flex-col items-center gap-6">
          <div className="w-full h-56 sm:h-64 md:w-[300px] md:h-[230px]">
            <iframe
              title="Coco Khmer Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086924021383!2d104.89218411531088!3d11.55887679188783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109511915e88b51%3A0xb0c9d21a3a55a7!2sPhnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2sus!4v1690626758111!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 text-lg">
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-all duration-200 transform hover:scale-110 flex items-center gap-2"
            >
              <FaFacebookF />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-all duration-200 transform hover:scale-110 flex items-center gap-2"
            >
              <FaInstagram />
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-all duration-200 transform hover:scale-110 flex items-center gap-2"
            >
              <FaTiktok />
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
    {/* Bottom Line */}
      <div className="bg-green-400 text-center text-sm text-gray-600 space-y-1 py-4">
        <p>© 2025 CoCo Khmer. All Rights Reserved.</p>
        <p>Made in Cambodia | <span className="underline hover:text-green-800 cursor-pointer">Privacy Policy</span></p>
      </div>
    </>
  );
}
