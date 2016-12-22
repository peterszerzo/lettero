module Content exposing (..)


homePageTitle : String
homePageTitle =
    "Lettero"


homePageSubtitle : String
homePageSubtitle =
    "Playground for the social wordnerd"


homePagePlayButtonText : String
homePagePlayButtonText =
    "Play"


homePageAboutButtonText : String
homePageAboutButtonText =
    "About"


notFoundPageTitle : String
notFoundPageTitle =
    "Not found :/"


notFoundPageBody : String
notFoundPageBody =
    "Uh, boy, looks like we sent you to the wrong place.."


aboutPageContent : String
aboutPageContent =
    """
## About Lettero

Oh, words. So complex and full of surprises. We can hardly make head or tail of them, right? Literally.

Lettero is a tiny game where players compete against each other decyphering words that are displayed in a less conformist fashion. In a circle. Looping around. Scattered all over.

Made by [Peter](http://www.peterszerzo.com), kicked off with the generous coding time-support of [Airtame](https://airtame.com). Enjoy!
"""


aboutPageBackButtonText : String
aboutPageBackButtonText =
    "☜ Back"


aboutPagePlayButtonText : String
aboutPagePlayButtonText =
    "Play ☞"


startPageTutorialPrompt : String
startPageTutorialPrompt =
    "Shall we start with a 15-second tutorial?"


startPageCreateRoomPrompt : String
startPageCreateRoomPrompt =
    "If you’ve got the hang of it, create a room. No login required."


roomCreatorPageTitle : String
roomCreatorPageTitle =
    "Create a room in a jiffy"


roomCreatorPageAddPlayerPrompt : String
roomCreatorPageAddPlayerPrompt =
    "Add player"


roomCreatorPageBody : String
roomCreatorPageBody =
    "“How many jiffies are there in a flash?” (George Carlin)"


roomCreatorPageErrorTitle : String
roomCreatorPageErrorTitle =
    "Well that didn’t go so well.."


roomCreatorPageErrorBody : String
roomCreatorPageErrorBody =
    "Things go wrong from time to time.. anyways, care to try again?"


roomCreatorPageSuccessTitle : String
roomCreatorPageSuccessTitle =
    "Success!"


roomCreatorPageSuccessBody : String
roomCreatorPageSuccessBody =
    "Yes, indeed, ${} is all yours! And now:"


roomCreatorPageSuccessButtonText : String
roomCreatorPageSuccessButtonText =
    "Go to your room!! ☞"


roomCreatorFormValidationError : String
roomCreatorFormValidationError =
    "(your playmates will hop on board quicker if you use lowercase letters only)"


roomManagerPageTitle : String
roomManagerPageTitle =
    "Welcome to ${}"


roomManagerPagePlayLinksIntro : String
roomManagerPagePlayLinksIntro =
    "Your room is ready. Play under these links:"


roomManagerPageInviteLinksIntro : String
roomManagerPageInviteLinksIntro =
    "Or invite your opponent by email:"


tutorialStart : String
tutorialStart =
    "Heyyo, ready? Just click me to get your very first word."


tutorialShow : String
tutorialShow =
    "Holy moly, who writes like that? Anyways, see if you can find the first letter."


tutorialCorrect : String
tutorialCorrect =
    "Well done - shall we create a game room now?"


tutorialIncorrect : String
tutorialIncorrect =
    "Not quite, not quite. Give it one more go?"


gameReadyScreenTitle : String
gameReadyScreenTitle =
    "Ready, fellas?"


gameReadyScreenBody : String
gameReadyScreenBody =
    "Once you feel ready, tap your name. This game can get a little stressful, so feel free to take a deep breath or two before you do so. Letterhunting begins immediately once all players marked ready."


gameRoundWinNotification : String
gameRoundWinNotification =
    "Nice going, ${}!"


gameRoundLoseNotification : String
gameRoundLoseNotification =
    "This one goes to ${}"


gameTieNotification : String
gameTieNotification =
    "It’s a tie, folks"


gameIdleNotification : String
gameIdleNotification =
    "Oupsie, ran out of time there :/"


gameIncorrectGuessNotification : String
gameIncorrectGuessNotification =
    "Not quite what we were looking for :("


defaultErrorMessage : String
defaultErrorMessage =
    "Hi, this is an error"
