import "websocket-polyfill";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const cookie = cookies.get("ontoloUserPubkey");

    return { cookie };
};
