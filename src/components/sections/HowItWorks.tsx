const steps = [
  { num: 1, title: 'Choose Your Template', desc: 'Browse by software & style' },
  { num: 2, title: 'Instant Download', desc: 'Get your files immediately after purchase' },
  { num: 3, title: 'Start Designing', desc: 'Open in your software and customize' },
];

export default function HowItWorks() {
  return (
    <section className="py-12 px-5">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
          Ready in 3 Minutes
        </h2>

        <div className="flex flex-col items-center gap-0 tablet:flex-row tablet:gap-8 tablet:justify-center">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center text-center relative">
              {/* Connector line (mobile: vertical, tablet: hidden) */}
              {i < steps.length - 1 && (
                <div className="w-px h-8 bg-border tablet:hidden" />
              )}

              {/* Number circle */}
              <div className="w-12 h-12 rounded-full bg-accent text-white text-lg font-bold flex items-center justify-center mb-3">
                {step.num}
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm max-w-[200px]">
                {step.desc}
              </p>

              {/* Spacer for mobile between steps */}
              {i < steps.length - 1 && (
                <div className="w-px h-8 bg-border mt-4 tablet:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
