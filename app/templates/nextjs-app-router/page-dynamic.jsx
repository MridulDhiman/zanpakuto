export const metadata = {
    title: <%- JSON.stringify(name) %>
    }
    
export default function <%= name %>Page({params}) { 
     return (
        <>
           <%= name %> + {JSON.stringify(params)} page
        </>
    );
}