import Name from "./components/name";
import Socials from "./components/socials";

export default function Page() {
  return (
    <div>
      <Name />
      <p className="new-paragraph mb-4">
        I'm deeply inspired by the dreamers and pirates, who shaped our world
        through their books, music, art, software, mathematics, philosophy --
        the crazy ones who thought they could make a dent in our universe, and
        then did.
      </p>
      <p className="mb-4">
        I'm on a journey to learn how to do life's work and pursue ambitious
        projects -- and I hope that after a lifetime of earnest effort, I too
        can one day leave my mark in the fabric of consciousness.
      </p>
      <p className="new-paragraph mb-4">
        Today, I'm helping lead the perception team at a small startup called{" "}
        <a
          href="https://maticrobots.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Matic
        </a>
        , where we build autonomous robots with cameras. In my three years, I've
        been lucky enough to build multiple core parts of our autonomy and
        software stack, and now spend my time writing machine learning
        algorithms.
      </p>
      <p className="mb-4">
        I've also dedicated the past 2+ years conducting research at U.C.
        Berkeley to{" "}
        <a
          href="https://compo-net.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          survey passive components at a massive scale
        </a>{" "}
        for designing power converter circuit topologies, and crafting a{" "}
        <a
          href="https://spacebar.build"
          target="_blank"
          rel="noopener noreferrer"
        >
          browser-based 3D virtual world called Spacebar
        </a>
        , which fuses art, physics, and cutting-edge web technology to create
        the immersive feeling of working together in person.
      </p>
      <p className="new-paragraph mb-4">
        Recently I taught myself French and spent over two months living in{" "}
        <a
          href="https://en.wikipedia.org/wiki/Tr%C3%A8ves,_Gard"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trèves, France
        </a>{" "}
        with a family of five. These days, I’m exploring{" "}
        <a
          href="https://www.youtube.com/watch?v=zDzlGxO7kTA&list=PLfpd_CBSTJoyq6DrGycT3xyalNhiVpfQg"
          target="_blank"
          rel="noopener noreferrer"
        >
          the world of DJing
        </a>{" "}
        and delving deeper into music theory.
      </p>
      <p className="mb-4">
        In a past life, I studied EE/CS at U.C. Berkeley for 3 years, and spent
        two gap semesters building lots of products with my smartest friends.
      </p>
      <Socials />
    </div>
  );
}
