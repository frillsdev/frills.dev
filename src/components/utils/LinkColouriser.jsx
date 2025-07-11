import { useEffect, useRef } from "react";

export default function LinkColouriser() {
    const ref = useRef(null);

    useEffect(() => {
        let parent = ref.current?.parentElement;
        while (parent && parent.tagName.toLowerCase() !== "main") {
            parent = parent.parentElement;
        }

        if (!parent) return;

        const links = parent.querySelectorAll("a");
        if (!links.length) return;

        const colours = Array.from({ length: 6 }, (_, i) => `var(--post-link-${i + 1})`);
        const shuffled = colours.sort(() => Math.random() - 0.5);

        links.forEach((link, index) => {
            const colour = shuffled[index % shuffled.length];
            link.style.setProperty("--color", colour);
        });
    }, []);

    return <span ref={ref} style={{ display: "none" }} aria-hidden="true" />;
}
