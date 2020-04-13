import React from 'react'
import { notification } from 'antd';
import { CheckCircleFilled,CloseCircleFilled} from '@ant-design/icons';


const successSingupNotification = ()=>{
    notification.open({
        message: 'Singup sucsec',
        description: 'enjoy with fakebook',
        icon: <CheckCircleFilled style={{ color: '#54b600' }} />
    })
}


const failSingupNotification = (message)=>{
    notification.open({
        message: 'fail Singup ',
        description: message,
        icon: <CheckCircleFilled style={{ color: '#f10' }} />
    })
}

 const successLoginNotification = ()=>{
    notification.open({
        message: 'Login sucsec',
        description: 'enjoy with fakebook',
        icon: <CheckCircleFilled style={{ color: '#54b600' }} />
    })
}
 const failLoginNotification = (message)=>{
    notification.open({
        message: 'Login fail',
        description: message,
        icon: <CloseCircleFilled style={{ color: '#f10' }} />
    })
}

export {successLoginNotification,failLoginNotification,successSingupNotification,failSingupNotification}


  