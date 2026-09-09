const SANDBOX_DATA = {
  site: {
    title: "THE SANDBOX",
    tagline: "YOU WERE NEVER SUPPOSED TO FIND THIS PLACE.",
    status: "SYSTEM ONLINE",
    startingCredits: 20
  },

  donation: {
    enabled: true,
    url: ""
  },

  episodes: [
    {
      number: 1,
      title: "Episode One",
      description:
        "Emma begins to realize that the world around her isn't what it seems.",
      thumbnail: "assets/images/episode1.jpg",
      video: "assets/videos/episode1.mp4",
      released: true,

      trailer: "https://youtu.be/jMoj5yLZMhk",
      trailerThumbnail: "assets/images/episode1-trailer.jpg",
      trailerReleased: true,
      trailerReward: 10
    },

    {
      number: 2,
      title: "Episode Two",
      description:
        "Emma ventures deeper into the Sandbox and starts discovering things that were supposed to stay hidden.",
      thumbnail: "assets/images/episode2.jpg",
      video: "assets/videos/episode2.mp4",
      released: false,

      trailer: "",
      trailerThumbnail: "assets/images/episode2-trailer.jpg",
      trailerReleased: false,
      trailerReward: 10
    }
  ],

  characters: [
    {
      name: "Emma",
      image: "assets/images/Emma.png",
      description:
        "Emma is trapped inside the Sandbox and refuses to stop searching for the truth.",
      classified: false
    },
    {
      name: "Leo",
      image: "assets/images/Leo.png",
      description:
        "Leo knows far more about the Sandbox than he is willing to explain.",
      classified: false
    },
    {
      name: "Frame",
      image: "assets/images/frame.png",
      description:
        "The intelligence believed to control the Sandbox.",
      classified: false
    },
    {
      name: "Reflight",
      image: "assets/images/reflight.png",
      description: "[ INFORMATION RESTRICTED ]",
      classified: true
    }
  ],

  models: [
    {
      id: "sandbox-logo",
      name: "Sandbox Logo Plaque",
      description: "A printable reconstruction of the Sandbox insignia.",
      image: "assets/images/sandbox-logo-model.jpg",
      file: "",
      cost: 15,
      released: false
    },

    {
      id: "emma-model",
      name: "Emma Figure",
      description: "Subject reconstruction file // EMMA.",
      image: "assets/images/emma-model.jpg",
      file: "",
      cost: 30,
      released: false
    },

    {
      id: "leo-model",
      name: "Leo Figure",
      description: "Subject reconstruction file // LEO.",
      image: "assets/images/leo-model.jpg",
      file: "",
      cost: 30,
      released: false
    },

    {
      id: "frame-model",
      name: "Frame Figure",
      description: "Entity reconstruction file // FRAME.",
      image: "assets/images/frame-model.jpg",
      file: "assets/models/frame.3mf",
      cost: 50,
      released: true
    },

    {
      id: "reflight-model",
      name: "████████",
      description: "[ FABRICATION FILE CLASSIFIED ]",
      image: "assets/images/reflight-model.jpg",
      file: "",
      cost: 0,
      released: false
    }
  ]
};
