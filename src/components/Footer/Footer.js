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
                href="https://www.linkedin.com/company/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500" >
                <span className="sr-only">
                  LinkedIn
                </span>
                <LinkedinIcon className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/company"
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
                Company
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                <li>
                  <a
                    href="/about"
                    className="text-base text-gray-500 hover:text-gray-900" >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-base text-gray-500 hover:text-gray-900" >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-base text-gray-500 hover:text-gray-900" >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-base text-gray-500 hover:text-gray-900" >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3
                className="text-sm font-semibold text-gray-400 tracking-wider uppercase" >
                Contact Us
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                <li
                  className="flex items-center justify-center md:justify-start" >
                  <MailIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400" />
                  <span
                    className="ml-3 text-base text-gray-500" >
                    info@company.com
                  </span>
                </li>
                <li
                  className="flex items-center justify-center md:justify-start" >
                  <PhoneIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400" />
                  <span
                    className="ml-3 text-base text-gray-500" >
                    +1 (555) 123-4567
                  </span>
                </li>
                <li
                  className="flex items-center justify-center md:justify-start" >
                  <MapPinIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400" />
                  <span
                    className="ml-3 text-base text-gray-500" >
                    123 Company St <br />
                    Anytown, ST 12345
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3
                className="text-sm font-semibold text-gray-400 tracking-wider uppercase text-center md:text-left" >
                Subscribe to our newsletter
              </h3>
              <p
                className="mt-4 text-base text-gray-500 text-center md:text-left" >
                Get the latest news and updates from us.
              </p>
              <form
                className="mt-4 flex flex-col md:flex-row" >
                <label
                  htmlFor="email-address"
                  className="sr-only" >
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="min-w-0 w-full px-4 py-2 border border-gray-300 shadow-sm rounded-md text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
                  placeholder="Enter your email" />
                <div
                  className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0" >
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            className="mt-8 border-t border-gray-200 pt-8 text-center md:text-left" >
            <p className="text-base text-gray-400">
              &copy; 2023 Company Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }


  