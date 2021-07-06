import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

function LinkLinkedIn({url,text}) {
  return (
    <a
    href={url}
    target="new"
    rel="noreferrer noopener"
    className="inline-flex text-brand-primary">
      <span className="pr-1"><FontAwesomeIcon icon={faLinkedin}/></span>
      { text ? (<span>{text}</span>) : '' }
  </a>
  );
}

export default LinkLinkedIn;