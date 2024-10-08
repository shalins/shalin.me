import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Socials() {
  return (
    <ul className="font-xs mt-8 flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
      <li>
        <a
          className="social flex items-center"
          rel="noopener noreferrer"
          target="_blank"
          href="mailto:shalinvs@gmail.com"
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faAt} />
          <p className="ml-2 h-7">shalinvs</p>
        </a>
      </li>
      <li>
        <a
          className="social flex items-center"
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/shalins"
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
          <p className="ml-2 h-7">gh/shalins</p>
        </a>
      </li>
      <li>
        <a
          className="social flex items-center"
          rel="noopener noreferrer"
          target="_blank"
          href="https://linkedin.com/in/shalins"
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faLinkedin} />
          <p className="ml-2 h-7">in/shalins</p>
        </a>
      </li>
    </ul>
  );
}
