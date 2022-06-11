import TwitterLogo from 'assets/images/twitter.png'
import InstagramLogo from 'assets/images/instagram.png'

export default function(profile) {
  let value = profile && profile.description;
  const description = value && value.replace(/\n/g, " <br /> ").replace(/"/g, "").replace(/Instagram:/g, `<img src=${InstagramLogo} width="40" class="ml-1 mr-1" alt="Instagram"/> `).replace(/Twitter:/g, `<img src=${TwitterLogo} width="48" alt="Twitter"/> `);
  
  function formatDescription(text) {
    return (text || "").replace(
      /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
      function (match, space, url) {
        let hyperlink = url;
        if (!hyperlink.match("^https?://")) {
          hyperlink = "http://" + hyperlink;
        }
        let title = profile.room_url_key.includes("JKT48") ? `${profile.room_url_key.slice(6)} JKT48` : hyperlink
        return space + '<a href="' + hyperlink + '" target="_blank">' + title + "</a>";
      }
    );
  }

  return formatDescription(description);
}