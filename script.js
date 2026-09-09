console.log(
    "THE SANDBOX SYSTEM STARTING..."
);



/* =========================================
   ELEMENTS
========================================= */

const episodeContainer =
    document.getElementById(
        "episode-container"
    );


const trailerContainer =
    document.getElementById(
        "trailer-container"
    );


const characterContainer =
    document.getElementById(
        "character-container"
    );


const bootScreen =
    document.getElementById(
        "boot-screen"
    );


const bootText =
    document.getElementById(
        "boot-text"
    );


const tagline =
    document.getElementById(
        "tagline"
    );


const videoPlayer =
    document.getElementById(
        "video-player"
    );


const mainVideo =
    document.getElementById(
        "main-video"
    );


const videoTitle =
    document.getElementById(
        "video-title"
    );



/* =========================================
   WEBSITE SETTINGS
========================================= */

if (
    typeof SANDBOX_DATA !== "undefined" &&
    SANDBOX_DATA.site
) {

    document.title =
        SANDBOX_DATA.site.title;


    if (tagline) {

        tagline.textContent =
            SANDBOX_DATA.site.tagline;

    }

}



/* =========================================
   BUILD EPISODES
========================================= */

function buildEpisodes() {


    if (!episodeContainer) {
        return;
    }


    episodeContainer.innerHTML =
        "";


    SANDBOX_DATA.episodes.forEach(

        episode => {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card episode-card";


            if (!episode.released) {

                card.classList.add(
                    "locked"
                );

            }


            const number =
                String(
                    episode.number
                ).padStart(
                    2,
                    "0"
                );


            card.innerHTML = `


                <div class="image-container">


                    <img

                        src="${episode.thumbnail}"

                        alt="${episode.title}"

                        onerror="
                            this.style.display='none'
                        "

                    >


                    ${
                        !episode.released

                        ?

                        `

                        <div class="lock-screen">

                            FILE LOCKED

                        </div>

                        `

                        :

                        ""
                    }


                </div>



                <div class="card-content">


                    <div class="card-number">

                        FILE // EP-${number}

                    </div>


                    <h3>

                        ${episode.title}

                    </h3>


                    <p>

                        ${
                            episode.released

                            ?

                            episode.description

                            :

                            "[ DATA CLASSIFIED ]"
                        }

                    </p>


                    ${
                        episode.released

                        ?

                        `

                        <button

                            class="watch-button"

                            onclick="
                                watchEpisode(
                                    ${episode.number}
                                )
                            "

                        >

                            WATCH EPISODE

                        </button>

                        `

                        :

                        ""
                    }


                </div>

            `;


            episodeContainer.appendChild(
                card
            );

        }

    );

}



/* =========================================
   BUILD TRAILERS
========================================= */

function buildTrailers() {


    if (!trailerContainer) {
        return;
    }


    trailerContainer.innerHTML =
        "";


    SANDBOX_DATA.episodes.forEach(

        episode => {


            const released =

                episode.trailerReleased
                === true;


            const card =

                document.createElement(
                    "div"
                );


            card.className =
                "card trailer-card";


            if (!released) {

                card.classList.add(
                    "locked"
                );

            }


            const thumbnail =

                episode.trailerThumbnail

                ||

                episode.thumbnail;


            const number =

                String(
                    episode.number
                ).padStart(
                    2,
                    "0"
                );


            card.innerHTML = `


                <div class="image-container">


                    <img

                        src="${thumbnail}"

                        alt="${episode.title} Trailer"

                        onerror="
                            this.style.display='none'
                        "

                    >


                    ${
                        !released

                        ?

                        `

                        <div class="lock-screen">

                            TRAILER LOCKED

                        </div>

                        `

                        :

                        ""
                    }


                </div>



                <div class="card-content">


                    <div class="card-number">

                        TRAILER FILE //
                        EP-${number}

                    </div>


                    <h3>

                        ${episode.title}
                        Trailer

                    </h3>


                    <p>

                        ${
                            released

                            ?

                            "Recovered promotional footage."

                            :

                            "[ FILE NOT YET AVAILABLE ]"
                        }

                    </p>


                    ${
                        released

                        ?

                        `

                        <button

                            class="watch-button"

                            onclick="
                                watchTrailer(
                                    ${episode.number}
                                )
                            "

                        >

                            WATCH TRAILER

                        </button>

                        `

                        :

                        ""
                    }


                </div>

            `;


            trailerContainer.appendChild(
                card
            );

        }

    );

}



/* =========================================
   BUILD CHARACTERS
========================================= */

function buildCharacters() {


    if (!characterContainer) {
        return;
    }


    characterContainer.innerHTML =
        "";


    SANDBOX_DATA.characters.forEach(

        character => {


            const card =

                document.createElement(
                    "div"
                );


            card.className =
                "card character-card";


            if (
                character.classified
            ) {

                card.classList.add(
                    "classified"
                );

            }


            card.innerHTML = `


                <div class="image-container">


                    <img

                        src="${character.image}"

                        alt="${character.name}"

                        onerror="
                            this.style.display='none'
                        "

                    >


                </div>



                <div class="card-content">


                    <div class="card-number">

                        SUBJECT FILE

                    </div>


                    <h3>

                        ${character.name}

                    </h3>


                    <p>

                        ${character.description}

                    </p>


                </div>

            `;


            characterContainer.appendChild(
                card
            );

        }

    );

}



/* =========================================
   WATCH EPISODE
========================================= */

function watchEpisode(
    number
) {


    const episode =

        SANDBOX_DATA.episodes.find(

            item =>
                item.number === number

        );


    if (!episode) {

        return;

    }


    if (!episode.released) {

        alert(
            "ACCESS DENIED: FILE LOCKED"
        );

        return;

    }


    if (!episode.video) {

        alert(
            "EPISODE VIDEO HAS NOT BEEN UPLOADED YET."
        );

        return;

    }


    openVideoPlayer(

        episode.video,

        `EPISODE ${episode.number} // ${episode.title}`

    );

}



/* =========================================
   WATCH TRAILER
========================================= */

function watchTrailer(
    number
) {


    const episode =

        SANDBOX_DATA.episodes.find(

            item =>
                item.number === number

        );


    if (!episode) {

        return;

    }


    if (
        episode.trailerReleased
        !== true
    ) {

        alert(
            "ACCESS DENIED: TRAILER LOCKED"
        );

        return;

    }


    if (!episode.trailer) {

        alert(
            "TRAILER LINK HAS NOT BEEN ADDED YET."
        );

        return;

    }


    /*
        TRAILERS OPEN YOUTUBE
    */

    window.open(

        episode.trailer,

        "_blank",

        "noopener,noreferrer"

    );

}



/* =========================================
   BUILT-IN EPISODE PLAYER
========================================= */

function openVideoPlayer(
    source,
    title
) {


    if (!source) {

        return;

    }


    videoTitle.textContent =
        title;


    mainVideo.src =
        source;


    videoPlayer.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";


    mainVideo.play().catch(

        error => {

            console.log(
                "Video waiting for play:",
                error
            );

        }

    );

}



/* =========================================
   CLOSE VIDEO
========================================= */

function closeVideoPlayer() {


    mainVideo.pause();


    mainVideo.removeAttribute(
        "src"
    );


    mainVideo.load();


    videoPlayer.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";

}



/* =========================================
   DONATION BUTTON
========================================= */

function openDonationPage() {


    if (
        !SANDBOX_DATA.donation
    ) {

        alert(
            "SUPPORT SYSTEM OFFLINE."
        );

        return;

    }


    if (
        SANDBOX_DATA.donation.enabled
        !== true
    ) {

        alert(
            "SUPPORT SYSTEM CURRENTLY OFFLINE."
        );

        return;

    }


    const donationURL =

        SANDBOX_DATA.donation.url;


    /*
        Until you and your parent add
        the payment link, this message
        appears instead.
    */

    if (!donationURL) {

        alert(
            "DONATION SYSTEM COMING SOON."
        );

        return;

    }


    window.open(

        donationURL,

        "_blank",

        "noopener,noreferrer"

    );

}



/* =========================================
   NAVIGATION
========================================= */

function scrollToSection(
    id
) {


    const section =

        document.getElementById(
            id
        );


    if (!section) {

        return;

    }


    section.scrollIntoView({

        behavior:
            "smooth"

    });

}



/* =========================================
   GLITCH
========================================= */

function randomGlitch() {


    const title =

        document.querySelector(
            ".glitch"
        );


    if (!title) {

        return;

    }


    title.classList.add(
        "glitch-active"
    );


    setTimeout(

        () => {

            title.classList.remove(
                "glitch-active"
            );

        },

        150

    );

}



setInterval(

    () => {


        if (
            Math.random() >
            0.55
        ) {

            randomGlitch();

        }


    },

    3000

);



/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(

    "keydown",

    event => {


        if (
            event.key === "Escape"
        ) {

            closeVideoPlayer();

        }


    }

);



/* =========================================
   BOOT SEQUENCE
========================================= */

const bootMessages = [


    "CONNECTING TO SANDBOX...",


    "LOCATING SERVER...",


    "SERVER FOUND.",


    "VERIFYING USER...",


    "READING ARCHIVE...",


    "CORRUPTED FILES DETECTED.",


    "UNKNOWN PROCESS DETECTED.",


    "IGNORING WARNING...",


    "CONNECTION ESTABLISHED."

];


let bootIndex =
    0;



function nextBootMessage() {


    if (
        bootIndex <
        bootMessages.length
    ) {


        bootText.textContent =

            bootMessages[
                bootIndex
            ];


        bootIndex++;


        setTimeout(

            nextBootMessage,

            380

        );


    }

    else {


        bootScreen.style.opacity =
            "0";


        setTimeout(

            () => {

                bootScreen.style.display =
                    "none";

            },

            1000

        );


    }

}



/* =========================================
   START WEBSITE
========================================= */

buildEpisodes();


buildTrailers();


buildCharacters();


setTimeout(

    nextBootMessage,

    500

);
