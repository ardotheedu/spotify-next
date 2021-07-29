import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/ArtistsContext";

type QueryParams = {
    code: string;
}
export default function Callback() {
    const {signIn} = useContext(AuthContext)
    const { query } = useRouter();
    const { code } = query as QueryParams

    async function getToken() {
        await signIn(code);
    }

    getToken()
    return (
        <p>Redirecionando</p>
    )
}