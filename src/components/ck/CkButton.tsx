import { motion } from "framer-motion";
import { ReactNode } from "react";
import { liftHover, microTransition, subtleTap } from "@/lib/motion";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
};

export default function CkButton({ children, variant = "primary", size = "md", onClick, className = "", icon }: Props) {
  const sizes: Record<string, string> = {
    sm: "!min-h-10 !text-[13px]",
    md: "",
    lg: "",
  };
  const variants: Record<string, string> = {
    primary: "ui-button-primary",
    secondary: "ui-button-secondary",
  };
  return (
    <motion.button
      whileHover={liftHover}
      whileTap={subtleTap}
      transition={microTransition}
      onClick={onClick}
      className={`ui-button ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
      {icon}
    </motion.button>
  );
}
