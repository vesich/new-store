import React from 'react'
import Button from '../forms/Button/Button'

const LoadMore = ({
    onLoadMoreEvent = () => { }
}) => {
    return (
        <Button onClick={() => onLoadMoreEvent()}>
            Load More
        </Button>
    )
}

export default LoadMore
