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
                port_id="c2";
                label="Component";
                link = None
            };
            ingre = [
                {
                    port_id="i3";
                    label="Ingredient";
                    link = None
                }
                {
                    port_id="i4";
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
                port_id="c3";
                label="Component";
                link = None
            };
            ingre = [
                {
                    port_id="i5";
                    label="Ingredient1";
                    link = None
                }
                {
                    port_id="i6";
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
                port_id="c1";
                label="Component";
                link = None
            };
            ingre = [
                {
                    port_id="i1";
                    label="Ingredient";
                    link = Some ingre1
                }
                { 
                    port_id="i2";
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