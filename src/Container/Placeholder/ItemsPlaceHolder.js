import React, {useEffect, useState} from 'react';
import Skeleton from "@material-ui/lab/Skeleton";


const ItemsPlaceholder = (props) => {
    const [ count, setCount ] = useState([]);

    useEffect(() => {
        let tempArray = [];
        for (let i=0; i< props.count; i++){
            tempArray.push('item');
        }
        setCount(tempArray);
    }, []);
    return(
        <div className='myContainer'>
            <ul className='itemsPlaceHolder'>
                {
                    count.map((index) =>
                        <li key={index}>
                            <Skeleton variant="rect" width='100%' height={150} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default ItemsPlaceholder;
