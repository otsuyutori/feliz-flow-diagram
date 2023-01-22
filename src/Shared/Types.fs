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

type ProcessModel =
  {
    id:string
    name:string
    mh: float
  }

type IngredientModel = 
  {
    id:string
    name:string
  }

type ComponentModel =
  {
    id:string
    name:string
  }

type NodeModel =
  {
    id:string
    name: string
    compo:ComponentModel option
    ingre:IngredientModel list
    proc:ProcessModel
  }

type ProductModel = 
  {
    id:string
    name: string
    nodes:NodeModel
  }
  