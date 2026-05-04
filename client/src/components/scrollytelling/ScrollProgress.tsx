import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  sections: { id: string; title: string }[];
  activeSection: number;
  onSectionClick: (index: number) => void;
}

export function ScrollProgress({ sections, activeSection, onSectionClick }: ScrollProgressProps) {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <div key={section.id} className="flex items-center gap-3">
            {/* Dot */}
            <motion.button
              onClick={() => onSectionClick(index)}
              className={cn(
                "w-3 h-3 rounded-full border-2 transition-all duration-300",
                index === activeSection
                  ? "bg-white border-white scale-125"
                  : "bg-transparent border-white/50 hover:border-white/80 hover:scale-110"
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            
            {/* Label */}
            <motion.div
              className={cn(
                "text-sm font-medium transition-all duration-300 origin-left",
                index === activeSection
                  ? "text-white opacity-100 translate-x-0"
                  : "text-white/60 opacity-0 -translate-x-4"
              )}
            >
              {section.title}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Progress Line */}
      <div className="absolute top-0 bottom-0 right-1.5 w-0.5 bg-white/20">
        <motion.div
          className="w-full bg-white transition-all duration-500"
          style={{
            height: `${((activeSection + 1) / sections.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
}
