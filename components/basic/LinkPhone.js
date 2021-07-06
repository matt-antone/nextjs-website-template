
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons'

export default function LinkPhone({phone,text}) {
  return phone ? (
    <a
      href={`tel:${phone}`}
      className="inline-flex text-brand-primary">
        <span className="pr-1"><FontAwesomeIcon icon={faPhone} /></span>
        {
          text ? (
            <span>{text}</span>
          ) : ''
        }

    </a>
  ): '';
}
