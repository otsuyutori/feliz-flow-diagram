module Server.Template.NavBar

open Feliz.ViewEngine

let NavBar(host:string) =
        Html.div
            [
            prop.className "tabs is-toggle"
            prop.children [
                    Html.ul 
                        [
                        prop.style [style.flexGrow 0]
                        prop.children 
                            [
                                Html.li [
                                    prop.children [
                                        Html.a [
                                            prop.href (host + "/")
                                            prop.children [
                                                Html.span [
                                                    prop.className "icon is-small"
                                                    prop.children [
                                                        Html.i [
                                                            prop.className "fas fa-image"
                                                            prop.ariaHidden true
                                                        ]
                                                    ]
                                                ]
                                                Html.span [
                                                    prop.text "Index"
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                                Html.li [
                                    prop.children [
                                        Html.a [
                                            prop.href (host + "/#youtube")
                                            prop.children [
                                                Html.span [
                                                    prop.className "icon is-small"
                                                    prop.children [
                                                        Html.i [
                                                            prop.className "fas fa-film"
                                                            prop.ariaHidden true
                                                        ]
                                                    ]
                                                ]
                                                Html.span [
                                                    prop.text "Videos"
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            
            