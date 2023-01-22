module Client.Diagram

open Feliz
open Shared.Types
open Client.Component

let product: ProductModel =
    {
        id = "1"
        name = "Product 1"
        nodes = 
            {
                id = "1"
                name = "Node 1"
                compo = 
                    Some {
                        id = "1"
                        name = "Component 1"
                    }
                ingre = 
                    [
                        {
                            id = "1"
                            name = "Ingredient 1"
                        }
                        {
                            id = "2"
                            name = "Ingredient 2"
                        }
                    ]
                proc = 
                    {
                        id = "1"
                        name = "Process 1"
                        mh = 1.0
                    }
            }
    }


[<ReactComponent>]
let Diagram() =
    Html.div 
        [
            Components.Diagram("Diagram1", product)
        ]