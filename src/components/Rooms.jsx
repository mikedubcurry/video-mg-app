import { observer } from 'mobx-react-lite'
import { Link, useLoaderData } from 'react-router-dom'

import { Select } from './ui/Select'
import { useStreamStore } from '../stores/streamStore'
import { useEffect, useState } from 'react'

function Rooms() {
    const rooms = useLoaderData()
    console.log(rooms)
    const streamStore = useStreamStore()
    const [room, setRoom] = useState(rooms[0])
    useEffect(() => {
        console.log(room)
        console.log(streamStore.roomName)
    }, [room, streamStore.roomName])
    return (
        <div>
            <h2>Rooms</h2>
            <Select
                options={rooms}
                label="Rooms"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <Link
                to={`/rooms/${room}`}
                onClick={() => streamStore.setRoomName(room)}
            >
                Join Room!
            </Link>
        </div>
    )
}

export default observer(Rooms)
