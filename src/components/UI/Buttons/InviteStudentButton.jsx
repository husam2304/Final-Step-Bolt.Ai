import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';   // Cleaner style
import Button from '@mui/material/Button';
import InviteStudent from '../../Models/InviteStudent';




function InviteStudentButton(ProjectId) {
    const token = useSelector((state) => state?.auth?.token);
    const [showInviteModel, setShowInviteModel] = useState(false);

    const handledModel = () => {
        setShowInviteModel(!showInviteModel);
    };
    return (
        <>
            {token && <Button endIcon={<PersonAddAlt1Icon className='text-[var(--text-color)] mr-2' />} variant="contained" sx={{ borderRadius: "50px", backgroundColor: "var(--primary-color)", color: "var(--text-color)" }} className='border rounded-4xl px-2 py-2 border-[var(--primary-color)]  border-2 text-base ' onClick={handledModel}>
                دعوة صديق
            </Button>}
            {showInviteModel && <InviteStudent handleClose={handledModel} ProjectId={ProjectId} />}
        </>
    )
}

export default InviteStudentButton
