import { Posts } from "app/components/posts";

export const metadata = {
  title: "Writings",
  description: "Read my writings.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-lg mb-8">Writings</h1>
      <Posts />
    </section>
  );
}
