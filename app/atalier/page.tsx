import React from "react";

export const metadata = {
  title: "l'Atalier",
  description: "Read my writings.",
};
export default function Atalier() {
  const projects = [
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
      name: "Raspresso",
      description: "Software-driven espresso machine built from scratch",
      link: "/writings/iris",
    },
    {
      name: "Voice",
      description: "Used by millions of blind people to read everyday things",
      link: "https://apps.apple.com/us/app/voice-ocr-document-reader/id903772588",
    },
  ];

  const retiredProjects = [
    {
      name: "Iris",
      description: "Smart campus assistant for college students",
      link: "/writings/iris",
    },
    {
      name: "Lumos",
      description: "Automated eye-disease screening kit",
      link: "/writings/iris",
    },
    {
      name: "Close",
      description: "One of the first real-time COVID dashboards",
      link: "/writings/iris",
    },
    {
      name: "Droptop",
      description: "Full video editing suite for making funny content",
      link: "/writings/iris",
    },
    {
      name: "BlueTune",
      description: "Stream music to a friends phone over bluetooth",
      link: "/writings/iris",
    },
    {
      name: "MiddleSchoolNotes",
      description: "Comprehensive notes for dozens of subjects",
      link: "/writings/iris",
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
            <a href={link}>
              <p className="tracking-tight">{name}</p>
            </a>
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
