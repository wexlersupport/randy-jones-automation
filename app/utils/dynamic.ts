
export async function fetchingData(params: any) {
    const response = await fetch(params.url);
    const res = await response.json()

    return res || [];
}