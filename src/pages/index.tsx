import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div>Home</div>
      <Link href="/tide-graph">
        <a>Tide Graph</a>
      </Link>
    </>
  );
};

export default Home;
