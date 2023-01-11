module Client.Router

open Feliz
open Feliz.Router
open Client.Video
open Shared.Types

[<ReactComponent>]
let Router(model : Model) =
    let (currentUrl, updateUrl) = React.useState(Router.currentUrl())
    React.router [
        router.onUrlChanged updateUrl
        router.children [
            match currentUrl with
            | [ ] -> Html.h1 "Index"
            | ["youtube"] -> Video(model.counter.Value ,model.videoId.Value)
            | otherwise -> Html.h1 "Not found"
        ]
    ]