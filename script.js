(() => {

  "use strict";

  const STORAGE = {
    credits: "sandbox_credits_v1",
    trailerRewards: "sandbox_trailer_rewards_v1",
    unlockedModels: "sandbox_unlocked_models_v1",
    easterEggs: "sandbox_easter_eggs_v1",
    donationRewards: "sandbox_donation_rewards_v1"
  };

  const $ = (selector) => document.querySelector(selector);

  const state = {
    credits: 0,
    trailerRewards: {},
    unlockedModels: {},
    easterEggs: {},
    donationRewards: {}
  };


  // ==========================================
  // STORAGE
  // ==========================================

  function loadJSON(key, fallback) {

    try {

      const raw = localStorage.getItem(key);

      return raw
        ? JSON.parse(raw)
        : fallback;

    } catch {

      return fallback;

    }

  }


  function saveJSON(key, value) {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  }


  function loadState() {

    const savedCredits =
      localStorage.getItem(
        STORAGE.credits
      );


    if (savedCredits === null) {

      state.credits =
        Number(
          SANDBOX_DATA.site.startingCredits || 0
        );

      localStorage.setItem(
        STORAGE.credits,
        String(state.credits)
      );

    } else {

      state.credits =
        Math.max(
          0,
          Number(savedCredits) || 0
        );

    }


    state.trailerRewards =
      loadJSON(
        STORAGE.trailerRewards,
        {}
      );


    state.unlockedModels =
      loadJSON(
        STORAGE.unlockedModels,
        {}
      );


    state.easterEggs =
      loadJSON(
        STORAGE.easterEggs,
        {}
      );


    state.donationRewards =
      loadJSON(
        STORAGE.donationRewards,
        {}
      );

  }


  // ==========================================
  // CREDITS
  // ==========================================

  function updateCreditDisplay() {

    const balance =
      $("#credit-balance");

    if (balance) {

      balance.textContent =
        state.credits;

    }

  }


  function setCredits(amount) {

    state.credits =
      Math.max(
        0,
        Math.floor(
          Number(amount) || 0
        )
      );


    localStorage.setItem(
      STORAGE.credits,
      String(state.credits)
    );


    updateCreditDisplay();

  }


  function addCredits(
    amount,
    reason = ""
  ) {

    const value =
      Math.max(
        0,
        Math.floor(
          Number(amount) || 0
        )
      );


    if (!value) return;


    setCredits(
      state.credits + value
    );


    showToast(
      `+${value} SC${reason ? " // " + reason : ""}`
    );

  }


  function spendCredits(amount) {

    const value =
      Math.max(
        0,
        Math.floor(
          Number(amount) || 0
        )
      );


    if (
      state.credits < value
    ) {

      showToast(
        `INSUFFICIENT CREDITS // NEED ${value} SC`
      );

      return false;

    }


    setCredits(
      state.credits - value
    );


    showToast(
      `-${value} SC // FILE UNLOCKED`
    );


    return true;

  }


  // ==========================================
  // DONATION CREDIT SYSTEM
  // ==========================================

  function donationCreditsFor(dollars) {

    const amount =
      Math.max(
        0,
        Number(dollars) || 0
      );


    return Math.floor(
      amount * 10
    );

  }


  function awardDonationCredits(
    donationId,
    dollars
  ) {

    if (
      state.donationRewards[
        donationId
      ]
    ) {

      return;

    }


    const reward =
      donationCreditsFor(
        dollars
      );


    if (reward <= 0) return;


    state.donationRewards[
      donationId
    ] = true;


    saveJSON(
      STORAGE.donationRewards,
      state.donationRewards
    );


    addCredits(
      reward,
      "SUPPORTER BONUS"
    );

  }


  // ==========================================
  // TOAST
  // ==========================================

  let toastTimer;


  function showToast(message) {

    const toast =
      $("#toast");


    if (!toast) return;


    toast.textContent =
      message;


    toast.classList.remove(
      "hidden"
    );


    clearTimeout(
      toastTimer
    );


    toastTimer =
      setTimeout(
        () => {

          toast.classList.add(
            "hidden"
          );

        },

        2600
      );

  }


  // ==========================================
  // SITE SETTINGS
  // ==========================================

  function applySiteSettings() {

    $("#site-title").textContent =
      SANDBOX_DATA.site.title;


    $("#site-title").dataset.text =
      SANDBOX_DATA.site.title;


    $("#site-tagline").textContent =
      SANDBOX_DATA.site.tagline;

  }


  // ==========================================
  // IMAGE HANDLING
  // ==========================================

  function safeImage(
    image,
    alt
  ) {

    const img =
      document.createElement(
        "img"
      );


    img.alt = alt;

    img.loading = "lazy";


    if (!image) {

      img.classList.add(
        "missing-image"
      );

      return img;

    }


    img.src = image;


    img.onerror = () => {

      img.classList.add(
        "missing-image"
      );

      img.removeAttribute(
        "src"
      );

      img.alt =
        `${alt} image coming soon`;

    };


    return img;

  }


  // ==========================================
  // EPISODES
  // ==========================================

  function buildEpisodes() {

    const container =
      $("#episode-container");


    if (!container) return;


    container.innerHTML =
      "";


    SANDBOX_DATA.episodes.forEach(
      (episode) => {

        const card =
          document.createElement(
            "article"
          );


        card.className =
          "card media-card";


        const imageWrap =
          document.createElement(
            "div"
          );


        imageWrap.className =
          "image-wrap";


        imageWrap.appendChild(

          safeImage(
            episode.thumbnail,
            episode.title
          )

        );


        if (!episode.released) {

          const locked =
            document.createElement(
              "div"
            );


          locked.className =
            "locked-overlay";


          locked.textContent =
            "COMING SOON";


          imageWrap.appendChild(
            locked
          );

        }


        const body =
          document.createElement(
            "div"
          );


        body.className =
          "card-body";


        const description =
          episode.released

            ? episode.description

            : "Episode information has not been released yet.";


        body.innerHTML = `

          <span class="card-code">
            EP-${String(
              episode.number
            ).padStart(2, "0")}
          </span>

          <h3>
            ${episode.title}
          </h3>

          <p>
            ${description}
          </p>

        `;


        const button =
          document.createElement(
            "button"
          );


        button.className =
          "secondary-button";


        if (
          episode.released &&
          episode.video
        ) {

          button.textContent =
            "WATCH EPISODE";


          button.addEventListener(
            "click",
            () => {

              openMedia(
                episode.title,
                episode.video
              );

            }
          );

        } else {

          button.textContent =
            "COMING SOON";

          button.disabled =
            true;

        }


        body.appendChild(
          button
        );


        card.append(
          imageWrap,
          body
        );


        container.appendChild(
          card
        );

      }
    );

  }


  // ==========================================
  // TRAILERS
  // ==========================================

  function buildTrailers() {

    const container =
      $("#trailer-container");


    if (!container) return;


    container.innerHTML =
      "";


    SANDBOX_DATA.episodes.forEach(
      (episode) => {

        const rewardKey =
          `episode-${episode.number}`;


        const rewardClaimed =
          !!state.trailerRewards[
            rewardKey
          ];


        const reward =
          Number(
            episode.trailerReward || 10
          );


        const card =
          document.createElement(
            "article"
          );


        card.className =
          "card media-card";


        const imageWrap =
          document.createElement(
            "div"
          );


        imageWrap.className =
          "image-wrap";


        // ONLY USE THE TRAILER IMAGE
        imageWrap.appendChild(

          safeImage(
            episode.trailerThumbnail,
            `${episode.title} trailer`
          )

        );


        if (
          !episode.trailerReleased
        ) {

          const locked =
            document.createElement(
              "div"
            );


          locked.className =
            "locked-overlay";


          locked.textContent =
            "TRAILER COMING SOON";


          imageWrap.appendChild(
            locked
          );

        }


        const body =
          document.createElement(
            "div"
          );


        body.className =
          "card-body";


        const rewardText =
          rewardClaimed

            ? "REWARD CLAIMED"

            : `WATCH REWARD +${reward} SC`;


        body.innerHTML = `

          <span class="card-code">
            ${rewardText}
          </span>

          <h3>
            ${episode.title} Trailer
          </h3>

          <p>
            OFFICIAL SANDBOX TRAILER
          </p>

        `;


        const button =
          document.createElement(
            "button"
          );


        button.className =
          "secondary-button";


        if (
          episode.trailerReleased &&
          episode.trailer
        ) {

          button.textContent =
            "WATCH TRAILER";


          button.addEventListener(
            "click",
            () => {

              if (
                !state.trailerRewards[
                  rewardKey
                ]
              ) {

                state.trailerRewards[
                  rewardKey
                ] = true;


                saveJSON(
                  STORAGE.trailerRewards,
                  state.trailerRewards
                );


                addCredits(
                  reward,
                  "TRAILER REWARD"
                );


                buildTrailers();

              }


              openMedia(
                `${episode.title} Trailer`,
                episode.trailer
              );

            }
          );

        } else {

          button.textContent =
            "COMING SOON";

          button.disabled =
            true;

        }


        body.appendChild(
          button
        );


        card.append(
          imageWrap,
          body
        );


        container.appendChild(
          card
        );

      }
    );

  }


  // ==========================================
  // CHARACTERS
  // ==========================================

  function buildCharacters() {

    const container =
      $("#character-container");


    if (!container) return;


    container.innerHTML =
      "";


    SANDBOX_DATA.characters.forEach(
      (character) => {

        const card =
          document.createElement(
            "article"
          );


        card.className =
          `card character-card${
            character.classified
              ? " classified"
              : ""
          }`;


        const imageWrap =
          document.createElement(
            "div"
          );


        imageWrap.className =
          "image-wrap";


        imageWrap.appendChild(

          safeImage(
            character.image,
            character.name
          )

        );


        if (
          character.classified
        ) {

          const ribbon =
            document.createElement(
              "div"
            );


          ribbon.className =
            "classified-ribbon";


          ribbon.textContent =
            "CLASSIFIED";


          imageWrap.appendChild(
            ribbon
          );

        }


        const body =
          document.createElement(
            "div"
          );


        body.className =
          "card-body";


        body.innerHTML = `

          <span class="card-code">

            ${
              character.classified
                ? "ACCESS RESTRICTED"
                : "SUBJECT FILE"
            }

          </span>

          <h3>
            ${character.name}
          </h3>

          <p>
            ${character.description}
          </p>

        `;


        card.append(
          imageWrap,
          body
        );


        container.appendChild(
          card
        );

      }
    );

  }


  // ==========================================
  // FABRICATION
  // ==========================================

  function buildModels() {

    const container =
      $("#model-container");


    if (!container) return;


    container.innerHTML =
      "";


    SANDBOX_DATA.models.forEach(
      (model) => {

        const unlocked =
          !!state.unlockedModels[
            model.id
          ];


        const card =
          document.createElement(
            "article"
          );


        card.className =
          "card model-card";


        const imageWrap =
          document.createElement(
            "div"
          );


        imageWrap.className =
          "image-wrap";


        imageWrap.appendChild(

          safeImage(
            model.image,
            model.name
          )

        );


        if (!model.released) {

          const overlay =
            document.createElement(
              "div"
            );


          overlay.className =
            "locked-overlay";


          overlay.textContent =
            model.id ===
            "reflight-model"

              ? "CLASSIFIED"

              : "COMING SOON";


          imageWrap.appendChild(
            overlay
          );

        }


        const body =
          document.createElement(
            "div"
          );


        body.className =
          "card-body";


        let status;


        if (!model.released) {

          status =
            model.id ===
            "reflight-model"

              ? "CLASSIFIED"

              : "COMING SOON";

        } else if (unlocked) {

          status =
            "UNLOCKED";

        } else {

          status =
            `${model.cost} SC`;

        }


        body.innerHTML = `

          <span class="card-code">
            STATUS: ${status}
          </span>

          <h3>
            ${model.name}
          </h3>

          <p>
            ${model.description}
          </p>

        `;


        const button =
          document.createElement(
            "button"
          );


        button.className =
          "secondary-button";


        if (!model.released) {

          button.textContent =
            model.id ===
            "reflight-model"

              ? "ACCESS DENIED"

              : "COMING SOON";


          button.disabled =
            true;

        }

        else if (unlocked) {

          button.textContent =
            "DOWNLOAD .3MF";


          button.addEventListener(
            "click",
            () => {

              downloadModel(
                model
              );

            }
          );

        }

        else {

          button.textContent =
            `UNLOCK // ${model.cost} SC`;


          button.addEventListener(
            "click",
            () => {

              unlockModel(
                model
              );

            }
          );

        }


        body.appendChild(
          button
        );


        card.append(
          imageWrap,
          body
        );


        container.appendChild(
          card
        );

      }
    );

  }


  function unlockModel(model) {

    if (
      !model.released ||
      !model.file
    ) {

      showToast(
        "MODEL COMING SOON"
      );

      return;

    }


    if (
      !spendCredits(
        model.cost
      )
    ) {

      return;

    }


    state.unlockedModels[
      model.id
    ] = true;


    saveJSON(
      STORAGE.unlockedModels,
      state.unlockedModels
    );


    buildModels();

  }


  function downloadModel(model) {

    if (!model.file) {

      showToast(
        "MODEL COMING SOON"
      );

      return;

    }


    const a =
      document.createElement(
        "a"
      );


    a.href =
      model.file;


    a.download =
      "";


    document.body.appendChild(
      a
    );


    a.click();

    a.remove();

  }


  // ==========================================
  // YOUTUBE
  // ==========================================

  function youtubeEmbedURL(url) {

    try {

      const parsed =
        new URL(url);


      if (
        parsed.hostname.includes(
          "youtu.be"
        )
      ) {

        const id =
          parsed.pathname.replace(
            "/",
            ""
          );


        return id
          ? `https://www.youtube.com/embed/${id}?autoplay=1`
          : null;

      }


      if (
        parsed.hostname.includes(
          "youtube.com"
        )
      ) {

        const id =
          parsed.searchParams.get(
            "v"
          );


        return id
          ? `https://www.youtube.com/embed/${id}?autoplay=1`
          : null;

      }

    } catch {

      return null;

    }


    return null;

  }


  // ==========================================
  // MEDIA PLAYER
  // ==========================================

  function openMedia(
    title,
    url
  ) {

    const modal =
      $("#video-player");

    const titleEl =
      $("#video-title");

    const video =
      $("#main-video");

    const iframe =
      $("#youtube-player");


    titleEl.textContent =
      title;


    const youtube =
      youtubeEmbedURL(url);


    if (youtube) {

      video.pause();

      video.removeAttribute(
        "src"
      );

      video.load();

      video.classList.add(
        "hidden"
      );


      iframe.src =
        youtube;

      iframe.classList.remove(
        "hidden"
      );

    } else {

      iframe.src =
        "";

      iframe.classList.add(
        "hidden"
      );


      video.src =
        url;

      video.classList.remove(
        "hidden"
      );


      video.play().catch(
        () => {}
      );

    }


    modal.classList.remove(
      "hidden"
    );


    document.body.classList.add(
      "modal-open"
    );

  }


  function closeMedia() {

    const modal =
      $("#video-player");

    const video =
      $("#main-video");

    const iframe =
      $("#youtube-player");


    video.pause();

    video.removeAttribute(
      "src"
    );

    video.load();

    iframe.src =
      "";


    modal.classList.add(
      "hidden"
    );


    document.body.classList.remove(
      "modal-open"
    );

  }


  // ==========================================
  // SUPPORT
  // ==========================================

  function setupSupport() {

    const button =
      $("#donate-button");


    if (!button) return;


    button.addEventListener(
      "click",
      () => {

        const donation =
          SANDBOX_DATA.donation;


        if (
          !donation.enabled ||
          !donation.url
        ) {

          showToast(
            "SUPPORT SYSTEM COMING SOON"
          );

          return;

        }


        window.open(
          donation.url,
          "_blank",
          "noopener,noreferrer"
        );

      }
    );

  }


  // ==========================================
  // TERMINAL
  // ==========================================

  function terminalPrint(text) {

    const out =
      $("#terminal-output");


    out.innerHTML +=
      `<div>${text}</div>`;


    out.scrollTop =
      out.scrollHeight;

  }


  function awardEgg(
    id,
    amount,
    label
  ) {

    if (
      state.easterEggs[id]
    ) {

      terminalPrint(
        "REWARD ALREADY CLAIMED."
      );

      return;

    }


    state.easterEggs[id] =
      true;


    saveJSON(
      STORAGE.easterEggs,
      state.easterEggs
    );


    addCredits(
      amount,
      label
    );


    terminalPrint(
      `REWARD AUTHORIZED: +${amount} SC`
    );

  }


  function escapeHTML(text) {

    const div =
      document.createElement(
        "div"
      );


    div.textContent =
      text;


    return div.innerHTML;

  }


  function runCommand(command) {

    const cmd =
      command
        .trim()
        .toLowerCase();


    if (!cmd) return;


    terminalPrint(
      `<span class="terminal-command">&gt; ${escapeHTML(command)}</span>`
    );


    switch (cmd) {

      case "help":

        terminalPrint(
          "COMMANDS: help, subjects, emma, leo, frame, reflight, credits, fabrication, clear"
        );

        break;


      case "subjects":

        terminalPrint(
          "SUBJECT FILES: EMMA // LEO // FRAME // ████████"
        );

        break;


      case "emma":

        terminalPrint(
          "EMMA // STATUS: ACTIVE"
        );

        break;


      case "leo":

        terminalPrint(
          "LEO // STATUS: ACTIVE"
        );

        break;


      case "frame":

        terminalPrint(
          "FRAME // ENTITY STATUS: MONITORING..."
        );

        break;


      case "reflight":

        terminalPrint(
          "ACCESS DENIED."
        );

        terminalPrint(
          "WARNING: UNKNOWN PROCESS RESPONDED."
        );

        break;


      case "credits":

        terminalPrint(
          `CURRENT BALANCE: ${state.credits} SC`
        );

        break;


      case "fabrication":

        terminalPrint(
          "FABRICATION NODE ONLINE."
        );

        break;


      // OLD SECRET
      case "coin":
      case "coins":
      case "free money":

        terminalPrint(
          "...YOU REALLY TRIED THAT?"
        );


        awardEgg(
          "terminal_coin",
          5,
          "TERMINAL EASTER EGG"
        );

        break;


      // BIG SECRET
      case "455":

        terminalPrint(
          "ADMIN CREDIT SEQUENCE DETECTED."
        );

        terminalPrint(
          "AUTHORIZATION CODE ACCEPTED."
        );


        awardEgg(
          "secret_455",
          500,
          "HIDDEN 455 CODE"
        );

        break;


      case "clear":

        $("#terminal-output").innerHTML =
          "SANDBOX ARCHIVE TERMINAL v1.5<br>";

        break;


      default:

        terminalPrint(
          `UNKNOWN COMMAND: ${escapeHTML(command)}`
        );

    }

  }


  function setupTerminal() {

    const input =
      $("#terminal-input");


    if (!input) return;


    input.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key !==
          "Enter"
        ) {

          return;

        }


        const value =
          input.value;


        input.value =
          "";


        runCommand(
          value
        );

      }
    );

  }


  // ==========================================
  // NAV
  // ==========================================

  function setupNavigation() {

    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(
        (link) => {

          link.addEventListener(
            "click",
            (event) => {

              const target =
                document.querySelector(
                  link.getAttribute(
                    "href"
                  )
                );


              if (!target) return;


              event.preventDefault();


              target.scrollIntoView({
                behavior: "smooth"
              });

            }
          );

        }
      );

  }


  // ==========================================
  // BOOT
  // ==========================================

  function bootSequence() {

    const screen =
      $("#boot-screen");

    const text =
      $("#boot-text");


    const lines = [

      "CONNECTING TO SANDBOX...",

      "LOCATING SERVER...",

      "SERVER FOUND.",

      "VERIFYING USER...",

      "CREDIT SYSTEM ONLINE.",

      "FABRICATION NODE ONLINE.",

      "MEDIA ARCHIVE CONNECTED.",

      "UNKNOWN PROCESS DETECTED.",

      "IGNORING WARNING...",

      "CONNECTION ESTABLISHED."

    ];


    let i = 0;


    function next() {

      if (
        i < lines.length
      ) {

        text.textContent +=
          lines[i] + "\n";


        i++;


        setTimeout(
          next,
          110
        );

      } else {

        setTimeout(
          () => {

            screen.classList.add(
              "boot-hidden"
            );


            setTimeout(
              () => {

                screen.style.display =
                  "none";

              },

              600
            );

          },

          350
        );

      }

    }


    next();

  }


  // ==========================================
  // GLITCH
  // ==========================================

  function randomGlitch() {

    const title =
      $("#site-title");


    if (!title) return;


    setInterval(
      () => {

        title.classList.add(
          "glitch-active"
        );


        setTimeout(
          () => {

            title.classList.remove(
              "glitch-active"
            );

          },

          140
        );

      },

      6000
    );

  }


  // ==========================================
  // MODAL
  // ==========================================

  function setupModal() {

    $("#close-video")
      .addEventListener(
        "click",
        closeMedia
      );


    $("#video-player")
      .addEventListener(
        "click",
        (event) => {

          if (
            event.target.id ===
            "video-player"
          ) {

            closeMedia();

          }

        }
      );


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key ===
          "Escape"
        ) {

          closeMedia();

        }

      }
    );

  }


  // ==========================================
  // START
  // ==========================================

  function init() {

    loadState();

    updateCreditDisplay();

    applySiteSettings();

    buildEpisodes();

    buildTrailers();

    buildCharacters();

    buildModels();

    setupSupport();

    setupTerminal();

    setupNavigation();

    setupModal();

    randomGlitch();

    bootSequence();

  }


  document.addEventListener(
    "DOMContentLoaded",
    init
  );

})();
