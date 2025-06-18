function Footer() {
  return (
    <footer className="px-6 py-10 mt-24 text-white border-t border-green-800 bg-gradient-to-r from-green-950 to-green-900">
      <div className="flex flex-col items-center justify-between gap-6 mx-auto max-w-7xl md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm text-green-400">
            Made with ❤️ by <span className="font-semibold">Raunak Patwal</span> &amp; <span className="font-semibold">Rishab Sood</span>
          </p>
          <p className="mt-1 text-xs text-white/60">© 2025 Leaf Disease Predictor. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-sm transition text-white/70 hover:text-green-400">Privacy</a>
          <a href="#" className="text-sm transition text-white/70 hover:text-green-400">Terms</a>
          <a href="#" className="text-sm transition text-white/70 hover:text-green-400">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
