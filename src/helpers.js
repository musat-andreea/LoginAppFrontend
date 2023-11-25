import Cookies from "js-cookie";

export function getApiConfig() {
    return {
        apiBaseUrl: "http://localhost:8000",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_authorization")}`,
        },
    };
}