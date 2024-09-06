type Response_ =
    | { status: 400, errorText: string }
    | { status: 200, responseText: string };

function getResponse(): Response_ {
    if (Math.random() > 0.5) {
        return {
            status: 400,
            errorText: "error",
        }
    } else {
        return {
            status: 200,
            responseText: "success",
        }
    }
}
let resp = getResponse();

switch (resp.status) {
    case 200:
        console.log(resp.responseText);
        break;
    case 400:
        console.log(resp.errorText);
        break;
}
