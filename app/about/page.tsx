import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-2xl mx-auto max-w-6xl mt-8 md:mt-12 px-6 shadow-lg">
        <Image
          src="/imgs/bakers-1.jpeg"
          alt="Professional cake factory"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/50 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-3">
            About Us
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-xl">
            Committed to excellence in baking and training, from our factory to
            your celebration.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="prose prose-lg lg:prose-xl max-w-none text-gray-700">
          <p className="lead text-xl text-gray-800">
            We are a professional cake maker and academy, committed to
            excellence in baking and training. With our fully equipped cake
            factory, we produce high-quality cakes at scale and supply to
            companies, eateries, restaurants, and event vendors nationwide.
          </p>

          <div className="my-12 p-8 bg-blue-50/50 rounded-2xl border-l-4 border-accent">
            <h3 className="text-2xl font-bold text-primary not-prose">
              Our Mission to Empower
            </h3>
            <p className="mt-4">
              Beyond baking, we empower aspiring bakers through our academy,
              offering practical, hands-on training designed to turn passion
              into profit. Quality production, reliable supply, and skill
              development are at the heart of everything we do. 🎂
            </p>
          </div>

          <h2 className="text-3xl font-bold text-primary">What We Do</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <span>
                <strong>High-Quality Cake Production:</strong> We craft
                delicious cakes at scale in our state-of-the-art factory.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <span>
                <strong>Nationwide Supply Chain:</strong> We are a reliable
                partner for businesses and event vendors across the country.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <span>
                <strong>Baking Academy:</strong> We offer hands-on training
                courses to equip the next generation of professional bakers.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  );
}
