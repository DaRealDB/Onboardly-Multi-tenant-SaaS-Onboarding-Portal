// Navbar component
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-8">
        <span className="text-[24px] font-bold text-gray-900 tracking-tight">Onboardly</span>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-[13px] font-bold  text-gray-700 hover:text-gray-900 transition-colors">Features</a>
          <a href="#" className="text-[13px] font-bold  text-gray-700 hover:text-gray-900 transition-colors">How It Works</a>
          <a href="#" className="text-[13px] font-bold  text-gray-700 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#" className="text-[13px] font-bold  text-gray-700 hover:text-gray-900 transition-colors">Case Studies</a>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <a href="#" className="hidden md:block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Sign In</a>
        <button className="px-5 py-2 text-sm font-medium text-white bg-[#2563EB] rounded hover:bg-blue-700 transition-colors">
          Start Free Trial
        </button>
      </div>
    </nav>
  );
}