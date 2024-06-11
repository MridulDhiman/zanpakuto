import type { Metadata } from "next";

interface ParamsType {
  <%- slugs.forEach((slug)=> {
  <%- <%= slug  %> : string;\n %>
  }) %>
}
    
export default function <%= name %>Page( {params} : { params: ParamsType } ) {
    const slug = params[<%- JSON.stringify(slug) %>];
        
     return (
        <>
           <%= name %> + {slug} page
        </>
    );
}