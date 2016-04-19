(function() {
  function injectGoodies() {
    var repoElements = document.querySelectorAll(".notifications-list .js-notifications-browser"),
      repoElementsLength = repoElements.length;

    for (var i = 0; i < repoElementsLength; i++) {
      var repo = repoElements[i],
        markAllAsRead = repo.querySelector(".mark-all-as-read");

      if (markAllAsRead) {
        var muteUnreadLink = document.createElement("a");
        muteUnreadLink.title = "Mute all unread notifications for this repo";
        muteUnreadLink.setAttribute("aria-label", "Mute all unread notifications for this repo");
        muteUnreadLink.href = "#mute-unread";
        muteUnreadLink.class = "btn btn-sm btn-link";
        muteUnreadLink.style = "color:#767676; margin-right:10px;";
        var linkText = document.createTextNode("Mute Unread");
        muteUnreadLink.appendChild(linkText);

        // drop the mute all unread button in before the mark all as read
        markAllAsRead.parentNode.insertBefore(muteUnreadLink, markAllAsRead);

        muteUnreadLink.addEventListener("click", function(event) {
          event.preventDefault();

          var clickedRepo = event.target.closest(".js-notifications-browser"),
            muteElements = clickedRepo.querySelectorAll("li.unread li.mute button.mute-note"),
            muteElementsLength = muteElements.length;

          for(var i = 0; i < muteElementsLength; i++) {
            muteElements[i].click();
          }
        });
      }
    }
  }

  document.addEventListener('pjax:end', function() {
    injectGoodies();
  });

  injectGoodies();
})();
