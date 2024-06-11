import type { Metadata } from "next";

export const metadeta: Metadata = {
    title: <%- JSON.stringify(defaultName) %>
}

export default function <%= name %>Page() {
    return (
        <>
        <%= defaultName %>
        </>
        );
}