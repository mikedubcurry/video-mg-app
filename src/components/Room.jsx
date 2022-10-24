import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStreamStore } from '../stores/streamStore'

function Room() {
    const streamStore = useStreamStore()

    useEffect(() => {
        console.log('fetching api token')
        streamStore.getToken(streamStore.roomName).then((token) => {
            connect(token, {
                name: streamStore.roomName,
            })
                .then((room) => {
                    console.log(`successfully joined room: ${room}`)
                })
                .catch((e) => {
                    console.log(e)
                })
        })
    }, [])

    const handleParticipantConnected = (participant) => {
        participant.removeAllEventListeners()
    }

    return (
        <>
            <h1>{streamStore.roomName}</h1>
        </>
    )
}

export default observer(Room)
