import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <MotionSection as="div" className="flex min-h-[100svh] items-center justify-center bg-muted">
      <div className="text-center">
        <MotionHeading>
        <h1 className="mb-4 text-4xl font-medium">404</h1>
        </MotionHeading>
        <MotionElement role="copy">
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        </MotionElement>
        <MotionElement role="cta">
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
        </MotionElement>
      </div>
    </MotionSection>
  );
};

export default NotFound;
