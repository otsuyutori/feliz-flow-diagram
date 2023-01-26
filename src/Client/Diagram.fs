module Client.Diagram

open Feliz
open Shared.Types
open Client.Component

let ingre1: ProductModel =
    {
        id = "Product1";
        name = "Product";
        node = {
            node_id="ingre1";
            label="ingre1";
            compo = Some {
                port_id="Component1";
                label="Component";
                link = None
            };
            ingre = [
                {
                    port_id="Ingredient1";
                    label="Ingredient";
                    link = None
                }
                {
                    port_id="Ingredient2";
                    label="Ingredient2";
                    link = None
                }
            ];
            proc = {
                proc_id="Process1";
                label="Process1";
                mh=1.0;
                link = None
            }
        }
    }

let ingre2: ProductModel =
    {
        id = "Product1";
        name = "Product";
        node = {
            node_id="ingre2";
            label="ingre2";
            compo = Some {
                port_id="Component1";
                label="Component";
                link = None
            };
            ingre = [
                {
                    port_id="Ingredient1";
                    label="Ingredient1";
                    link = None
                }
                {
                    port_id="Ingredient2";
                    label="Ingredient2";
                    link = None
                }
            ];
            proc = {
                proc_id="Process2";
                label="Process2";
                mh=1.0;
                link = None
            }
        }
    }
    
let product: ProductModel =
    {
        id = "Product1";
        name = "Product";
        node = {
            node_id="Node1";
            label="Node";
            compo = Some {
                port_id="Component1";
                label="Component";
                link = None
            };
            ingre = [
                {
                    port_id="Ingredient1";
                    label="Ingredient";
                    link = Some ingre1
                }
                { 
                    port_id="Ingredient2";
                    label="Ingredient2";
                    link = Some ingre2
                }
            ];
            proc = {
                proc_id="Process3";
                label="Process3";
                mh=1.0;
                link = None
            }
        }
    }



[<ReactComponent>]
let Diagram() =
    Html.div 
        [
            Components.Diagram("Diagram1", product)
        ]