import { StreamContext } from '../stores/streamStore'

export const StreamProvider = ({ children, streamStore }) => {
    const store = { streamStore }
    return (
        <StreamContext.Provider value={store}>
            {children}
        </StreamContext.Provider>
    )
}
