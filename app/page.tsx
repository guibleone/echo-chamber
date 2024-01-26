import Navbar from "./components/Navbar";
import Posts from "./components/Posts/Posts";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const query = searchParams.query?.toString() || "";

  return (
    <main>
      <Navbar query={query} />
      <Posts />
    </main>
  );
}
