export default function SocialProofBanner() {
  return (
    <section className="bg-primary py-8 px-5">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="text-white text-lg tablet:text-xl font-bold mb-4">
          Join 4,200+ architects who save 40+ hours per project
        </p>
        <div className="flex items-center justify-center gap-3">
          {/* Overlapping avatars */}
          <div className="flex -space-x-2">
            {['M', 'T', 'S', 'L', 'A'].map((letter, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center border-2 border-primary"
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="text-white text-sm">
            <span className="text-star">★★★★★</span> 4.9/5 average rating
          </div>
        </div>
      </div>
    </section>
  );
}
