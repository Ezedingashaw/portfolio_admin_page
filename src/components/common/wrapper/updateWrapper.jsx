import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateProject from '../../updateProject/updateProject';

const UpdateWrapper = (props) => {
    const params = useParams();
    return (
        <UpdateProject props={props} params={params} />
    )
}

export default UpdateWrapper;