import Link from "next/link";
import { Mail, Phone, MapPin, Share2, Camera } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="pt-24 pb-12 px-6 border-t border-primary/5 bg-white"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-black uppercase text-primary">
              Perfect White
            </h2>
          </div>
          <p className="text-sm text-primary/60 leading-relaxed mb-8">
            A sanctuary of design and flavor. Creating unforgettable cake and
            event experiences since 1984.
          </p>
        </div>

        {/* Collection */}
        <div>
          <h5 className="font-black text-primary uppercase tracking-widest text-xs mb-8">
            The Collection
          </h5>
          <ul className="space-y-5 text-sm font-medium text-primary/70">
            <li>
              <p className="hover:text-accent transition-colors">
                Wedding Cakes
              </p>
            </li>
            <li>
              <p className="hover:text-accent transition-colors">
                Celebration Cakes
              </p>
            </li>
            <li>
              <p className="hover:text-accent transition-colors">
                Seasonal Menu
              </p>
            </li>
            <li>
              <p className="hover:text-accent transition-colors">
                Tasting Boxes
              </p>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h5 className="font-black text-primary uppercase tracking-widest text-xs mb-8">
            Services
          </h5>
          <ul className="space-y-5 text-sm font-medium text-primary/70">
            <li>
              <p className="hover:text-accent transition-colors">
                Event Planning
              </p>
            </li>
            <li>
              <p className="hover:text-accent transition-colors">
                Catering Services
              </p>
            </li>
            <li>
              <p className="hover:text-accent transition-colors">Workshops</p>
            </li>
            <li>
              <p className="hover:text-accent transition-colors">
                Corporate Gifting
              </p>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="font-black text-primary uppercase tracking-widest text-xs mb-8">
            Connect
          </h5>
          <ul className="space-y-5 text-sm font-medium text-primary/70">
            <li className="flex items-center gap-3">
              <MapPin className="text-accent w-5 h-5" /> Nigeria
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-accent w-5 h-5" /> +234 802 7815 383
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-accent w-5 h-5" /> hello@perfectwhite.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-6xl mx-auto pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest font-black text-primary/40">
        <p>© 2026 Perfect White Cakes & Events.</p>
        <div className="flex gap-10">
          <Link href="#" className="hover:text-accent transition-colors">
            Privacy & Legal
          </Link>
          <Link href="#" className="hover:text-accent transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
