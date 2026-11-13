import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const html = document.documentElement;
const toggleButton = document.querySelector("#toggledark");
const THEME_KEY = "theme";

const applyTheme = (isDark) => {
    html.classList.toggle("dark", isDark);
    if (toggleButton) {
        const nextLabel = isDark ? "Light mode" : "Dark mode";
        toggleButton.textContent = nextLabel;
        toggleButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
        toggleButton.setAttribute("aria-pressed", String(isDark));
    }
    try {
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    } catch (error) {
        // ignore storage issues in restricted environments
    }
};

const savedTheme = (() => {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch {
        return null;
    }
})();

const prefersDark = savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(prefersDark);

if (toggleButton) {
    toggleButton.addEventListener("click", () => {
        const nextDark = !html.classList.contains("dark");
        applyTheme(nextDark);
    });
}

const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });
tl.from("h1", { y: -40, opacity: 0 });

const replayBtn = document.querySelector("#replayBtn");
if (replayBtn) {
    replayBtn.addEventListener("click", function () {
        tl.restart();
    });
}

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
    "#services",
    { y: 50, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#services",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
        },
    }
);

gsap.fromTo(
    "#progressBar",
    { scaleX: 0 },
    {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        },
    }
);

ScrollTrigger.create({
    trigger: "#services",
    start: "top top",
    end: "bottom top",
    pin: true,
    pinSpacing: true,
    invalidateOnRefresh: true,
});

       