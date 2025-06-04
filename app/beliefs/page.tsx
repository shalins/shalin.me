import React from "react";

const beliefs = [
  {
    title: "constraints force you to be creative",
    points: [
      "necessity breeds innovation—many groundbreaking ideas emerge from limitations.",
      "scarcity forces prioritization, removing distractions and bullshit.",
      "the most elegant solutions often arise from tight constraints (e.g., haikus, minimalist design).",
    ],
  },
  {
    title: "both sides of paradoxes can both be true in different contexts",
    points: [
      "the wave-particle duality in physics: light behaves as both a wave and a particle depending on how it's measured.",
      "in leadership, strong conviction is necessary, but so is adaptability—rigidity and flexibility both have their place.",
    ],
  },
  {
    title: "fundamentals are underrated",
    points: [
      "complex strategies fail without a strong foundation (e.g., fancy plays don't work if you can't dribble).",
      "most breakthroughs come from rethinking from first principles, not adding complexity.",
    ],
  },
  {
    title: "wealth is proportional to value created in laissez-faire capitalism",
    points: [
      "do hard things. most people can't, so there's an outsized opportunity to create value.",
      "wealth accumulates when important problems are solved at scale",
      "market inefficiencies reward those who see what others ignore",
      "competence, high risk tolerance, and leverage dictate earnings more than effort alone",
    ],
  },
  {
    title: "move at breakneck speed",
    points: [
      "forces you to interface with reality more often, which increases feedback and surface area for serendipity",
      "practice does not make you perfect, practice + feedback does",
      "a week is 2% of a year",
      "life is short",
    ],
  },
  {
    title: "pursue excellence, not success",
    points: [
      "success is a by-product of excellence",
      "luck can bring success, excellence can bring repeated success",
      "chasing excellence lets you play in an infinite game",
    ],
  },
  {
    title: "true honesty risks being offensive",
    points: [
      "the alternative to honesty is passive dishonesty",
      "churchill was ridiculed for warning about Hitler's rise before WWII, Galileo was condemned by the Church for stating that the Earth orbits the sun, Socrates was executed for 'corrupting the youth'",
      "free speech dies when fear of offense outweighs the pursuit of truth",
    ],
  },
  {
    title: "better to be loved/hated than liked/ignored",
    points: [
      "strong emotions drive action; indifference means irrelevance.",
      "most impactful people polarize—leaders, artists, innovators all have passionate supporters and critics.",
      "trying to please everyone dilutes authenticity, leading to mediocrity.",
    ],
  },
  {
    title: "every line of code acts against you",
    points: [
      "more code means more potential failure points—bugs, maintenance, unintended consequences.",
      "code is a liability, not an asset; the easiest code maintain is the code that doesn't exist.",
    ],
  },
  {
    title: "simpler solutions are harder to build than complex ones",
    points: [
      "simplicity requires deep understanding; complexity often masks confusion.",
    ],
  },
  {
    title: "leverage is more important than resources",
    points: [
      '"give me a lever long enough and a fulcrum on which to place it, and I shall move the world"',
      "lots of resources misapplied can still lead to no leverage",
      "large organizations often waste massive resources due to inefficiency, while small teams with leverage can outcompete them.",
    ],
  },
];

export default function BeliefsPage() {
  return (
    <section>
      <h1 className="font-semibold text-lg mb-8">beliefs</h1>
      <p className="mb-4">My beliefs about the world, the work I do, and how I live my life.</p>
      <ul className="hyphen-list space-y-4">
        {beliefs.map((belief, idx) => (
          <li key={idx}>
            {belief.title}
            <ul className="hyphen-list ml-6 mt-1">
              {belief.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mb-4 mt-8 text-neutral-500">
        inspired by <a href="https://nat.org/" target="_blank" rel="noopener noreferrer" className="underline">nat friedman</a>'s site.
      </p>
    </section>
  );
} 