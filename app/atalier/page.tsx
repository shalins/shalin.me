import React from "react";

export const metadata = {
  title: "l'Atalier",
  description: "Read my writings.",
};
export default function Atalier() {
  const projects = [
    {
      name: "Voice",
      description: "Used by millions of blind people to read everyday things",
      link: "https://apps.apple.com/us/app/voice-ocr-document-reader/id903772588",
    },
  ];

  const retiredProjects = [
    {
      name: "Spacebar",
      description: "Immersive 3D world to collaborate on projects online",
      link: "https://spacebar.build",
    },
    {
      name: "CompoNet",
      description: "Visualize & survey millions of passive components",
      link: "https://compo-net.org",
    },
    {
      name: "Iris",
      description: "Smart campus assistant for college students",
      link: "/atalier/iris",
    },
    {
      name: "Lumos",
      description: "Automated eye-disease screening kit"
    },
    {
      name: "Raspresso",
      description: "Software-driven espresso machine built from scratch"
    },
    {
      name: "Close",
      description: "One of the first real-time COVID dashboards",
    },
    {
      name: "Droptop",
      description: "Full video editing suite for making funny content",
    },
    {
      name: "BlueTune",
      description: "Stream music to a friends phone over bluetooth",
    },
    {
      name: "MiddleSchoolNotes",
      description: "Comprehensive notes for dozens of subjects",
    },
  ];

  return (
    <section>
      <h1 className="font-semibold text-lg mb-8">l'Atalier</h1>
      <p className="mb-4">
        Starting with a website I built when I was 12, I've been lucky to
        indulge my natural curiosity over the past decade+ through the hundreds
        of projects I've worked on, with some incredible people.
      </p>

      <p>
        These days, I'm spending my hours trying to build a lasting company, so I'm
        not able to spend the time I used to tinkering on side projects. When I
        do, I find my curiosity drawn more towards non-software projects like
        learning a new language, playing sports, exploring a new country, or making music.
      </p>
      <p className="new-paragraph mb-4">Ongoing:</p>
      <div>
        {projects.map(({ name, description, link }) => (
          <div key={name} className="w-full flex items-center mb-4">
            <a href={link}>
              <p className="tracking-tight">{name}</p>
            </a>
            <p className="tracking-tight pl-2">// {description}</p>
          </div>
        ))}
      </div>
      <p className="new-paragraph mb-4">Retired:</p>
      <div>
        {retiredProjects.map(({ name, description, link }) => (
          <div key={name} className="w-full flex items-center mb-4">
            {link ? (
              <a href={link}>
                <p className="tracking-tight">{name}</p>
              </a>
            ) : (
              <p className="tracking-tight text-sky-500">{name}</p>
            )}
            <p className="tracking-tight pl-2">// {description}</p>
          </div>
        ))}
      </div>
      <br />
      <p className="mb-4">
        ... And many, many others that now rest in the graveyard.
      </p>
    </section>
  );
}
