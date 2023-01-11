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
                Components.DRNode("1", React.useRef(null))
                Components.DRNode("2", React.useRef(null))
                Components.DRNode("3", React.useRef(null))
                Components.DRNode("4", React.useRef(null))
                Components.DRNode("5", React.useRef(null))
                Components.DRNode("6", React.useRef(null))
            ],
            [
                Components.Connection("1", "1", "2", React.useRef(null))
                Components.Connection("2", "4", "1", React.useRef(null))
            ]
            )
        ]