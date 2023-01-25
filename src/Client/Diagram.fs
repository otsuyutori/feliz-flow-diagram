module Client.Diagram

open Feliz
open Shared.Types
open Client.Component

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
                label="Process";
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