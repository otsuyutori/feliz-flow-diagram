namespace Shared.Types

type Counter = int

type Model =
    {
      counter: Counter option
      videoId: string option
    }
    static member Empty =
        { 
          counter = None
          videoId = None
         }