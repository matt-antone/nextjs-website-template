import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


export default function LinkEmail({email,text}) {
  return email ? (
    <a
      href={`mailto:${email}`}
      className="inline-flex text-brand-primary">
        <span className="pr-1"><FontAwesomeIcon icon={faEnvelope} /></span>
        { text ? (<span>{text}</span>) : '' }
    </a>
  ): '';
}