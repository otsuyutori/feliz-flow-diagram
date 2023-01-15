module Client.Component

open Feliz

type Components =

    /// <summary>
    /// Counter
    /// </summary>
    [<ReactComponent>]
    static member Counter(init:int) =
        let (count, setCount) = React.useState(init)
        Html.div [
            Html.h1 count
            Html.button [
                prop.onClick (fun _ -> setCount(count + 1))
                prop.text "Increment"
            ]
        ]

    /// <summary>
    /// Import External Component
    /// </summary>
    [<ReactComponent(import = "MyReactYouTube", from = "./Components/youtube.jsx")>]
    static member MyReactYouTube(videoId: string) = React.imported ()

    /// <summary>
    /// Import External Component
    /// </summary>
    [<ReactComponent(import = "MUIButton", from = "./Components/button.jsx")>]
    static member MUIButton(label: string, variant : string) = React.imported ()

    /// <summary>
    /// Import External Component
    /// </summary>
    [<ReactComponent(import = "MUITextField", from = "./Components/textfield.jsx")>]
    static member MUITextField(id: string, label: string, text : string, setText: string -> unit) = React.imported ()

    [<ReactComponent(import = "default", from = "./Components/diagram.jsx")>]
    static member Diagram(key: string) = React.imported ()