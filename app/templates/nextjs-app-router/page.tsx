import type { Metadata } from "next";

export const metadeta: Metadata = {
title: <%- JSON.stringify(name) %>
}

export default function <%= name %>Page() {
    return <>
    <%= name %>
    </>
}