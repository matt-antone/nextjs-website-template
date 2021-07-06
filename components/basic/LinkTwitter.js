import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

function LinkTwitter({url,text}) {
  return (
    <a
    href={url}
    target="new"
    rel="noreferrer noopener"
    className="inline-flex text-brand-primary">
      <span className="pr-1"><FontAwesomeIcon icon={faTwitter}/></span>
      { text ? (<span>{text}</span>) : '' }
    </a>
  )
}

export default LinkTwitter

