import LinkLinkedIn from "./basic/LinkLinkedIn";
import LinkInstagram from "./basic/LinkInstagram";
import LinkTwitter from "./basic/LinkTwitter"
import LinkFacebook from "./basic/LinkFacebook"

function MainSocialAccounts({social}) {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 space-x-2">
      { social.linkedin ? (
        <LinkLinkedIn url={social.linkedin} text=""/>
      ) : '' }

      { social.instagram ? (
        <LinkInstagram url={social.instagram} text=""/>
      ) : '' }

      { social.twitter ? (
        <LinkTwitter url={social.twitter} text=""/>
      ) : '' }

      { social.facebook ? (
        <LinkFacebook url={social.facebook} text=""/>
    ) : '' }
  </div>

  );
}

export default MainSocialAccounts;