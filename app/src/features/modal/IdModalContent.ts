import { IdModalRegistry } from "./IdModalRegistry";
import { TempLogin } from "../auth/TempLogin";

export type IdModalContentType = {[id in IdModalRegistry]: any}

export const IdModalContent: IdModalContentType = {
    [IdModalRegistry.ModaltempLogin] : TempLogin
}
