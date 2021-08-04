import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import QueryString from "qs";

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {refresh_token} = req.body;
        if (refresh_token) {
            const response = await axios.post('https://accounts.spotify.com/api/token', 
            QueryString.stringify({
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
            })
        , 
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            }
        })

            return res.status(200).json(response.data);
        } else {
            return res.status(400).json({error: 'Missing refresh token'});
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}