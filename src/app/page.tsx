import Header from "@/component/Header";
import VideoSection from "@/component/VideoSection";
import ShopSection from "@/component/Shop";
import Footer from "@/component/Footer";
import TypingText from "@/component/TypingText";

export default function Home() {
  return (
    <main>
      <Header />
      <VideoSection src="/dress-shop-ad.mov" />
      <div className="max-w-[654px] mx-auto" style={{ background: '#eaeadb' }}>
        <TypingText
          content={[
            { type: "h2", text: "nu ito • [nwi.toʊ] • (noun)" },
            { type: "p", text: "formed out of" },
            { type: "p", text: "nu ie. New and ito ie. Thread." },
            { type: "divider" },
            { type: "h2", text: "The STATUS QUO" },
            { type: "p", text: "We wear our essentials the most—yet they're the most overlooked. The world offers a false choice: cheap basics or luxury pieces that offer little beyond their label." },
            { type: "p", text: "Nu ITO exists to challenge that." },
            { type: "h2", text: "A NEW STANDARD" },
            { type: "p", text: "We're crafting a capsule wardrobe that grows with intention—one essential at a time. No seasonal cycles. No fleeting trends." },
            { type: "p", text: "Only pieces designed to remain relevant forever." },
            { type: "h2", text: "The NU ITO WAY" },
            { type: "p", text: "Every Nu ITO piece begins with intent —fabric that feels like second skin, fits that honour real bodies, and design stripped of noise. Quiet, deliberate, and made to stay — season after season, wear after wear." },
            { type: "divider" },
          ]}
        />
        <ShopSection />
        <Footer />
      </div>      
    </main>
  );
}
