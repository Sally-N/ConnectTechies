import { toPasalCase } from "../HelperFuntions/pascalCase";
import { useRouterPath } from "./routerpath";


export const useBreadCrumbPath = () => {
    const route = useRouterPath();
    const removeQuestionMark = route?.replace(/\?/g, '/');
    const removeEquals = removeQuestionMark?.replace(
        /\=/g,
        '/'
    );

    const pathToPascalCase = toPasalCase(removeEquals!);
    return pathToPascalCase.split('/');
}