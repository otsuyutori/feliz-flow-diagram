module Client.Video

open Feliz
open Client.Component

[<ReactComponent>]
let Video (number : int, videoId:string) =
    let (text, setText) = React.useState("")
    Html.div 
        [
            Components.Diagram("aaa")
        ]