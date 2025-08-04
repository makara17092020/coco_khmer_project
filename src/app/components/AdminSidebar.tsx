import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react"; // You can install lucide-react for icons

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between p-6">
      {/* Logo Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600 hover:bg-green-100 px-4 py-2 rounded transition-colors duration-200"
          >
            <Package className="w-5 h-5" />
            <span className="text-sm font-medium">Products</span>
          </Link>
        </nav>
      </div>

      {/* Footer (optional) */}
      <div className="text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Coco Khmer
      </div>
    </aside>
  );
}
