import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div>Home</div>
      <div>
        <Link href="/tackle/register">
          <a>Tackle Registration</a>
        </Link>
      </div>
      <div>
        <Link href="/tide-graph">
          <a>Tide Graph</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
