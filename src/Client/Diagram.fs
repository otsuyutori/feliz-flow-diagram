module Client.Diagram

open Feliz
open Shared.Types
open Client.Component

// type ProcessModel =
//   {
//     port_id:string
//     label:string
//     mh: float
//     link:NodeModel
//   }
// and IngredientModel = 
//   {
//     port_id:string
//     label:string
//     link:NodeModel
//   }
// and ComponentModel =
//   {
//     port_id:string
//     label:string
//     link:NodeModel
//   }
// and NodeModel =
//   {
//     node_id:string
//     label: string
//     compo:ComponentModel option
//     ingre:IngredientModel list
//     proc:ProcessModel
//   }

// type ProductModel = 
//   {
//     id:string
//     name: string
//     node:NodeModel
//   }

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
                mh=0.0;
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