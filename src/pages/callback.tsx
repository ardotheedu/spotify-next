import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/ArtistsContext";
import styles from '../styles/pages/callback.module.scss';

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
        <div className={styles.redirect}>Redirecionando</div>   
    )
}