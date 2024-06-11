import type { Metadata } from "next";

interface ParamsType {
  <%- slugs %>
}
    
export default function <%= name %>Page( {params} : { params: ParamsType } ) {      
     return (
        <>
           <%= name %> + {JSON.stringify(params)} page
        </>
    );
}