import Header from "@/component/header";
import VideoSection from "@/component/VideoSection";
import ContentSection from "@/component/ContentSection";
import NuItoSection from "@/component/NuItoSection";
import TypingText from "@/component/Typingtext";
import ShopSection from "@/component/Shop";
import Footer from "@/component/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <VideoSection />
      <div className="space-y-10 p-6 max-w-2xl mx-auto lg:max-w-[654px]" style={{ background: '#eaeadb' }}>
        <TypingText
          text="nu ito • [nwi.toʊ] • (noun)"
          className="text-xl text-black text-center"
        />

        <TypingText
          text="formed out of nu ie. “New” and ito ie. “Thread“."
          className="text-xl text-black text-center"
        />
        <hr className="border-t border-[#868686] my-4" />
        <TypingText
          text="The STATUS QUO"
          className="text-xl font-semibold text-black text-center"
        />

        <TypingText
          text="We wear our essentials the most—yet they’re the most overlooked. The world offers a false choice: cheap basics or luxury pieces that offer little beyond their label."
          className="text-xl text-black text-center"
        />

        <TypingText
          text="Nu ITO exists to challenge that."
          className="text-xl text-black text-center"
        />

        <TypingText
          text="A NEW STANDARD"
          className="text-xl text-black text-center"
        />

        <TypingText
          text="We\'re crafting a capsule wardrobe that grows with intention—one essential at a time. No seasonal cycles. No fleeting trends."
          className="text-xl text-black text-center"
        />
      <ShopSection />
      <Footer />
      </div>
    </main>
  );
}
