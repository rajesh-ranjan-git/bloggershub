import Banner from "@/components/banner/banner";
import LatestPosts from "@/components/latestPosts/latestPosts";

export default function Home() {
  return (
    <section className="w-screen h-screen">
      <Banner />
      <LatestPosts />
    </section>
  );
}
