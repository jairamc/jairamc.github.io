(function () {
  const links = document.querySelectorAll(".email-link");
  links.forEach((link) => {
    let email = atob(link.getAttribute("data-email"));
    let mailto = email.startsWith("mailto:") ? email : "mailto:" + email;
    const subject = "Hello from jairam.dev";
    mailto += (mailto.includes("?") ? "&" : "?") + "subject=" + encodeURIComponent(subject);
    link.href = mailto;
  });
})();
