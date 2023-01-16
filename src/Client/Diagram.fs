module Client.Diagram

open Feliz
open Client.Component

[<ReactComponent>]
let Diagram() =
    Html.div 
        [
            Components.Diagram("Diagram1")
        ]