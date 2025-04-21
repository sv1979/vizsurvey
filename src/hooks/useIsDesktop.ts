import { useEffect, useState } from "react";

export const useIsDesktop = (breakpoint = 768): boolean => {
    const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= breakpoint);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isDesktop;
};
