import React from 'react';
import {Button} from '@material-ui/core';
import { BeatLoader } from "react-spinners";

const LoadMore = (props) => {

    const { title, loadMore, loading} = props;
    return(
        <div className='loadMoreButtonFrame'>
            <Button onClick={loadMore} className='loadMoreButton' disabled={loading}>
                { loading?
                    <BeatLoader size={9} color={"#fff"} />:
                    title
                }
                
            </Button>
        </div>
    )
}

export default LoadMore;