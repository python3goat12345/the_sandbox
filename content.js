const SANDBOX_DATA = {


    /* =========================================
       WEBSITE
    ========================================== */

    site: {

        title:
            "THE SANDBOX",

        tagline:
            "YOU WERE NEVER SUPPOSED TO FIND THIS PLACE.",

        status:
            "SYSTEM ONLINE"

    },



    /* =========================================
       DONATIONS
    ========================================== */

    donation: {

        enabled:
            true,


        /*
            IMPORTANT:

            Have your parent/guardian create or
            manage the actual payment page.

            Then paste the secure payment link
            between the quotation marks below.
        */

        url:
            ""

    },



    /* =========================================
       EPISODES
    ========================================== */

    episodes: [


        {
            number:
                1,


            title:
                "Episode One",


            description:
                "Emma begins to realize that the world around her isn't what it seems.",


            thumbnail:
                "assets/images/episode1.jpg",


            video:
                "assets/videos/episode1.mp4",


            released:
                true,


            /*
                TRAILER
            */

            trailer:
                "https://youtu.be/jMoj5yLZMhk",


            trailerThumbnail:
                "assets/images/episode1-trailer.jpg",


            trailerReleased:
                true
        },



        {
            number:
                2,


            title:
                "Episode Two",


            description:
                "Emma ventures deeper into the Sandbox and starts discovering things that were supposed to stay hidden.",


            thumbnail:
                "assets/images/episode2.jpg",


            video:
                "assets/videos/episode2.mp4",


            released:
                false,


            trailer:
                "",


            trailerThumbnail:
                "assets/images/episode2-trailer.jpg",


            trailerReleased:
                false
        }

    ],



    /* =========================================
       CHARACTERS
    ========================================== */

    characters: [


        {
            name:
                "Emma",


            image:
                "assets/images/Emma.png",


            description:
                "Emma is trapped inside the Sandbox and refuses to stop searching for the truth.",


            classified:
                false
        },



        {
            name:
                "Leo",


            image:
                "assets/images/Leo.png",


            description:
                "Leo knows far more about the Sandbox than he is willing to explain.",


            classified:
                false
        },



        {
            name:
                "Frame",


            image:
                "assets/images/frame.png",


            description:
                "The intelligence believed to control the Sandbox.",


            classified:
                false
        },



        {
            name:
                "Reflight",


            image:
                "assets/images/reflight.png",


            description:
                "[ INFORMATION RESTRICTED ]",


            classified:
                true
        }

    ]

};
