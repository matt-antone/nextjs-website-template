import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

function LinkInstagram({url,text}) {
  return (
    <a
    href={url}
    target="new"
    rel="noreferrer noopener"
    className="inline-flex text-brand-primary">
      <span className="pr-1"><FontAwesomeIcon icon={faInstagram}/></span>
      { text ? (<span>{text}</span>) : '' }
    </a>
  )
}

export default LinkInstagram

