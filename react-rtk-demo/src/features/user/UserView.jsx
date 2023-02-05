import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './userSlice'

export const UserView = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <div>
            <h2>List Of users</h2>
            {user.loading && <h3>Loading...</h3>}
            {!user.loading && user.error ? <h3>Loading...</h3> : null}
            {!user.loading && user.users.length > 0 ? (
                <ul>
                    {user.users.map(user => <li key={user.id}>{user.name}</li>)}
                </ul>
            ) : null}
        </div>
    )
}
