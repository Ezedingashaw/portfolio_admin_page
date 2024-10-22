import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateSkill from '../../updateSkill/updateSkill';

const UpdateSkillWrapper = (props) => {

    const params = useParams();
    return ( 
        <UpdateSkill props={props} params={params} />
     );
}
 
export default UpdateSkillWrapper;