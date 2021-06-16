import site from '@data/constants'

function NavalignMap(props) {
  return (
    // {{ $address := printf "%s %s %s %s %v" .address1 .address2 .city .state .zipCode }}
    <div className="goolge-map">
        <iframe 
        // className="lazy"
        width="600" 
        height="450" 
        // frameBorder="0"
        // style="border:0"
        src={`https://www.google.com/maps/embed/v1/place?key=${site.GOOGLE_KEY}&q=Navalign`}
        ></iframe>
    </div>
  );
}

export default NavalignMap;