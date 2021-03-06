import { PopupButton } from "react-calendly"

function CalendyButton({ event }) {
  return (
    <PopupButton
    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white hover:text-brand-primary bg-brand-secondary hover:bg-brand-light md:py-4 md:text-lg md:px-10"
    url={`https://calendly.com/navalign/${event ? event : ''}`} text="Schedule Meeting"/>
  );
}

export default CalendyButton;