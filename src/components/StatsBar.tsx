import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StatsBar() {
  const stats = [
    { value: "0", label: "Legal Liabilities Post-Handover" },
    { value: "15+", label: "Projects Transitioned" },
    { value: "5000+", label: "Happy Residents Managed" },
    { value: "24/7", label: "Operations Support" },
  ];

  return (
    <div className="bg-primary-dark border-t border-white/10 relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-8 sm:p-12 text-center group hover:bg-white/5 transition-colors">
              <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-green mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="font-sans text-xs sm:text-sm font-medium text-text-4 uppercase tracking-wider max-w-[150px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
