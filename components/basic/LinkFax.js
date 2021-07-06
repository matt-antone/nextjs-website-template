
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFax } from '@fortawesome/free-solid-svg-icons'

export default function LinkFax({fax,text}) {
  return fax ? (
    <a
      href={`fax:${fax}`}
      className="inline-flex text-brand-primary">
        <span className="pr-1"><FontAwesomeIcon icon={faFax} /></span>
        { text ? (<span>{text}</span>) : '' }
    </a>
  ): '';
}