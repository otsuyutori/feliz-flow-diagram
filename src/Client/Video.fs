module Client.Video

open Feliz
open Client.Component

[<ReactComponent>]
let Video (number : int, videoId:string) =
    let (text, setText) = React.useState("")
    Html.div 
        [
            Components.Diagram(
            [
                Components.DRNode("1", React.useRef(None))
            ],
            [
                Components.Connection("1", "1", "2", React.useRef(null))
                Components.Connection("2", "4", "1", React.useRef(null))
            ]
            )
        ]