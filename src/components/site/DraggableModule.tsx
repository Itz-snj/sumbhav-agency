import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface DraggableModuleProps {
  children: ReactNode;
  label?: string;
  className?: string;
  delay?: number;
  initialY?: number;
}

export function DraggableModule({
  children,
  label,
  className,
  delay = 0,
  initialY = 20,
}: DraggableModuleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const showBorder = isHovered || isDragging;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.15}
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      whileDrag={{ scale: 1.02, zIndex: 50 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={cn(
        "relative cursor-grab active:cursor-grabbing select-none",
        className
      )}
    >
      {/* Figma-style selection border */}
      {showBorder && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          className="selection-border"
        >
          <div className="selection-corner" style={{ top: 0, left: 0, transform: 'translate(-50%, -50%)' }} />
          <div className="selection-corner" style={{ top: 0, right: 0, transform: 'translate(50%, -50%)' }} />
          <div className="selection-corner" style={{ bottom: 0, right: 0, transform: 'translate(50%, 50%)' }} />
          <div className="selection-corner" style={{ bottom: 0, left: 0, transform: 'translate(-50%, 50%)' }} />
        </motion.div>
      )}

      {/* Optional Top Bar for generic modules */}
      {label && (
        <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 relative z-10">
          <span className="inline-flex items-center gap-1.5">
            <GripVertical size={12} /> {label}
          </span>
          <span className={cn("transition-opacity", showBorder ? "opacity-100" : "opacity-0")}>
            [ DRAG ]
          </span>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
