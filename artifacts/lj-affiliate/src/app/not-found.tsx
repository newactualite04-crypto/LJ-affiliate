import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl font-black text-brand-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page introuvable</h1>
        <p className="text-gray-500 mb-8">Cette page n'existe pas ou a été déplacée.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
