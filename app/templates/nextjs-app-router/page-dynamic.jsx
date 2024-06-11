export const metadata = {
    title: <%- JSON.stringify(defaultName) %>
    }

export default function <%= name %>Page({params}) { 
     return (
        <>
           <%= defaultName %> + {JSON.stringify(params)} page
        </>
    );
}