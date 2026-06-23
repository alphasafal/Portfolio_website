export const SITE = {
  name: "Safal Gupta",
  shortTitle: "AI Builder · Industrial Digitalization · Manufacturing Tech",
  title:
    "Industrial Digitalization Engineer • AI Builder • Manufacturing Technologist • Future Founder",
  oneLiner:
    "I build AI and automation systems for manufacturing — currently industrial digitalization at JCB India.",
  domain: "safalgupta.tech",
  url: "https://safalgupta.tech",
  email: "safallovetocode@gmail.com",
  mission: "Building intelligent systems that transform manufacturing.",
  heroMissions: [
    "Building intelligent systems that transform manufacturing.",
    "Automating factory workflows with AI and Power Platform.",
    "Turning manufacturing data into real-time decisions.",
    "Engineering products at the edge of industry and innovation.",
    "Shipping software that actually works on the shop floor.",
  ],
  /** Veni, vidi, vici — work motto in multiple languages */
  heroMotto: [
    "Veni, vidi, vici",
    "I came, I saw, I conquered",
    "मैं आया, मैंने देखा, मैंने जीत लिया",
    "Je suis venu, j'ai vu, j'ai vaincu",
    "Vine, vi, vencí",
    "Ich kam, ich sah, ich siegte",
    "来た、見た、勝った",
    "我来，我见，我征服",
    "جئتُ، رأيتُ، انتصرتُ",
    "Vim, vi, venci",
    "왔다, 보았다, 이겼다",
    "Пришёл, увидел, победил",
  ],
  tagline: "AI • Automation • Industrial Digitalization",
  heroTagsPrimary: ["AI", "Industrial Digitalization", "Automation"],
  heroTagsSecondary: ["Web3", "Quant"],
  bio: [
    "I'm Safal Gupta, a Computer Science Engineer who builds AI-powered systems for manufacturing and industrial digitalization.",
    "Currently at JCB India, I design Power Platform solutions, automate workflows, and ship intelligent tools that streamline operations on the factory floor.",
    "I'm also exploring Web3 and quantitative technology — always learning, always building toward technology that scales.",
  ],
  social: {
    github: "https://github.com/alphasafal",
    linkedin: "https://www.linkedin.com/in/safal-gupta/",
    x: "https://x.com/safallovetocode",
  },
  githubUsername: "alphasafal",
} as const;

/** Set NEXT_PUBLIC_CAL_LINK in Vercel for Book a Call button */
export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "";

export const MAIN_NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const EXTENDED_NAV = [
  { id: "impact", label: "Impact" },
  { id: "exploring", label: "Exploring" },
  { id: "vision", label: "Vision" },
  { id: "building", label: "Building" },
  { id: "timeline", label: "Timeline" },
  { id: "terminal", label: "Terminal" },
] as const;
