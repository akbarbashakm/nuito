export type ContentItem = {
  type: "h2" | "h3" | "p" | "divider";
  text?: string;
};

export type InfoSection = {
  id: string;
  title: string;
  content: string;
  image?: string;
  icon?: string;
  reverse?: boolean;
};

const SHARED_STATUS_QUO = [
    { type: "h2" as const, text: "THE STATUS QUO" },
    {
      type: "p" as const,
      text: "We wear our essentials the most—yet they're the most overlooked. *The world offers a false choice:* cheap basics or luxury pieces that offer little beyond their label."
    },
    { type: "h3" as const, text: "Nu ITO exists to challenge that." }
  ];
  
export const TYPING_CONTENT = {
  story: {
    light: [
      { type: "h2" as const, text: "*nu ito •* [nwi.toʊ] *•* (noun)" },
      { type: "p" as const, text: "formed out of" },
      { type: "h3" as const, text: 'nu ie. *"New"* and *ito* ie. *"Thread."' },
      ...SHARED_STATUS_QUO
    ],
    dark: [...SHARED_STATUS_QUO]
  },

  newStandard: [
    { type: "h2" as const, text: "A NEW STANDARD" },
    {
      type: "p" as const,
      text: "*We're crafting a capsule wardrobe* that grows with intention—one essential at a time. No seasonal cycles. No fleeting trends."
    },
    { type: "h3" as const, text: "Only pieces designed to remain relevant forever." }
  ],

  nuItoWay: {
    light: [
      { type: "h2" as const, text: "THE NU ITO WAY" },
      {
        type: "p" as const,
        text: "*Every Nu ITO piece begins with intent — *fabric that feels like second skin, fits that honour real bodies, and design stripped of noise. Quiet, deliberate, and made to stay"
      },
      { type: "h3" as const, text: "— season after season, wear after wear." }
    ],
    dark: [
      { type: "h2" as const, text: "THE NU ITO WAY" },
      { type: "h2" as const, text: "*nu ito •* [nwi.toʊ] *•* (noun)" },
      { type: "p" as const, text: "formed out of" },
      { type: "h3" as const, text: 'nu ie. *"New"* and *ito* ie. *"Thread."' },
      {
        type: "p" as const,
        text: "*Every Nu ITO piece begins with intent — *fabric that feels like second skin, fits that honour real bodies, and design stripped of noise. Quiet, deliberate, and made to stay"
      },
      { type: "h3" as const, text: "— season after season, wear after wear." }
    ]
  }
};

export const SHOP_CONTENT_HIM = {
  product: {
    title: "Black Crew Tee | Him",
    price: "₹1999"
  },
  infoSections: [
    {
      id: "story-section",
      title: "OUR STORY",
      content: "*The Black Crew Tee had to come first.* Every man owns black tees  The one piece you'll never outgrow or overthink. No effort. No question. *Always essential.*",
      image: "/story-asset.webp",
    },
    {
      id: "fabric-section",
      title: "FABRIC",
      content: "*A precise blend of bamboo, charcoal, Supima cotton, and spandex* creates a fabric that's not only breathable and stretchy but also features exceptional moisture-wicking and antibacterial properties.\n\n*This ensures you stay fresh and comfortable all day*",
      image: "/fabric-asset.webp",
      icon: "/thread_1.svg",
      reverse: true
    },
    {
      id: "fit-section",
      title: "FIT",
      content: "*We're creating a size matrix that acknowledges the diversity of male physiques.* This approach respects that a man's height and width don't necessarily scale proportionally, allowing customers to find their precise size rather than settling for the closest approximation.",
      image: "/fit-asset.webp",
      icon: "/ruler.svg"
    },
    {
      id: "design-section",
      title: "TIMELESS DESIGN",
      content: "*A piece of timeless design that you own, that will be ubiquitous anytime, anywhere on anyone.* This helps you effortlessly chose what you were that blends into any occasion no matter when you were it. But still maintaining the comfort that you are always used to.",
      image: "/design-asset.webp",
      icon: "/clock.svg",
      reverse: true
    },
    {
      id: "style-section",
      title: "STYLING",
      content: "*A piece of timeless design that you own, that will be ubiquitous anytime, anywhere on anyone.* This helps you effortlessly chose what you were that blends into any occasion no matter when you were it. But still maintaining the comfort that you are always used to.",
    }
  ],
  stylingImages: [
    "/styling-asset.webp",
    "/styling-asset-2.webp",
    "/styling-asset-3.webp",
    "/styling-asset-4.webp",
    "/styling-asset-5.webp",
    "/styling-asset.webp",
    "/styling-asset-2.webp",
    "/styling-asset-3.webp",
    "/styling-asset-4.webp",
    "/styling-asset-5.webp",
  ]
};

export const SHOP_CONTENT_HER = {
  product: {
    title: "Black Crew Tee | Her",
    price: "₹1999"
  },
  infoSections: [
    {
      id: "story-section",
      title: "OUR STORY",
      content: "*The Black Crew Tee had to come first.* Every man owns black tees  The one piece you'll never outgrow or overthink. No effort. No question. *Always essential.*",
      image: "/story-asset.webp",
    },
    {
      id: "fabric-section",
      title: "FABRIC",
      content: "*A precise blend of bamboo, charcoal, Supima cotton, and spandex* creates a fabric that's not only breathable and stretchy but also features exceptional moisture-wicking and antibacterial properties.\n\n*This ensures you stay fresh and comfortable all day*",
      image: "/fabric-asset.webp",
      icon: "/thread_1.svg",
      reverse: true
    },
    {
      id: "fit-section",
      title: "FIT",
      content: "*We're creating a size matrix that acknowledges the diversity of male physiques.* This approach respects that a man's height and width don't necessarily scale proportionally, allowing customers to find their precise size rather than settling for the closest approximation.",
      image: "/fit-asset.webp",
      icon: "/ruler.svg"
    },
    {
      id: "design-section",
      title: "TIMELESS DESIGN",
      content: "*A piece of timeless design that you own, that will be ubiquitous anytime, anywhere on anyone.* This helps you effortlessly chose what you were that blends into any occasion no matter when you were it. But still maintaining the comfort that you are always used to.",
      image: "/design-asset.webp",
      icon: "/clock.svg",
      reverse: true
    },
    {
      id: "style-section",
      title: "STYLING",
      content: "*A piece of timeless design that you own, that will be ubiquitous anytime, anywhere on anyone.* This helps you effortlessly chose what you were that blends into any occasion no matter when you were it. But still maintaining the comfort that you are always used to.",
    }
  ],
  stylingImages: [
    "/styling-asset.webp",
    "/styling-asset-2.webp",
    "/styling-asset-3.webp",
    "/styling-asset-4.webp",
    "/styling-asset-5.webp",
    "/styling-asset.webp",
    "/styling-asset-2.webp",
    "/styling-asset-3.webp",
    "/styling-asset-4.webp",
    "/styling-asset-5.webp",
  ]
}
export const THANK_YOU_CONTENT = {
  title: "Thank You",
  message: "We'll get back to you soon!",
  description: "Your interest means a lot to us. We'll contact you shortly with more information about our products.",
  buttonText: "Back to Home"
};
