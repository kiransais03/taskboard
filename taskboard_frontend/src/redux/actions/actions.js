import React from 'react'
import { CURRBOARDNO } from './actioTypes'

export const updateCurrboardno = (boardnum)=>{
    return ({
        type : CURRBOARDNO,
        payload : boardnum,
    })
}