import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltSquareDown } from '@fortawesome/pro-solid-svg-icons'
function LinkPdf({url,name,text,className}) {
  return (
    <a
      href={`/api/get-pdf?url=${url}&name=${name}`}
      className={`inline-flex text-brand-primary ${className}`}>
        <span className="pr-1"><FontAwesomeIcon icon={faArrowAltSquareDown}/></span>
        { text ? (<span>{text}</span>) : '' }
    </a>
  );
}

export default LinkPdf;