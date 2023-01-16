module Client.Router

open Feliz
open Feliz.Router
open Client.Diagram
open Shared.Types

[<ReactComponent>]
let Router(model : Model) =
    let (currentUrl, updateUrl) = React.useState(Router.currentUrl())
    React.router [
        router.onUrlChanged updateUrl
        router.children [
            match currentUrl with
            | [ ] -> Html.h1 "Index"
            | ["diagram"] -> Diagram()
            | otherwise -> Html.h1 "Not found"
        ]
    ]