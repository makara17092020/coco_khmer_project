import Image from "next/image";
import Link from "next/link";
import { Package, Handshake,MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded transition-colors duration-200 ${
      pathname === path
        ? "bg-green-100 text-green-600"
        : "text-gray-700 hover:text-green-600 hover:bg-green-100"
    }`;

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
            href="/admin/products"
            className={linkClasses("/admin/products")}
          >
            <Package className="w-5 h-5" />
            <span className="text-sm font-medium">Products</span>
          </Link>
          <Link
            href="/admin/partnerships"
            className={linkClasses("/admin/partnerships")}
          >
            <Handshake className="w-5 h-5" />
            <span className="text-sm font-medium">Partnerships</span>
          </Link>
          <Link
            href="/admin/contact"
            className={linkClasses("/admin/contact")}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Contact</span>
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Coco Khmer
      </div>
    </aside>
  );
}
