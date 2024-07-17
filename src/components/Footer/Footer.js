import {
    LinkedinIcon,
    GithubIcon,
    MailIcon,
    PhoneIcon,
    MapPinIcon,
  } from "lucide-react";
  import React from "react";
  export default function Footer() {
    return (
      <footer
        className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8" >
        <div className="mx-auto max-w-7xl">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8" >
            <div
              className="flex justify-center md:justify-start space-x-6" >
              <a
                href="https://www.linkedin.com/in/finn-bergquist/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500" >
                <span className="sr-only">
                  LinkedIn
                </span>
                <LinkedinIcon className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/finnbergquist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500" >
                <span className="sr-only">
                  GitHub
                </span>
                <GithubIcon className="h-6 w-6" />
              </a>
            </div>
            
            <div className="text-center md:text-left">
              <h3
                className="text-sm font-semibold text-gray-400 tracking-wider uppercase" >
                Contact 
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                <li
                  className="flex items-center justify-center md:justify-start" >
                  <MailIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400" />
                  <span
                    className="ml-3 text-base text-gray-500" >
                    easy.ai.editor@gmail.com
                  </span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </footer>
    );
  }


  