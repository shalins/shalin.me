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
        I'm on a journey to do my life's work and pursue ambitious
        projects -- and I hope that after a lifetime of earnest effort, I too
        can one day leave my mark in the fabric of consciousness.
      </p>
      <p className="new-paragraph mb-4">
        Today, I'm building a company to completely reimagine healthcare. 
      </p>
      <p>
        Before that, I
        was early at <a
            href="https://maticrobots.com"
            target="_blank"
            rel="noopener noreferrer"
          >
          Matic Robots
        </a>, where I led the autonomy team, and built many core parts of the company.
        I also pursued two projects on the side: research at{" "}
        <a
          href="https://pilawa-group.berkeley.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          U.C. Berkeley
        </a> to survey passive electrical components at a massive scale, called{" "}
        <a
          href="/atalier/componet"
          target="_blank"
          rel="noopener noreferrer"
        >
          CompoNet
        </a>, and a browser-based 3D virtual world called{" "}
        <a
          href="/atalier/spacebar"
          target="_blank"
          rel="noopener noreferrer"
        >
          Spacebar
        </a>.
      </p>
      <p className="new-paragraph mb-4">
        In a past life, I taught myself French and spent three months living in Trèves, France with a family of five. I drove 6000 miles across the U.S., where I read all 66 books of the Bible on audio and met people from all walks of life.
      </p>
      <p className="mb-4">
        I studied EE/CS at U.C. Berkeley for 3 years, and dropped out twice to build lots of 
        products with my smartest friends, before ultimately completing my degree.
      </p>
      <Socials />
    </div>
  );
}
