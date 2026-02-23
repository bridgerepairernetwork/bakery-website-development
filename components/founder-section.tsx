import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          Founder
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-start items-center">
            <div className="order-2 md:order-1">
              <div className="bg-linear-to-br from-red-400 to-amber-400 rounded-2xl overflow-hidden shadow-lg h-96">
                <Image
                  loading="eager"
                  src="/imgs/founder-7.jpeg"
                  alt="Founder"
                  width={500}
                  height={500}
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 mt-5 flex flex-col items-center md:items-start">
              <p className="text-blue-600 font-semibold uppercase text-sm mb-2">
                Testimonial
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Mojisola Olawale
              </h3>
              <p className="text-gray-600 mb-6 md:leading-relaxed text-center md:text-start">
                Hi, I am Mojisola olawale I am a passionate certified baker and
                business coach dedicated to helping people create success in
                baking and in business. As a baker, I craft delicious,
                beautifully designed cakes that make every celebration special.
                As a business coach, I help individuals turn their skills and
                gifts into profitable ventures with clarity, strategy, and
                confidence. I don&#39;t just bake and build businesses — I help
                others do the same.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
