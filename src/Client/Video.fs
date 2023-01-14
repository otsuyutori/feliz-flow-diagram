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
                Components.DRNode("2", React.useRef(None))
                Components.DRNode("3", React.useRef(None))
                Components.DRNode("4", React.useRef(None))
                Components.DRNode("5", React.useRef(None))
            ],
            [
            ]
            )
        ]