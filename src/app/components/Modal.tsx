// components/Modal.tsx
export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-red-600 hover:text-red-800"
        >
          ×
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
