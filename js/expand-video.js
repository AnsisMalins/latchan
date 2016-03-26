/* This file is dedicated to the public domain; you may do as you wish with it. */
/* Note: This code expects the global variable configRoot to be set. */

if (typeof _ == 'undefined') {
  var _ = function(a) { return a; };
}

function setupVideo(thumb, url) {
    if (thumb.videoAlreadySetUp) return;
    thumb.videoAlreadySetUp = true;

    var video = null;
    var videoContainer;
    var expanded = false;

    function unexpand() {
        if (expanded) {
            expanded = false;
            if (video.pause) video.pause();
            videoContainer.style.display = "none";
            thumb.style.display = "inline";
            video.style.maxWidth = "inherit";
            video.style.maxHeight = "inherit";
        }
    }

    // Create video element if does not exist yet
    function getVideo() {
        if (video == null) {
            video = document.createElement("video");
            video.src = url;
            video.loop = true;//loop;
            video.innerText = _("Your browser does not support HTML5 video.");
            video.addEventListener("click", unexpand, false);
            video.style.cursor = "pointer";

            videoContainer = document.createElement("div");
            videoContainer.style.paddingLeft = "15px";
            videoContainer.style.display = "none";
            videoContainer.appendChild(video);
            thumb.parentNode.insertBefore(videoContainer, thumb.nextSibling);
        }
    }

    // Clicking on thumbnail expands video
    thumb.addEventListener("click", function(e) {
        if (setting("videoexpand") && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
            getVideo();
            expanded = true;

            video.style.position = "static";
            video.style.pointerEvents = "inherit";
            video.style.display = "inline";
            videoContainer.style.display = "block";
            videoContainer.style.position = "static";
            video.parentNode.parentNode.removeAttribute('style');
            thumb.style.display = "none";

            video.muted = true;
            if (video.readyState == 0) {
                video.addEventListener("loadedmetadata", expand2, false);
            } else {
                setTimeout(expand2, 0);
            }
            video.play();
            e.preventDefault();
        }
    }, false);

    function expand2() {
        video.style.maxWidth = "100%";
        video.style.maxHeight = window.innerHeight + "px";
        var bottom = video.getBoundingClientRect().bottom;
        if (bottom > window.innerHeight) {
            window.scrollBy(0, bottom - window.innerHeight);
        }
    }
}

function setupVideosIn(element) {
    var thumbs = element.querySelectorAll("a.file");
    for (var i = 0; i < thumbs.length; i++) {
        if (/\.webm$|\.mp4$/.test(thumbs[i].pathname)) {
            setupVideo(thumbs[i], thumbs[i].href);
        } else {
            var m = thumbs[i].search.match(/\bv=([^&]*)/);
            if (m != null) {
                var url = decodeURIComponent(m[1]);
                if (/\.webm$|\.mp4$/.test(url)) setupVideo(thumbs[i], url);
            }
        }
    }
}

onready(function(){
    // Setup Javascript events for videos in document now
    setupVideosIn(document);

    // Setup Javascript events for videos added by updater
    if (window.MutationObserver) {
        var observer = new MutationObserver(function(mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var additions = mutations[i].addedNodes;
                if (additions == null) continue;
                for (var j = 0; j < additions.length; j++) {
                    var node = additions[j];
                    if (node.nodeType == 1) {
                        setupVideosIn(node);
                    }
                }
            }
        });
        observer.observe(document.body, {childList: true, subtree: true});
    }
});

