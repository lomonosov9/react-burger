const NORMA_API = 'https://norma.nomoreparties.space/api';

async function getIngredients() {
    const res = await fetch(`${NORMA_API}/ingredients`);
    return checkReponse(res);
}

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

async function getOrder(data) {
    const res = await fetch(`${NORMA_API}/orders`,
        {
            method:  'POST',
            headers: {'Content-Type': 'application/json'},
            body:    JSON.stringify({"ingredients": data})
        });
    return checkReponse(res);
}

export { getIngredients, getOrder};