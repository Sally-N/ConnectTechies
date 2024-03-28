import { usePathname } from 'next/navigation';


export const useRouterPath = () => {
    const route = usePathname();
    return route;
}