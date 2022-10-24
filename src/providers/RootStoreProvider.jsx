import { RootStoreContext } from '../stores/rootStore'

export const RootStateProvider = ({ children, rootStore }) => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    )
}
