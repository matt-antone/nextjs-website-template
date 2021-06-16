import React from 'react';

function LetsTalk(props) {
  return (
    <ul className={`lets-talk ${props.className}`}>
      <li className="list-none text-center md:col-span-2 lg:col-span-1">
        <span className="text-brand-blue font-bold text-xl">Lets's Talk</span>
      </li>
      <li className="list-none ">
        <a
          className="flex justify-center items-center w-full bg-brand-secondary text-base text-white p-2 rounded hover:bg-brand-blue-light hover:text-brand-blue whitespace-nowrap"
          href="tel:855.360.1080"
        >855.360.1080</a>
      </li>

      <li className="list-none ">

        <a
          className="flex justify-center items-center w-full bg-brand-secondary text-base text-white p-2 rounded hover:bg-brand-blue-light hover:text-brand-blue whitespace-nowrap"
          href="mailto:info@navalign.com"
        >Email Us</a>
      </li>

      <li className="list-none ">
        <button
          data-toggle="modal"
          data-target="#setup-meeting-form"
          className="flex justify-center items-center w-full bg-brand-secondary text-base text-white p-2 rounded hover:bg-brand-blue-light hover:text-brand-blue whitespace-nowrap"
          >Setup a Meeting</button>
      </li>
      <li className="list-none ">
        <a
          className="flex justify-center items-center w-full whitespace-nowrap bg-brand-secondary text-base text-white p-2 rounded hover:bg-brand-blue-light hover:text-brand-blue"
          href="https://www.uberconference.com/navalign"
          rel="noopener noreferrer" target="_blank"
        >Join a Meeting</a>
      </li>
    </ul>
  );
}

export default LetsTalk;