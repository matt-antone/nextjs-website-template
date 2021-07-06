const vCardsJS = require('vcards-js');
const imageToBase64 = require('image-to-base64');
const phoneNumberFormatter = require('phone-number-formats');

module.exports = async (req, res) => {

  ////console.log(req.query)
    //create a new vCard
    const vCard = vCardsJS();

    //set basic properties shown before
    vCard.firstName = req.query.firstName ? req.query.firstName : '';
    vCard.middleName = req.query.middleName ? req.query.middleName : '';
    vCard.lastName = req.query.lastName ? req.query.lastName : '';
    vCard.title = req.query.position ? req.query.position : '';
    // vCard.uid = '69531f4a-c34d-4a1e-8922-bd38a9476a53';
    vCard.organization = req.query.company ? req.query.company : '';
    vCard.workPhone = req.query.phone ? new phoneNumberFormatter(req.query.phone).format({type: 'domestic'}) : '';
    vCard.workUrl = req.query.permalink ? req.query.permalink : '';
    vCard.note = '';

    //set other vitals

    //set other phone numbers
    vCard.cellPhone = req.query.mobile ? req.query.mobile : '';

    //set fax/facsimile numbers
    // vCard.workFax = '312-555-1717';

    //set email addresses
    vCard.workEmail = req.query.email ? req.query.email : '';

    //set logo of organization or personal logo (also supports embedding, see above)
    // vCard.logo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');

    vCard.workAddress.label = 'Work';
    const address2 = req.query.address2 ? `${req.query.address2}` : ''
    vCard.workAddress.street = `${req.query.address1}${address2}`;
    vCard.workAddress.city = req.query.city;
    vCard.workAddress.stateProvince = req.query.state;
    vCard.workAddress.postalCode = req.query.zip;
    vCard.workAddress.countryRegion = req.query.country;

    //set social media URLs
    vCard.socialUrls['facebook'] = req.query.facebook ? decodeURIComponent(req.query.facebook) : null;
    vCard.socialUrls['linkedIn'] = req.query.linkedin ? decodeURIComponent(req.query.linkedin) : null;
    vCard.socialUrls['twitter'] = req.query.twitter ? decodeURIComponent(req.query.twitter) : null;

    //you can also embed photos from files instead of attaching via URL
    if(req.query.image){
      ////console.log(decodeURIComponent(req.query.image))
      const photo = await getImage(decodeURIComponent(req.query.image));
      vCard.photo.embedFromString(photo)
    }

    vCard.version = '3.0'; //can also support 2.1 and 4.0, certain versions only support certain fields

    //get as formatted string
    const fileName = `${req.query.firstName}-${req.query.lastName}.vcf`

  res.setHeader('Content-type',`text/vcard;charset=utf-8;name="${fileName}"`)
  res.setHeader("Content-Disposition",`inline; filename="${fileName}"`)
  res.send(vCard.getFormattedString());
}


// exports.handler = async function(event, context) {

//     //create a new vCard
//     const vCard = vCardsJS();

//     //set basic properties shown before
//     vCard.firstName = req.query.firstName ? req.query.firstName : '';
//     vCard.middleName = req.query.middleName ? req.query.middleName : '';
//     vCard.lastName = req.query.lastName ? req.query.lastName : '';
//     vCard.title = req.query.position ? req.query.position : '';
//     vCard.uid = '69531f4a-c34d-4a1e-8922-bd38a9476a53';
//     vCard.organization = req.query.company ? req.query.company : '';

//     vCard.workPhone = req.query.phone ? req.query.phone : '';
//     vCard.workUrl = req.query.permalink ? req.query.permalink : '';
//     vCard.note = '';

//     //set other vitals

//     //set other phone numbers
//     vCard.cellPhone = req.query.mobile ? req.query.mobile : '';

//     //set fax/facsimile numbers
//     // vCard.workFax = '312-555-1717';

//     //set email addresses
//     vCard.workEmail = req.query.email ? req.query.email : '';

//     //set logo of organization or personal logo (also supports embedding, see above)
//     // vCard.logo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');

//     // vCard.workAddress.label = 'Work Address';
//     const address2 = req.query.address2 ? `${req.query.address2}` : ''
//     vCard.workAddress.street = `${req.query.address1}${address2}`;
//     vCard.workAddress.city = req.query.city;
//     vCard.workAddress.stateProvince = req.query.state;
//     vCard.workAddress.postalCode = req.query.zip;
//     vCard.workAddress.countryRegion = req.query.country;

//     //set social media URLs
//     vCard.socialUrls['facebook'] = req.query.facebook ? req.query.facebook : null;
//     vCard.socialUrls['linkedIn'] = req.query.linkedin ? req.query.linkedin : null;
//     vCard.socialUrls['twitter'] = req.query.twitter ? req.query.twitter : null;

//     //you can also embed photos from files instead of attaching via URL
//     if(req.query.image){
//       const photo = await getImage(req.query.image);
//       vCard.photo.embedFromString(photo)
//     }

//     vCard.version = '4.0'; //can also support 2.1 and 4.0, certain versions only support certain fields

//     //get as formatted string
//     const fileName = `${req.query.firstName}-${req.query.lastName}.vcf`
//     return {
//       statusCode: 200,
//       headers: {
//         "Content-Type": `text/vcard;charset=utf-8;name="${fileName}"`,
//         'Content-Disposition': `inline; filename="${fileName}"`,
//       },
//       body: vCard.getFormattedString(),
//       isBase64Encoded: false
//     }
// }


async function getImage(imageURL){
  return await imageToBase64(imageURL) // Image URL
    .then(
        (response) => {
            return response;
        }
    )
    .catch(
        (error) => {
            ////console.log(error);
        }
    )
}