import type { Metadata } from "next";

interface ParamsType {
  <%- slugs %>
}

export const metadata : Metadata = {
    title: <%- JSON.stringify(defaultName) %>
}
    
export default function <%= name %>Page( {params} : { params: ParamsType } ) {      
     return (
        <>
           <%= defaultName %> + {JSON.stringify(params)} page
        </>
    );
}