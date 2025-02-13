import Banner from "@/components/banner/banner";
import LatestPosts from "@/components/latestPosts/latestPosts";

export default function Home() {
  return (
    <section className="w-full h-full">
      <Banner />
      <LatestPosts />
    </section>
  );
}
