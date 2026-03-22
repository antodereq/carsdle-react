//src/services/api.js
const API_BASE = "/api";

async function postForm(path, dataObj = {}) {
    const body = new URLSearchParams();
    Object.entries(dataObj).forEach(([k, v]) => body.append(k, v));

    const res = await fetch(`${API_BASE}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body,
        credentials: "include",
    });

    const text = await res.text();
    return safeJson(text);
}

async function postNoBody(path) {
    const res = await fetch(`${API_BASE}/${path}`, {
        method: "POST",
        credentials: "include",
    });

    const text = await res.text();
    return safeJson(text);
}

function safeJson(text) {
    try {
        return JSON.parse(text);
    } catch {
        return { __raw: text };
    }
}

export const api = {
    // all.php ma inne nazwy pól dla napędów/nadwozi/skrzyni/lat, ale do sugestii i listy i tak potrzebujemy tylko marka/model.
    all: () => postNoBody("all.php"),

    search: (input) => postForm("search.php", { input }),

    // selected.php przyjmuje TYLKO model (nie marka)
    selectedByModel: (model) => postForm("selected.php", { model }),

    randomStandard: () => postNoBody("random.php"),
    randomEndless: () => postNoBody("randomE.php"),

    checkGameStatus: (payload = null) =>
        payload ? postForm("checkGameStatus.php", payload) : postNoBody("checkGameStatus.php"),
};